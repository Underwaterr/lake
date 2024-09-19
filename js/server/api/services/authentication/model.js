import argon2 from 'argon2'
import { sql } from "squid/pg.js"
import database from '../../../../database.js'
import reduce from '../../entities/reduce.js'

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

    let { id, password, loginAttempts, loginAttemptsExpiresAt } = result
    loginAttemptsExpiresAt = parseInt(loginAttemptsExpiresAt)

    // reset login attempts if it's been long enough
    if (Date.now() > loginAttemptsExpiresAt) {
      console.log('resetting loginAttemptsExpiresAt')
      database.query(sql`
        UPDATE "UserAuthentication"
        SET
          "loginAttempts" = 0,
          "loginAttemptsExpriesAt" = (current_timestamp + '1 hour'::interval)
        WHERE "UserAuthentication."userId" = ${id};`)
    }
    // bail if they've attempted too many passwords!!
    else if (loginAttempts > 5) {
      return ({ error: "Too many failed login attempts" })
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
      return ({ error: "Invalid password" })
    }

    // if valid, return user data
    // TODO: reset login counter too
    return reduce(await database.query(sql`
      SELECT *
      FROM "User"
        JOIN "Organization"
        ON "Organization".id = "User"."organizationId"
      WHERE email = ${email};
    `))
  },

  async loginDecco(name, organizationId, attemptedPassword) {
    console.log('login decco')
    // get decco via name
    let result = reduce(await database.query(sql`
      SELECT *
      FROM "Decco"
        JOIN "DeccoAuthentication"
        ON "DeccoAuthentication"."deccoId" = "Decco".id
      WHERE name = ${name} AND "organizationId" = ${organizationId};
    `))

    // bail if password is wrong
    let decco = result[0]
    let validPassword = await argon2.verify(decco.password, attemptedPassword)
    if (!validPassword) {
      return ({ error: "Invalid password" })
    }

    // if valid, remove password & return decco!
    delete decco.password
    return decco
  }

}
