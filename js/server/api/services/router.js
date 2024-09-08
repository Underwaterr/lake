import { Router } from 'express'
import controller from './authentication/controller.js'


let router = new Router()
router.get('/test', (request, response)=> response.send('test services endpoint'))
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.get('/login', controller.check)

export default router
