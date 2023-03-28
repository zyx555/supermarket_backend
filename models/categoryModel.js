let mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
let Schema=mongoose.Schema
let categorySchema=new Schema({
    categoryName:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        default: 0
    },

})
module.exports=mongoose.model('Category',categorySchema);
// let Category = mongoose.model('Category',categorySchema);
// let category =new Category(   
// { 
//     categoryName:"日用品",
//     total:"8"
// },

// ) 
// category.save().then(()=>console.log("插入成功"))