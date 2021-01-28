//拦截认证中间件
const whiteList = require('../utils/whitelist')
const { ErrorModel } = require('../models/resModel')

async function authenMiddleware (ctx, next) {
    let url = ctx.request.url
    let flag = false
    whiteList.map(res => { 
      if (url.indexOf(res) !== -1) { 
        flag = true  //若接口在白名单中定义了，则放行
      }
    })
    if (flag) {
      await next()  //放行
    } else {  //否则检查token
      if (ctx.header && ctx.header.authority) {
        const token = ctx.header.authority
        if (token) {
          try {
            let exits = await redisClient.exists(token)
            if (exits) {//redis存在此token
              await next()
            } else {
              return ctx.body = {
                model: new ErrorModel('token失效，请重新登陆')
              }
            }
          } catch (error) {
            console.log(error)
          }
        } else {//没有传token
          return ctx.body = {
            model: new ErrorModel('用户未登录')
          }
        }
      } else {
        return ctx.body = {
          model: new ErrorModel('用户未登录')
        }
      }
    }
  }

  module.exports = {
    authenMiddleware
  }
