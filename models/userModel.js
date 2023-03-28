let mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
let Schema=mongoose.Schema
let userSchema=new Schema({
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
    gender: {
        type: String,
        required: [true, "未选择性别！"]
      },
      address: {
        type: String,
        required: [true, "未输入地址！"]
      },
      phone: {
        type: String,
        validate: {
          validator: function (v) {
            return /^1[3-9][0-9]{9}$/.test(v);
          },
          message: props => `${props.value} 不是合法的电话号码!`
        },
        required: [true, '未输入手机号码！']
      }

})
module.exports=mongoose.model('User',userSchema);
let User = mongoose.model('User',userSchema)
// User.find(function(err,res){
//     if(err){
//         console.log("查询失败");
//     }else{
//         console.log(res)
//     }
// })