import express from 'express'
import cors from './cors.js'
import log from './log.js'
import error from './error.js'
import session from './session.js'
import router from '../api/router.js'
import notFound from './not-found.js'
import snakeify from './snakeify.js'

let app = express()

// Disable unnecessary 'x-powered-by' header that Express adds by default
app.disable('x-powered-by')

// session auth
app.use(session)

// Log each incoming request
app.use(log)

// Set headers to allow for CORS from front-end
// + other security stuff
// More TODO: https://helmetjs.github.io/
// More More TODO: https://nodejs.org/en/learn/getting-started/security-best-practices
app.use(cors)

// Parse incoming JSON requests
app.use(express.json())

// convert JSON keys from camelCase to snake_case for PostgreSQL
app.use(snakeify)

// Parse URL query strings
app.use(express.urlencoded({extended: true}))

// Router!
app.use(router)

// Error-handling middleware
app.use(error)

app.use(notFound)


export default app
