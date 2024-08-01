var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const UserModel = require("../Model/Usermodel")
const cloudinary = require('cloudinary').v2;

const getprofile = async(req,res)=>{
const {username} = req.params
try{
    const user = await UserModel.findOne({username}).select("-password").select("-updateuser")

    if(!user) return res.status(400).json({message:"user not found"})
 
        res.status(200).json({
            user:user
        })
}catch(err){
    res.status(500).json({message:err.message})
}
}
const Signup = async(req,res)=>{

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password,salt)
    console.log(req.body.password);
    console.log(hashedPassword);
    
    const newlyInsertedUser = await UserModel.create(
       { ...req.body,
        password:hashedPassword,
        // role:"SELLER",
       })
    console.log(newlyInsertedUser._id);
    res.json({
        sucess:true,
        message:"registion completed login place"
    })
}

const login= async (req,res)=>{
    const user = await UserModel.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({
            success:false,
            message:"invalid email id"
        })
    }
       console.log("dtatbase stored password", user.password);
        console.log("user enterd password", req.body.password);    
       
       const isPasswordSame= await bcrypt.compare(req.body.password, user.password)
       console.log(isPasswordSame);
          if(!isPasswordSame){
        return res.status(404).json({
            success:false,
            message:"invalid password"
        })
    }
   
    //save token in DB
    // const token = uuidv4();
    const currentTimeInSecond=Math.floor(new Date().getTime()/1000);
    const expiryTimeInSecond = currentTimeInSecond+3600; //1hr from now
    const jwtPayload={
        userId:user._id,
        // role:Usercontroller.role,
        
        exp:expiryTimeInSecond,
    }
    const token = jwt.sign(jwtPayload,"MY_SERCTE_KEY")

    await UserModel.findByIdAndUpdate(user._id,{$set:{token}})
    // localStorage.setItem("logintoken",JSON.stringify(token))
    res.json({
        sucess:true,
        message:"api is get",
        token:token,
        //userinfo
        userinfo:{
            id:user._id,
            email:user.email,
        }
    })
    
}

const logout = async (req, res) => {
    try {
        // Assuming the token is passed in the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Find the user by token
        const user = await UserModel.findOne({ token });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Remove the token from the database
        await UserModel.findByIdAndUpdate(user._id, { $set: { token: null } });

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during logout'
        });
    }
};

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params; // ID of the user to follow/unfollow
        console.log('User ID to follow/unfollow:', id);

        // Fetch the user to be modified and the current user
        const userToModify = await UserModel.findById(id); // User to be followed/unfollowed
        console.log('User to modify:', userToModify);

        const currentUser = await UserModel.findById(req.user._id); // Current logged-in use
        console.log('Current user:', currentUser);

        // Prevent self-follow/unfollow
        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow/unfollow yourself" });
        }

        // Check if both users are found
        if (!userToModify || !currentUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if already following
        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow user
            await UserModel.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await UserModel.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            // Follow user
            await UserModel.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await UserModel.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            res.status(200).json({ message: "User followed successfully" });
        }
    } catch (err) {
        console.error('Error in followUnfollowUser:', err);
        res.status(500).json({ message: err.message });
    }
};

const updateuser = async(req,res)=>{
    const {name,username,password,email,bio} = req.body  //extrect from req.body and assing them into new u,p,e,p,b
     let {profilepic} = req.body
    const userId = req.user._id;
    try{

         let user= await UserModel.findById(userId)  //from database    // Use the correct User model reference here
         if(!user) return res.status(404).json({message: " user not found"})

            if(req.params.id !== userId.toString()){
                return res.status(400).json({message:"you can't update the other profile"})
            }

            if(password){
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password , salt)
                user.password = hashedPassword
            }
            if(profilepic){
                if(user.profilepic){
                    await cloudinary.uploader.destroy(user.profilepic.split("/").pop().split(".")[0]);
                }
                const uploadedResponse= await cloudinary.uploader.upload(profilepic)
                profilepic = uploadedResponse.secure_url
            }
        // Update user fields if provided, or keep existing values
            user.name = name || user.name
            user.username = username || user.username
            user.password = password || user.password
            user.email = email || user.email
            user.profilepic = profilepic || user.profilepic
            user.bio = bio || user.bio
           

            // Save the updated user
            user = await user.save()
            res.status(200).json({
                message:"profile update successfuly",
               user:user
            })
    }catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
        })
    }
}
const Usercontroller={
    Signup,
    login,
    logout,
    followUnfollowUser,
    updateuser,
    getprofile
}

module.exports=Usercontroller;