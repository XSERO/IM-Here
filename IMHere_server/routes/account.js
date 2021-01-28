const router = require('koa-router')()

const accountController = require('../controllers/account')

//router.prefix('/account')

router
	.post('/login', accountController.login)
	.post('/register',accountController.register)
	.get('/del',accountController.del);

module.exports = router;