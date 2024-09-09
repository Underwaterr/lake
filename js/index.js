import 'dotenv/config'
import './check-environment-variables.js'
import database from './database.js'
import startServer from './server/start.js'

// before starting the http server,
// check if the database is working
let result = await database.query('SELECT NOW();')
if(result) startServer()
