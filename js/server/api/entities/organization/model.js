import table from './table.js'
import query from '../../../../database/query.js'

export default {
  async create() {
    let q = `SELECT * FROM ${table.name};`
    let result = await query(q)
    return result.rows
  }
  /*
  getAll() {
    let q = `SELECT * FROM ${table.name};`
    return query(q)
  }
  create() {
    let q = `INSERT INTO ${table.name} (${table.columns.join(',')}) VALUES ($1)`
    pool.query(q, [name])
  },
  */
}
