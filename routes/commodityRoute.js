let express = require("express");
const { isAuth, withPicFile } = require("../middleware/index");
let router = express.Router();
let CommodityModel= require("../models/commodityModel");
let CategoryModel = require("../models/categoryModel")
const url = require("url");
const { query } = require("express");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


//获取商品
router.get("/all-commodities",isAuth,async (req, res) => {
    const data = url.parse(req.url,true);
    console.log(data)
    const {count,pageSize,category_id,commodityName,inventoryStatus,popularity,} = data.query;
    // const commodities = await CommodityModel.find({}, null, {
    //   // 因为从URL获取的参数是字符，因此需要隐式转换
    //   skip: (+count - 1) * +pageSize,
    //   limit: +pageSize,
    // });
    const queryCondition = {
      category_id,
      commodityName,
      inventoryStatus,
      popularity
    }
    //去除值为空的属性
    for(let propName in queryCondition){
      if(queryCondition[propName] === ''){
        delete queryCondition[propName]
      }
    }
    //对商品名字进行模糊匹配
    queryCondition.commodityName ? queryCondition.commodityName = new RegExp(`${queryCondition.commodityName}`,"ig") :0
    //将数据做类型转换
    queryCondition.category_id ?queryCondition.category_id = new ObjectId(category_id):0
    queryCondition.popularity ?queryCondition.popularity *=1 :0
    queryCondition.inventoryStatus ?queryCondition.inventoryStatus *=1 :0
    
    const total = await CommodityModel.find(queryCondition).count()
    const commodities = await CommodityModel.aggregate([
      {
        $sort:{_id:-1}
      },
      {
        $match:queryCondition,
      },
      {
        $skip:(+count -1)*(+pageSize)
      },
      {
        $limit:+pageSize
      },
      {
        $lookup:{
          from:"categories",
          localField:"category_id",
          foreignField:"_id",
          as:"category"
        }
      },
      {
        //去掉外层的数组
        $unwind:{
          path:"$category",
          preserveNullAndEmptyArrays:true,
        }
      },
      {
        $project:{
          "category._id":0,
          "category.total":0,
        }
      }
    ])
    if (commodities) {
        res.status(206).send({ data:commodities, total ,message:"商品获取成功"});
    } else {
      res.status(500).send({ message: "商品获取失败" });
    }
    return
  }
);
//新增商品
router.post("/commodity", isAuth, withPicFile, async (req, res) => {
  const newCommodity = req.body;
  const commodity = await CommodityModel.create(newCommodity);
  if (commodity) {
    const { category_id } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(
      {
        _id: category_id,
      },
      {
        $inc: { total: 1 },
      }
    );
    return res.status(200).send({ message: "商品新增成功" });
  } else {
    res.status(404).send({ message: "商品新增失败" });
  }
});
//修改商品信息
router.put("/commodity", isAuth, async (req, res) => {
  const { _id, currentPrice, cost, inventory, sellingUnit, danger_inventory } =
    req.body;
  if (!+currentPrice || !+cost || !+inventory || !+danger_inventory) {
    return res.status(500).send({ message: "请勿输入空值" });
  }
  if (!isNaN(+sellingUnit)) {
    return res.status(500).send({ message: "请输入正确的商品单位" });
  }
  try {
    if (inventory <= danger_inventory) {
      req.body.inventoryStatus = 0;
    } else {
      req.body.inventoryStatus = 1;
    }
    const commodity = await CommodityModel.findByIdAndUpdate(_id);
    if (commodity) {
      res.status(200).send({ message: "商品修改成功" });
    } else {
      res.status(404).send({ message: "商品不存在" });
    }
  } catch (err) {
    if (err.valueType !== err.kind) {
      return res.status(500).send({ message: "请输入正确类型的值" });
    }
  }
});
//删除商品
router.delete("/commodity/:_id/:curTotal/:category_id",isAuth,async (req, res) => {
    const { _id, curTotal, category_id } = req.params;
    const commodity = await CommodityModel.findByIdAndDelete(_id);
    const commodities = await CommodityModel.aggregate([
      {
        $sort:{_id:-1}
      },
      {
        $limit:+curTotal
      },
      {
        $lookup:{
          form:'categories',
          localField:'category_id',
          foreignField:'_id',
          as:'category'
        }
      },
      {
        $unwind:{
          path:'$category',
          preserveNullAndEmptyArrays:true,
        }
      },
      {
        $progect:{
          "category._id":0,
          "category.total":0,
        }
      }
    ])
    if (commodity) {
    const category = await CategoryModel.findByIdAndUpdate(
      {
        _id:category_id
      },
      {
        $inc:{total:-1}
      }
    )
      res.status(200).send({ data:commodities, message: "商品删除成功" });
    } else {
      res.status(404).send({ message: "商品不存在" });
    }
  }
);
module.exports = router;
