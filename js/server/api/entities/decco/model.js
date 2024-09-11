import argon2 from 'argon2'
import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('decco', {

  async create(decco) {
    // hash the password before storing it
    decco.password = await argon2.hash(decco.password)
    return await database.query(sql`
      INSERT INTO decco
      ${spreadInsert(decco)}
      RETURNING id, name, status, is_virtual, callsign, organization_id;`
    )
  },

  async getById(id) {
    // don't include password
    return reduce(await database.query(sql`
      SELECT id, name, status, is_virtual, callsign, organization_id
      FROM decco
      WHERE id = ${id};
    `))
  },

  async getAll() {
    // don't include password
    return await database.query(sql`
      SELECT id, name, status, is_virtual, callsign, organization_id
      FROM decco;
    `)
  },

  async destroy(id) {
    // don't include password
    return await database.query(sql`
      DELETE FROM decco
      WHERE id = ${id}
      RETURNING id, name, status, is_virtual, callsign, organization_id;
    `)
  },

  async setStatus(id, status) {
    return await database.query(sql`
      UPDATE decco
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, name, status, is_virtual, callsign, organization_id;
    `)
  }
})
