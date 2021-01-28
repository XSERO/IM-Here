const Koa = require('koa')
const WebSocket = require('ws')
const redisClient = require('./configs/redis')

const ErrorModel = require('./models/resModel')
const {loggerMiddleware} = require('./middlewares/logger')
const {authenMiddleware} = require('./middlewares/authentication.js')
const {corsHandler}  = require('./middlewares/cors')
const registerRouter = require('./routes/index')//导入routes导出的文件

// 引用Server类:
const WebSocketServer = WebSocket.Server;
const app = new Koa()
const ws = new WebSocket.Server({port: 8000})
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')



//监听端口
const port = 3000

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 配置跨域
app.use(cors(corsHandler))

// logger
app.use(loggerMiddleware)

//判断接口是否需要登录
app.use(authenMiddleware)

// routes
app.use(registerRouter())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(port, () => {
  console.log('listening on :'+port);
});

//websocket
ws.on('connection', ws => {
  console.log('server connection');

  ws.on('message', msg => {
    console.log('client send msg：', msg);
    ws.send('server receive msg：' + msg);
  });

  ws.send('Connect success·····<br\>');
});


module.exports = app