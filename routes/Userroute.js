const express = require("express")
const Usercontroller = require("../Controller/Usercontroller")
const authMiddleware = require("../Middleware/authMiddleware")
const UserRouter = express.Router()


UserRouter.get("/profile/:username",Usercontroller.getprofile)
UserRouter.post("/signup",Usercontroller.Signup)
UserRouter.post("/login",Usercontroller.login)
UserRouter.post("/logout",Usercontroller.logout)
UserRouter.post("/follow/:id",authMiddleware, Usercontroller.followUnfollowUser)
UserRouter.put("/update/:id",authMiddleware, Usercontroller.updateuser)
module.exports=UserRouter;
