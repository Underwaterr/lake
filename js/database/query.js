import pg from 'pg'
let { Pool } = pg

let pool = new Pool()

export default function(text, parameters) {
  return pool.query(text, parameters)
}
