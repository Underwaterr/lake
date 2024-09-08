import database from '../../../../database.js'

export default {
  async create(organization) {
    let q = `INSERT INTO organization (name)
             VALUES ($1)
             RETURNING *;`
    let v = [organization.name]
    return await database.query(q, v)
  },

  async getAll() {
    let q = 'SELECT * FROM organization;'
    return await database.query(q)
  },

  async getById(id) {
    let q = `SELECT * FROM organization
             WHERE id = $1;`
    let v = [id]
    return await database.query(q, v)
  },

  async update(id, organization) {
    let q = `UPDATE organization
             SET name = $1
             WHERE id = $2
             RETURNING *;`
    let v = [organization.name, id]
    return await database.query(q, v)
  },

  async delete(id) {
    let q = `DELETE FROM organization
             WHERE id = $1
             RETURNING *;`
    let v = [id]
    return await database.query(q, v)
  }
}
