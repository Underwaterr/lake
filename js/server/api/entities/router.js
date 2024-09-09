import { Router } from 'express'
import checkAuthentication from '../../middleware/check-authentication.js'
import organizationRouter from './organization/router.js'
import userRouter from './user/router.js'

let router = new Router()
router.use(checkAuthentication)
router.use('/organization', organizationRouter)
router.use('/user', userRouter) // TODO: create user requires authentication

export default router
