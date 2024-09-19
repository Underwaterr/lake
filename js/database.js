import pg from 'pg'
import Postgis from 'postgis'

let { Pool, Client } = pg
let client = new Client()
let postgis = new Postgis(client)
let pool = new Pool()

export default {
  async query(q) {
    try {
      let result = await pool.query(q)
      return result.rows
    }
    catch(error) {
      if(error instanceof AggregateError) {
        console.error("Database errors:")
        for(let e of error.errors) {
          console.error('\t ', e.message)
        }
      }
      else console.error('Database error:', error.message)
    }
  }
}
