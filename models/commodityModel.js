let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");
let Schema = mongoose.Schema;
let commoditySchema = new Schema({
  commodityName: {
    type: String,
    required: true,
  },

  sellingUnit: {
    type: String,
    required: true,
  },

  category_id: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },

  currentPrice: {
    type: Number,
    required: true,
  },
  
  inventory: {
    type: Number,
    required: true,
  },
  
danger_inventory: {
    type: Number,
    required: true,
  },
  
inventoryStatus: {
    type: Number,
    enum:[0,1,2],
    default:1
  },
 
salesVolume: {
    type: Number,
 
    min:0,
  },
  
file:{
    type:Buffer,
    required:true
},

picMimetype:{
    type:String,
    required:true
},

popularity:{
    type:Number,
    default:1,
    min: 1,
    max: 4,
},
});

module.exports = mongoose.model("Commodity", commoditySchema);
// let Category = mongoose.model('Category',categorySchema);
// let category =new Category(
// {
//     categoryName:"日用品",
//     total:"8"
// },

// )
// category.save().then(()=>console.log("插入成功"))
