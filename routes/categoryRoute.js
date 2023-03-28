let express = require("express");
const isAuth = require("../middleware/isAuth");
let router = express.Router();
let CategoryModel = require("../models/categoryModel");


//获取分类
router.get("/all-categories/:current/:pageSize", isAuth, async (req, res) => {
    const { current, pageSize } = req.params
    const categories = await CategoryModel.find({}, null, {
      // 因为从URL获取的参数是字符，因此需要隐式转换
      skip: (+current - 1) * (+pageSize),
      limit: +pageSize,
      sort:{total:1},
    })
    if (categories) {
      if (categories.length) {
        const total = await CategoryModel.find({}).count()
        res.status(206).send({ data:categories, total })
      } else {
        res.status(206).send({ data:categories, total: 0 })
      }
    } else {
      res.status(500).send({ message: "分类获取失败" })
    }
  })

  
  //新增分类
  router.post("/category",isAuth,async(req,res)=>{
  const{categoryName,curTotal} =req.body
    const category = await CategoryModel.create({
    categoryName
  })
  const categories = await CategoryModel.find({},null,{
    sort:{total:1},
    limit:curTotal
  })
  if(category){
    res.status(200).send({data:categories,message:"分类新增成功"})
  }
  else{
    res.status(404).send({message:"失败"})
  }

  })
  
  //删除分类
  router.delete("/category/:_id/:curTotal",isAuth,async(req,res)=>{
    const{_id,curTotal}=req.params
    const category = await CategoryModel.findById(_id)
    if(category.total<=0){
      const category=await CategoryModel.findByIdAndDelete(_id)
      const categories = await CategoryModel.find({},null,{
        sort:{total:1},
        limit:curTotal
      })
      if(category){
        res.status(200).send({data:categories, message:"分类删除成功"})
      }
      else{
        res.status(404).send({message:"分类不存在"})
      }
      return
    }
    
  res.status(500).send({message:"该分类下还有商品"})
  
  })
  module.exports = router;