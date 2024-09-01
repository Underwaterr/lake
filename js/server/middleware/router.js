import Router from '@koa/router'

let router = new Router()

let userRouter = new Router()
userRouter.get('/user', ctx=> {
  ctx.body = 'user endpoint'
})

router.get('/hello/:name', (ctx)=> {
  ctx.body = `hello, ${ctx.params['name']}!`
})

router.get('/goodbye', (ctx)=> {
  ctx.body = 'goodbye!'
})

router.use(userRouter.routes())

export default router
