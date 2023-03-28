let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");
let Schema = mongoose.Schema;
let shopSchema = new Schema({
  commodityName: {
    type: String,
    required: true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  sellingUnit: {
    type: String,
    required: true,
  },

  category_id: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
  },

 
file:{
    type:Buffer,
    required:true
},

picMimetype:{
    type:String,
    required:true
},
});

module.exports = mongoose.model("Shop", shopSchema);
// let Category = mongoose.model('Category',categorySchema);
// let category =new Category(
// {
//     categoryName:"日用品",
//     total:"8"
// },

// )
// category.save().then(()=>console.log("插入成功"))
