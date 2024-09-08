import express from 'express'
import cors from './cors.js'
import log from './log.js'
import error from './error.js'
import session from './session.js'
import router from '../api/router.js'

// TODO
// import router from '../../api/router'


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
app.use(cors)

// Parse incoming JSON requests
app.use(express.json())

// Parse URL query strings
app.use(express.urlencoded({extended: true}))

// Router!
app.use(router)

// Error-handling middleware
// (this should always come last!)
app.use(error)


export default app
