const PostModel = require("../Model/Postmodel");
const UserModel = require("../Model/Usermodel");

const createPost = async(req,res)=>{
try{
  const {postedBy,text,img} = req.body;
  if(!postedBy || !text){
    return res.status(400).json({message:" postbyId and text requri"})
  }

  const user = await UserModel.findById(postedBy)
  if(!user){
    return res.status(404).json({message:"user not found"})
  }

  if(user._id.toString() !== req.user._id.toString()){
    return res.status(401).json({message:"unautherised to post"})
  }
  
 const maxLength=500;
 if(text.length > maxLength){
    return res.status(400).json({message:`text must be less then ${maxLength} charecter`})
 }

 const newPost = new PostModel ({postedBy,text,img})
 await newPost.save()
   
 res.status(200).json({message:"post created successfuly", newPost})
}catch(err){
    res.status(500).json({message:err.message})
}
}

const getPost = async(req,res)=>{
    try{
          const post = await PostModel.findById(req.params.id)
          if(!post){
            return res.status(404).json({message:"post not found"})
          }

          res.status(200).json({
            message:"get the post",
            post
          })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const deletePost = async(req,res)=>{
   try{
      const post = await PostModel.findById(req.params.id)
      if(!post){
        return res.status(404).json({message:"post not found"})
      }

      if(post.postedBy.toString() !== req.user._id.toString()){
        return res.status(401).json({message:"unautherised to delete"})
      }

      await PostModel.findByIdAndDelete(req.params.id)

      res.status(200).json({message:"post delete successfuly"})
   }catch(err){
          res.status(500).json({message:err.message})
   }
}

const likeandunlik = async(req,res)=>{
    try {
        const {id} = req.params;
        const userId = req.user._id;

        const post = await PostModel.findById(id)

        if(!post){
            return res.status(404).json({message:"post not found"})
        }
           const userLikedpost = post.likes.includes(userId)
        if(userLikedpost){
            //unlike post
            await PostModel.updateOne({_id:id},{$pull:{likes:userId}})
            res.status(200).json({message:"post unlike sucessfully"})
        }else{
            //like post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message:"post liked sucessfully"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const replyTopost = async(req,res)=>{

    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userprofilepic = req.user.profilepic;
        const username = req.user.username;

        if(!text){
            return res.status(404).json({message:"text filed is requried"})
        }

        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }

        const reply = {userId,text,userprofilepic,username}
       post.replies.push(reply)
       await post.save();

       res.status(200).json({message:"reply added sucessfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getfeedPost = async(req,res)=>{
  try {
     const userId =  req.user._id
     const user = await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"user not found"})
     }

     const following = user.following;

     const feedPost = await PostModel.find({postedBy:{$in:following}}).sort({createdAt: -1}) //reacent post on top
      
     res.status(200).json({message:" feed sucessfully",feedPost})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
const Postcontroller = {
    createPost,
    getPost,
    deletePost,
    likeandunlik,
    replyTopost,
    getfeedPost
}

module.exports=Postcontroller