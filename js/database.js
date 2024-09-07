import pg from 'pg'
let { Pool } = pg

let pool = new Pool()

export default {
  async query(text, parameters) {
    let result = await pool.query(text, parameters)
    return result.rows
  }
}
