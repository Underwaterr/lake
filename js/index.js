import 'dotenv/config'
import './check-environment-variables.js'
import './server/httpServer.js'

// database sanity check
import database from './database.js'
let result = await database.query('SELECT NOW();')
console.log('DB OK!', result[0].now)
