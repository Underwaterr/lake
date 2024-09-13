import { Router } from 'express'
import controller from './controller.js'

let router = new Router()
router.get('/', controller.getAll)
router.delete('/:sid', controller.destroy)

export default router
