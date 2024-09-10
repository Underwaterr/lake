import argon2 from 'argon2'
import { sql } from "squid/pg.js"
import database from '../../../../database.js'

export default {

  async loginUser(email, attemptedPassword) {
    // get user via email
    let result = await database.query(sql`
      SELECT *
      FROM user_
      WHERE email = ${email};
    `)

    // bail if user doesn't exist
    if (result.length == 0) {
      return ({ error: "user not found" })
    }

    // bail if password is wrong
    let user = result[0]
    let validPassword = await argon2.verify(user.password, attemptedPassword)
    if (!validPassword) {
      return ({ error: "bad password" })
    }

    // if valid, return user data
    return (await database.query(sql`
      SELECT user_.email, user_.pilot_license, organization.name
      FROM user_
        JOIN organization
        ON organization.id = user_.organization_id
      WHERE email = ${email};
    `))[0]
  },

  async loginDecco(name, attemptedPassword) {
    // get decco via name
    let result = await database.query(sql`
      SELECT *
      FROM decco
      WHERE name = ${name};
    `)

    // bail if decco not found
    if (result.length == 0) {
      return ({ error: "decco not found" })
    }

    // bail if password is wrong
    let decco = result[0]
    let validPassword = await argon2.verify(decco.password, attemptedPassword)
    if (!validPassword) {
      return ({ error: "bad password" })
    }

    // if valid, return ok!
    return ({ ok: true })
  },

  logout(request, response, next) {
    request.session.destroy(error=> {
      if(error) next(error)
      else {
        response.clearCookie()
        response.json({ ok: true })
      }
    })
  },

  // check if authenticated
  check(request, response) {
    if(request.session.authenticated) response.json(request.session.user)
    else response.status(403).end();
  }

}
