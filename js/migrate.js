import 'dotenv/config'
import pg from 'pg'

// We use a client instead of a pool
// in order to keep each migration as a full transaction
let { Client } = pg

let pool = new Pool()

console.log(await pool.query('SELECT NOW()'))
pool.end()
