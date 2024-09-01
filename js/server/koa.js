import Koa from 'koa'
import handleError from './middleware/handle-error.js'
import logger from './middleware/logger.js'
import router from './api/router.js'

export default new Koa()
  .on('error', handleError)
  .use(logger)
  .use(router.routes())
