
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/Usermodel")

const authMiddleware=async(req,res,next)=>{
   
        // const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
          //token validation
        //   1. if the token in presnet in request
        //2.check if the token is valid(valid the generating source)
        //3.if the token is exppried
        //4.user details validation
        try{
          const bearerToken = req.headers.authorization;
        //   console.log(bearerToken );
          if(!bearerToken){
            return res.status(401).json({
                success:false,
                message:"Unauthorized token is expried",
            })
          }
          const token = bearerToken.split(" ")[1]; //jwt
          jwt.verify(token, "MY_SERCTE_KEY") //token validtion
        
          const tokenData = jwt.decode(token)
          
        //   console.log(tokenData);
          const currentTimeInSecond = Math.floor(new Date().getTime() / 1000);
    
          if(currentTimeInSecond > tokenData.exp){
            //token is expried
            return res.status(401).json({
                success:false,
                message:"Unauthorized token is expried",
            })
          }
    
          const user = await UserModel.findById(tokenData.userId)
           if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized  User not found",
            })
           }
          
           req.user=user;
           next();

        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Unauthorized -intrrnal",
            });
        }
}


module.exports=authMiddleware