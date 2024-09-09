import { Router } from 'express'
import controller from './authentication/controller.js'


let router = new Router()
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.get('/login', controller.check)

export default router
