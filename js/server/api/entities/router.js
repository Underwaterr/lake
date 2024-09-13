import { Router } from 'express'
import checkAuthentication from '../../middleware/check-authentication.js'
import allow from './allow.js'
import burnUnitRouter from './burn-unit/router.js'
import deccoRouter from './decco/router.js'
import flightEventRouter from './flight-event/router.js'
import flightRouter from './flight/router.js'
import organizationRouter from './organization/router.js'
import sessionRouter from './session/router.js'
import surveyRouter from './survey/router.js'
import userRouter from './user/router.js'

let router = new Router()

router.use(checkAuthentication)
router.use('/burn-unit', burnUnitRouter)
router.use('/decco', deccoRouter)
router.use('/flight', flightRouter)
router.use('/flight-event', flightEventRouter)
router.use('/organization', organizationRouter)
router.use('/session', allow(['ADMIN']), sessionRouter)
router.use('/survey', surveyRouter)
router.use('/user', userRouter)

export default router
