import 'dotenv/config'
import './check-environment-variables.js'
import './server/httpServer.js'

import query from './database/query.js'
let result = await query('SELECT NOW();')
console.log(result.rows[0].now)
