import controller from './controller.js'
import { Router } from 'express'

let router = Router()

router.get('/websockets', controller.webSockets)
router.get('/database', controller.database)
router.get('/server', controller.server)

export default router
