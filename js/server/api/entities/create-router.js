import { Router } from 'express'

export default function(controller) {
  let router = new Router()

  router.get('/', controller.getAll)
  router.post('/', controller.create)
  router.get('/:id', controller.getById)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.delete)

  return router
}
