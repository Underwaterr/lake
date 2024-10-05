import controller from './controller.js'
import { Router } from 'express'

let router = new Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.get('/:id', controller.getById)
router.put('/add-point/:id', controller.addPoint)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

export default router
