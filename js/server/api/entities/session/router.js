import { Router } from 'express'

export default function(controller) {
  let router = new Router()

  router.get('/', controller.getAll)

  return router
}
