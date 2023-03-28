let express = require("express");
const { isAuth, withPicFile } = require("../middleware/index");
let router = express.Router();
let CommodityModel = require("../models/commodityModel");
let CategoryModel = require("../models/categoryModel");
let ShopModel = require("../models/shopModel");
const url = require("url");
const mongoose = require("mongoose");
const shopModel = require("../models/shopModel");
const ObjectId = mongoose.Types.ObjectId;

router.get("/shop", isAuth, async (req, res) => {
  const shop = await ShopModel.find({}, null, {
    sort: { total: 1 },
  });
  if (shop) {
    return res.status(200).json({ data: shop, message: "获取购物车成功" });
  } else {
    return res.status(500).send({ message: "获取失败" });
  }
});
router.put("/shop", isAuth, async (req, res) => {
  const { quantity } = req.body;
  const newShop = await shopModel.findOneAndUpdate({ quantity });
  const shop = await shopModel.find({}, null, {
    sort: { id: -1 },
  });
  return res.status(200).json({ message: "购物车修改成功", data: shop });
});
router.post("/shop", isAuth, async (req, res) => {
  const { quantity, commodityName } = req.body;
  Number();
  const addQuantity = Number(quantity);
  const commodity = await CommodityModel.findOne({ commodityName });
  const { picMimetype, file, category_id, sellingUnit } = commodity;
  const shop = await shopModel.findOne({ commodityName });
  if (shop) {
    const { quantity } = shop;
    const newquantity = quantity + addQuantity;
    const shop1 = await shopModel.findOneAndUpdate(
      { commodityName },
      { quantity: newquantity }
    );
    return res
      .status(200)
      .json({ data: shop1, message: "商品成功添加至购物车" });
  } else {
    const shop2 = await shopModel.create({
      picMimetype,
      file,
      category_id,
      sellingUnit,
      commodityName,
      quantity,
    });
    return res.status(200).json({ message: "商品成功添加至购物车" });
  }
});

module.exports = router;
