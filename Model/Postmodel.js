
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postedBy:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        requried:true,
    },
    text:{
        type:String,
        maxLength:500,
    },
    img:{
        type:String,
    },
    likes:{
        //array of user ids
        type:[mongoose.Types.ObjectId],
        ref:"user",
        default:[]
    },
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
                requried:true,
            },
            text:{
               type:String,
               requried:true,
            },
            userprofilepic:{
                type:String,
            },
            username:{
                type:String,
            }
        }
    ]
})


const PostModel = mongoose.model("post",postSchema)

module.exports=PostModel