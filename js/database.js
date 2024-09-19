import pg from 'pg'
import Postgis from 'postgis'
import transform from 'lodash.transform'
import camelCase from 'lodash.camelcase'

let { Pool, Client } = pg

let client = new Client()
let postgis = new Postgis(client)

let pool = new Pool()

// convert object keys from snake_case to camelCase
let camelize = rows=> {
  return rows.map(row=> {
    return transform(row, (result, value, key)=> {
      result[camelCase(key)] = value
    })
  })
}

export default {
  async query(q) {
    try {
      let result = await pool.query(q)
      return camelize(result.rows)
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
