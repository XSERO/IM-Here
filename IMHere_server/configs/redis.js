const Redis = require('ioredis')//导入模块
const redis = {
    prefix: 'IMHere', //redis存储前缀
    dataPrefix: 'WEBIM',   //redis数据存储前缀
    port: 6379, //端口
    host: '127.0.0.1',    //你的redisIP
    password: '12345', //你的redis密码 无密码可以为空
    db: 0,  //默认存储库
    ttl: 60 * 60 * 24 * 7 * 1000, //过期时间
    options: {} //其它配置
}
const redisClient = new Redis(redis)
//导出备用
module.exports = redisClient
