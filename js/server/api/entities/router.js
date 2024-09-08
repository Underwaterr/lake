import { Router } from 'express'
import checkAuthentication from '../../check-authentication.js'
import organizationRouter from './organization/router.js'

let router = new Router()
router.use(checkAuthentication)
router.use('/organization', organizationRouter)

export default router
