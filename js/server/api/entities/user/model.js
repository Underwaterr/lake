import argon2 from 'argon2'
import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"
import reduce from '../reduce.js'


export default createModel('user_', {

  // the following inserts into both `user_` and `user_authentication` together
  // keeping it as one transaction helps avoid having a user that can't sign in!
  async create({ user, password }) {
    return reduce(await database.query(sql`
      WITH new_user AS (
        INSERT INTO user_
        ${spreadInsert(user)}
        RETURNING id, email, pilot_license, organization_id
      )
      INSERT INTO user_authentication (password, user_id)
      SELECT ${await argon2.hash(password)}, id
      FROM new_user
      RETURNING user_id AS id;`))
  }
})
