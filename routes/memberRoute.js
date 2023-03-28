let express = require("express");
let router = express.Router();
let memberModel = require("../models/memberModel")
let getToken=require('../middleware/getToken');

router.post("/memberLogin", async (req, res) => {
    const admin = await memberModel.findOne({
      username: req.body.username,
      password: req.body.password
    })
    if (admin) {
        console.log("登陆成功");
        return res.status(200).json({
          message:"登陆成功",
          username: admin.username,
          Token: getToken(admin)
        });
    }else {
      return res.status(200).json({
        message: "无效的账号或者密码"
      });
    }
  })

  router.post("/memberRegister", function (req, res) {
    let body = req.body;
    adminModel.findOne(
      {
        $or: [
          {
            useraccount: body.useraccount,
          },
          {
            username: body.username,
          },
          {
            password: body.password,
          },
        ],
      },
      function (err, data) {
        if (err) {
        
          return res.status(500).json({
            message: "服务端错误",
          });
        }
        if (data) {
          
          return res.status(200).json({
            message: "账号或昵称已存在",
          });
        }
        new userModel(body).save(function (err, user) {
          if (err) {
            console.log("错误");
            return res.status(500).json({
              message: "服务端错误",
            });
          }
          console.log("注册成功");
          res.status(200).json({
            message: "注册成功",
          });
        });
      }
    );
  })
  module.exports = router;