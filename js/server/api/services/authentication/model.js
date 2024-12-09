import argon2 from 'argon2'
import { sql } from "squid/pg.js"
import database from '../../../../database.js'
import reduce from '../../entities/reduce.js'
import ValidationError from './validation-error-class.js'

export default {

  async loginUser(email, attemptedPassword) {

    // find user via email
    // get both password and number of login attempts
    let result = reduce(await database.query(sql`
      SELECT
        "User".id AS id, password, "loginAttempts",
        TRUNC(extract(epoch from "loginAttemptsExpiresAt") * 1000) AS "loginAttemptsExpiresAt"
      FROM "User"
        JOIN "UserAuthentication"
        ON "UserAuthentication"."userId" = "User".id
      WHERE "User".email = ${email};`))

    if(result.error) {
      throw new ValidationError("User not found")
    }

    let { id, password, loginAttempts, loginAttemptsExpiresAt } = result
    loginAttemptsExpiresAt = parseInt(loginAttemptsExpiresAt)

    // reset login attempts if it's been long enough
    if (Date.now() > loginAttemptsExpiresAt) {
      database.query(sql`
        UPDATE "UserAuthentication"
        SET
          "loginAttempts" = 0,
          "loginAttemptsExpiresAt" = (current_timestamp + '1 hour'::interval)
        WHERE "UserAuthentication"."userId" = ${id};`)
    }
    // bail if they've attempted too many passwords!!
    else if (loginAttempts > 5) {
      throw new ValidationError("Too many failed login attempts")
    }

    // check password
    let validPassword = await argon2.verify(password, attemptedPassword)

    // if password is wrong,
    // increment login attempts & bail
    if (!validPassword) {
      database.query(sql`
        UPDATE "UserAuthentication"
        SET "loginAttempts" = "loginAttempts" + 1
        WHERE "UserAuthentication"."userId" = ${id};`)
      throw new ValidationError("Invalid password")
    }

    // if valid, return user data
    // TODO: reset login counter too
    else return reduce(await database.query(sql`
      SELECT
        json_build_object(
          'id', "User".id,
          'email', "User".email,
          'name', "User".name,
          'role', "User".role,
          'pilotLicense', "User"."pilotLicense",
          'organizationId', "Organization".id
        ) AS "user",
        json_build_object(
          'id', "Organization".id,
          'name', "Organization".name
        ) AS "organization"
      FROM "User"
        JOIN "Organization"
        ON "Organization".id = "User"."organizationId"
      WHERE email = ${email};
    `))
  },

  async loginDecco(name, organizationId, attemptedPassword) {
    // get decco via name
    let decco = reduce(await database.query(sql`
      SELECT *
      FROM "Decco"
        JOIN "DeccoAuthentication"
        ON "DeccoAuthentication"."deccoId" = "Decco".id
      WHERE name = ${name} AND "organizationId" = ${organizationId};
    `))

    // bail if not found
    if (decco.error) {
      throw new ValidationError("Invalid password")
    }

    // bail if password is wrong
    let validPassword = await argon2.verify(decco.password, attemptedPassword)
    if (!validPassword) {
      throw new ValidationError("Invalid password")
    }

    // remove password from object we'll return
    delete decco.password

    // get the organization!
    let organization = reduce(await database.query(sql`
      SELECT *
      FROM "Organization"
      WHERE id = ${organizationId};
    `))

    return { decco, organization }
  }

}
