import argon2 from 'argon2'
import createModel from '../create-model.js'
import database from '../../../../database.js'
import { sql, spreadInsert } from "squid/pg.js"
import reduce from '../reduce.js'

export default createModel('Decco', {

  async create(decco) {
    // hash the password before storing it
    decco.password = await argon2.hash(decco.password)
    return await database.query(sql`
      INSERT INTO "Decco"
      ${spreadInsert(decco)}
      RETURNING id, name, status, "isVirtual", callsign, "organizationId";`
    )
  },

  async setStatus(id, status) {
    return await database.query(sql`
      UPDATE "Decco"
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `)
  }
})
