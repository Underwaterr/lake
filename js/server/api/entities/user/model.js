import argon2 from 'argon2'
import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'


export default createModel('User', {

  // the following inserts into both `User` and `UserAuthentication` together
  // keeping it one transaction helps avoid partial executions!
  async create({ user, password }) {
    return reduce(await database.query(sql`
      WITH new_user AS (
        INSERT INTO "User"
        ${spreadInsert(user)}
        RETURNING id, email, "pilotLicense", "organizationId"
      )
      INSERT INTO user_authentication (password, "userId")
      SELECT ${await argon2.hash(password)}, id
      FROM new_user
      RETURNING "userId" AS id;`))
  }
})
