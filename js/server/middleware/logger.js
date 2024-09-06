export default async function (ctx, next) {

  console.log(

    // Timestamp
    // `MM/DD/YYYY HH:MM::SS a` format
    new Date().toLocaleString(),

    // TODO: log session authentication
    //ctx.request.session.authenticated ? '✓' : ' ',

    // Log IP address
    ctx.request.ip.includes('::ffff:')
      ? ctx.request.ip.split(':').reverse()[0]
      : ctx.request.ip,

    // Log Request Method + Path
    ctx.request.method,
    ctx.request.path
  )

  await next()
}
