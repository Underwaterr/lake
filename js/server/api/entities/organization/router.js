import Router from '@koa/router'
import controller from './controller.js'

export default new Router()
  .get('/', controller.getAll)
  .post('/', controller.create)
  .get('/:id', controller.getById)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete)
