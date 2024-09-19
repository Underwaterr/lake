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
        user_.id AS id, password, login_attempts,
        TRUNC(extract(epoch from login_attempts_expires_at) * 1000) AS login_attempts_expires_at
      FROM user_
        JOIN user_authentication
        ON user_authentication.user_id = user_.id
      WHERE user_.email = ${email};`))

    let { id, password, loginAttempts, loginAttemptsExpiresAt } = result
    loginAttemptsExpiresAt = parseInt(loginAttemptsExpiresAt)

    // reset login attempts if it's been long enough
    if (Date.now() > loginAttemptsExpiresAt) {
      console.log('resetting loginAttemptsExpiresAt')
      database.query(sql`
        UPDATE user_authentication
        SET
          login_attempts = 0,
          login_attempts_expires_at = (current_timestamp + '1 hour'::interval)
        WHERE user_authentication.user_id = ${id};`)
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
        UPDATE user_authentication
        SET login_attempts = login_attempts + 1
        WHERE user_authentication.user_id = ${id};`)
      return ({ error: "Invalid password" })
    }

    // if valid, return user data
    // TODO: reset login counter too
    return reduce(await database.query(sql`
      SELECT *
      FROM user_
        JOIN organization
        ON organization.id = user_.organization_id
      WHERE email = ${email};
    `))
  },

  async loginDecco(name, organizationId, attemptedPassword) {
    console.log('login decco')
    // get decco via name
    let result = reduce(await database.query(sql`
      SELECT *
      FROM decco
        JOIN decco_authentication
        ON decco_authentication.decco_id = decco.id
      WHERE name = ${name} AND organization_id = ${organizationId};
    `))

    console.log(result)

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
