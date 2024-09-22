import controller from './controller.js'
import { Router } from 'express'

let router = Router()

router.get('/web-sockets', controller.webSockets)

export default router
