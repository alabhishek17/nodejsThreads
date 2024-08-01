
const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:""
    },
    followers:{
        type:[String],
        default:[],
    },
    following:{
        type:[String],
        default:[],
    },
    bio:{
        type:String,
        required: false,
        default:""
    },
    token: {
        type: String,
        required: false,
        default: "",
      },
},{
    timestamps:true,
})


const UserModel = mongoose.model("user",userSchema) 
 
module.exports=UserModel