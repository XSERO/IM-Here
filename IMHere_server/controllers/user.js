const userService = require('../services/user');

const { SuccessModel, ErrorModel } = require('../models/resModel')




async function info(ctx){
    const info = await userService.getinfo(ctx.query.userid)
    ctx.body = new SuccessModel(info)
}



async function update(ctx) {
    const val = await userService.updateinfo(ctx.query.userid, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel('更新成功')
    } else {
        ctx.body = new ErrorModel('更新失败')
    }
}


module.exports = {
    info,
    update
};
