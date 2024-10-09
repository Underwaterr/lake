import controller from './controller.js'
import { Router } from 'express'

let router = Router()

router.post('/centroid-splitter', controller.centroidSplitter)
router.post('/generate-elevation-model', controller.generateElevationModel)

export default router
