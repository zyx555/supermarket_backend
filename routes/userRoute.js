
let express = require("express");
const isAuth = require("../middleware/isAuth");
let router = express.Router();
const userModel=require("../models/userModel")

// 获取用户
router.get("/all-users/:current/:pageSize", isAuth, async (req, res) => {
    const { current, pageSize } = req.params
    console.log(current)
    const users = await userModel.find({}, null, {
      // 因为从URL获取的参数是字符，因此需要隐式转换
      skip: (+current - 1) * (+pageSize),
      limit: +pageSize
    })
    if (users) {
      if (users.length) {
        const total = await userModel.find({}).count()
        res.status(200).send({ users, total ,messagee:"用户获取成功"})
      } else {
        res.status(200).send({ users, total: 0 })
      }
    } else {
      res.status(500).send({ message: "用户获取失败" })
    }
  })
//获取单个用户
router.get("/user/:_id",isAuth,async(req,res)=>{
    const {_id}=req.params;
    const user=await userModel.find({_id})
    if(user[0]){
      res.status(200).send({user:user[0],message:"获取用户成功"})
    }
    else{
      res.status(404),send({message:"用户不存在"})
    }
})
//修改用户信息
router.put("/user",isAuth,async(req,res)=>{
    const{_id,password}=req.body
    console.log(123);
    const user=await userModel.findByIdAndUpdate(_id,{password:password})
    if(user){
      res.status(200).send({message:"用户修改成功"})
    }
    else{
      res.status(404).send({message:"用户不存在"})
    }
})
//删除用户信息
router.delete("/user/:_id",isAuth,async(req,res)=>{
  const{_id}=req.params
  const user=await userModel.findByIdAndDelete(_id)
  if(user){
    res.status(200).send({message:"用户删除成功"})
  }
  else{
    res.status(404).send({message:"用户不存在"})
  }
})
module.exports = router;