
// module.exports = {
//   PORT: process.env.PORT || 5005,
//   MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test',
//   JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
//   ZYX_ADMIN_NAME : "曾亚轩",
//   expiresIn:'10h'
// };

// 这是一个全局的配置文件
module .exports={
  // 加密和解密token的密钥
  jwtSecretKey:'jwtsecret',
  expiresIn:'10h'
}
