let mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
let Schema=mongoose.Schema
let memberSchema=new Schema({
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
module.exports=mongoose.model('Member',memberSchema);
let Member = mongoose.model('Member',memberSchema);