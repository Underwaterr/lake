import pg from 'pg'
import transform from 'lodash.transform'
import camelCase from 'lodash.camelcase'
import snakeCase from 'lodash.snakecase'

let { Pool } = pg

let pool = new Pool()

// convert object keys from snake_case to camelCase
let camelize = rows=> {
  return rows.map(row=> {
    return transform(row, (result, value, key)=> {
      return result[camelCase(key)] = value
    })
  })
}

// convert object keys from camelCase to snake_case
let snakify = object=> {
  return transform(object, (result, value, key)=> {
    return result[snakeCase(key)] = value
  })
}

export default {
  async query(text, parameters) {
    try {
      let result = await pool.query(text, parameters)
      return camelize(result.rows)
    }
    catch(error) {
      console.error('Database error:', error.message)
    }
  }
}
