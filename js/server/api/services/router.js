import { Router } from 'express'
import authenticationRouter from './authentication/router.js'
import cortexRouter from './cortex/router.js'

let router = new Router()

router.use('/authentication', authenticationRouter)
router.use('/cortex', cortexRouter)

export default router
