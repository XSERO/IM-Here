
const accountService = require('../services/account');

const jwt = require('jsonwebtoken')
const redisClient = require('../configs/redis.js')
const common = require('../utils/common')
const secret = require('../utils/secret')
const exec = require('../utils/mysql')

const {
    SuccessModel,
    ErrorModel
} = require('../models/resModel')



async function login(ctx)  {

    //没有token，执行登录流程
    const {
        username,
        password
    } = ctx.request.body;
    const data = await accountService.login(username, password); //返回userid
    console.log(data)

    if (data.userid) {
        //定义一个用户信息对象
        const paylod = {
            name: username,
            userid: data.userid,
            timestamp: new Date() //加个时间戳保证加密后token的唯一性
        }
        // 调用上面公共的token加密方法（注：这里是没有传盐进去的，是直接在common文件引入盐）
        // expiresIn设置token的有效期是7天
        const token = await common.getToken(paylod, {
            expiresIn: '7 days'
        })

        //每次登录之前先清除掉所有的有关此用户的key（根据用户id）
        let preToken = await redisClient.get(data.userid)
        //这个preToken就是当初登录时redis存下来的key
        await redisClient.del(preToken)
        //用token作为key、自定义的token前缀+token作为值 传key给前端作为校验
        await redisClient.set(token, secret.identif + token)
        //再生成一对键值对 用来记录是属于哪个用户的token 用户id作为key 传给前端的token（上一条键值对的key）作为值
        await redisClient.set(data.userid, token)

        ctx.body = {
            token: token, //将token传给前端
            model: new SuccessModel('登录成功')
        }
    } else {
        ctx.body = new ErrorModel('登录失败，用户名或密码错误')
    }

}

async function register(ctx) {
    const body = ctx.request.body
    console.log(body);
    const val = await accountService.register(body)
    console.log(val);
    if (val) {
        ctx.body = {
            model: new SuccessModel('注册成功')
        }
    } else {
        ctx.body = {
            model: new ErrorModel('注册失败')
        }
    }
}

async function del(ctx){


    const val = await accountService.delaccount(ctx.query.userid)
    if (val) {
        ctx.body = {
            model: new SuccessModel('删除成功')
        }
    } else {
        ctx.body = {
            model: new ErrorModel('删除失败')
        }
    }
}

module.exports = {
	login,
    register,
    del
};