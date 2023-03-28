const jwt = require("jsonwebtoken")
const secret="jwtsecret"
// 生成Token
const getToken = (admin) => {
  return jwt.sign({
    username: admin.username,
    id: admin._id
  },
    secret
  )
}

module.exports = getToken