import controller from './controller.js'
import { Router } from 'express'

let router = Router()

router.post('/centroid-splitter', controller.centroidSplitter)
router.get('/elevation-model', controller.elevationModel)

export default router
