import { Router } from 'express'
import controller from './controller.js'

let router = new Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.get('/:id', controller.getById)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

export default router
