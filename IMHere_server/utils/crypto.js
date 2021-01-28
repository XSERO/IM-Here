const crypto = require('crypto');
// 密匙
const secret = 'abcdefg';

// sha256加密
function sha256(content) {
    return crypto.createHmac('sha256', secret)
      .update(content)
      .digest('hex');
  }

  // md5再次加密
function genPassword(password) {
    return crypto.createHash('md5', secret)
      .update(password)
      .digest('hex')
  }

  module.exports = {
    genPassword
  }