const router = require('koa-router')()

const userController = require('../controllers/user')

//router.prefix('/user')

router
	.post('/info', userController.info)
	.post('/update',userController.update)

module.exports = router;
