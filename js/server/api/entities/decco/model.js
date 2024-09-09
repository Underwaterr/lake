import argon2 from 'argon2'
import createModel from '../create-model.js'


export default createModel('decco', {

  async create(decco) {
    // hash the password before storing it
    decco.password = await argon2.hash(user.password)
    return await database.query(sql`
      INSERT INTO decco
      ${spreadInsert(decco)}
      RETURNING id, name, status, is_virtual, callsign, organization_id;`
    )
  },

  async getById(id) {
    // don't include password
    return await database.query(sql`
      SELECT id, name, status, is_virtual, callsign, organization_id
      FROM decco
      WHERE id = ${id};
    `)
  },

  async getAll() {
    // don't include password
    return await database.query(sql`
      SELECT id, name, status, is_virtual, callsign, organization_id
      FROM decco;
    `)
  }

})
