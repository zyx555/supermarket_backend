const jwt = require("jsonwebtoken")
const config = require("../config")
const secret="jwtsecret"

// 验证Token权限
const isAuth = (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  const Token = token.replace("Bearer ", "")
  console.log(Token)
  console.log(config.jwtSecretKey);
  console.log(Token);
  if (Token !== null) {
    // 有token，说明是管理员，下面验证管理员权限
    jwt.verify(Token,secret, (err, decode) => {
      if (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError") {
          return res.status(400).json({
            message: "授权失败，无权访问"
          });
        } else if (err.name === "TokenExpiredError") {
          return res.status(200).json({
            message: '权限过期，请重新登陆'
          });
        } else {
          return res.status(402).json({
            message: "授权失败，未知错误"
          });
        }
      }
      // 没有错误，认证成功，授予访问权限
      req.admin = decode;
      next();
      console.log(req)
      
    });
  } else {
    res.status(403).send({ message: '非管理员身份，无权访问' });
  }
};

module.exports = isAuth