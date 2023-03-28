let mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
let Schema=mongoose.Schema
let adminSchema=new Schema({
    useraccount:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})
module.exports=mongoose.model('Admin',adminSchema);
let Admin = mongoose.model('Admin',adminSchema);
// let admin = new Admin({
//     useraccount:"admin",
//     username:'admin',
//     password:'admin'
// })
// admin.save().then(()=>console.log("插入成功"))