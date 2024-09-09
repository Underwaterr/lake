import argon2 from 'argon2'
import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert, spreadUpdate } from "squid/pg.js"


export default createModel('user_', {

  async create(user) {
    // hash the password before storing it
    user.password = await argon2.hash(user.password)
    return await database.query(sql`
      INSERT INTO user_
      ${spreadInsert(user)}
      RETURNING id, email, pilot_license, organization_id`
    )
  },

  async getById(id) {
    // don't include password
    return await database.query(sql`
      SELECT id, email, pilot_license, organization_id
      FROM user_
      WHERE id = ${id}
    `)
  },

  async getAll() {
    // don't include password
    return await database.query(sql`
      SELECT id, email, pilot_license, organization_id
      FROM user_
    `)
  },
  async destroy(id) {
    // don't include password
    return await database.query(sql`
      DELETE FROM user_
      WHERE id = ${id}
      RETURNING id, email, pilot_license, organization_id
    `)
  }
})
