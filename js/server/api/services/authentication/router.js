import controller from './controller.js'
import { Router } from 'express'

let router = Router()

router.get('/user', controller.check)
router.post('/user', controller.loginUser)
router.post('/decco', controller.loginDecco)
router.get('/logout', controller.logout)

export default router
