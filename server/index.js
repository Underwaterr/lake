import Koa from 'koa'
import errorHandler from './middleware/error-handler.js'
import logger from './middleware/logger.js'
import router from './api/router.js'
import handleListen from './middleware/handle-listen.js'

export default new Koa()
  .on('error', errorHandler)
  .use(logger)
  .use(router.routes())
  .listen(process.env.PORT, handleListen)
