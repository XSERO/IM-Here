//日志中间件
async function loggerMiddleware (ctx, next)  {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  }

module.exports = {
    loggerMiddleware
}

