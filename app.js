let express=require('express')
// let mongoose=require('mongoose')
let app=express()
app.engine('html',require('express-art-template'))
const { adminRoute,categoryRoute,commodityRoute,userRoute,memberRoute,shopRoute} = require('./routes/index')
// 配置跨域请求中间件(服务端允许跨域请求)
var allowCors = function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin); // 设置允许来自哪里的跨域请求访问（req.headers.origin为当前访问来源的域名与端口）
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
        res.header("Access-Control-Allow-Headers", "Content-Type,request-origin,authorization"); // 设置请求头中允许携带的参数
        res.header("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
        res.header("Access-control-max-age", 1000); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
        next();
    };
    app.use(allowCors); // 使用跨域中间件
// 在路由之前配置解析token的中间件
// const {expressjwt:expressJWT}= require("express-jwt");
// const config = require('./config')
// app.use(expressJWT({secret:config.jwtSecretKey,algorithms: ['HS256'] }).unless({path:[/^\/api\/admins/]}))

let bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api/admins/',adminRoute)
app.use('/api/categories/',categoryRoute)
app.use('/api/commodities/',commodityRoute)
app.use('/api/users/', userRoute)
app.use('/api/members/',memberRoute)
app.use('/api/shops/',shopRoute)
app.listen(5005,function(){
        console.log("running....")
})