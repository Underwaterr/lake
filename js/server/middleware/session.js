import pg from 'pg'
import expressSession from 'express-session'
import cpgs from 'connect-pg-simple'


const TWO_MINUTES = 2 * 60 * 1000
const ONE_DAY = 24 * 60 * 60 * 1000

let pgSession = cpgs(expressSession)

let session = expressSession({
  cookie: {
    maxAge: ONE_DAY,
    sameSite: 'Strict'
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new pgSession({
    pool: new pg.Pool()
  })
})

export default session
