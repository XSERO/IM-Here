const secret = require('./secret')//导入自定义的盐
const jwt = require('jsonwebtoken') 
const util = require('util');
const verify = util.promisify(jwt.verify) // token解密
const common = {

  //签发token
  /*
  * paylod：包含来用户的信息
  * secret.secret 自定义的盐(salt)
  * expiresIn 设置这个token的有效期
  */
  //jwt.sign是jsonwebtoken模块的一个方法，可以将传入的信息加密
  getToken(paylod, expiresIn) {
    return jwt.sign(paylod, secret.secret, expiresIn)
  },

  //解密
  //根据收到的token获取用户信息
  getUserInfo(token) {
    return verify(token, secret.secret) 
  },

  //根据请求头的信息获取前端传入的token，字段名为authority
  getHeaderToken(ctx) { 
  if (ctx.header && ctx.header.authority) { 
    return ctx.header.authority
  }
}

}

module.exports=common
