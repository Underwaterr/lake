import controller from './controller.js'
import { Router } from 'express'

let router = Router()

router.get('/web-sockets', controller.webSockets)
router.get('/database', controller.database)

export default router
