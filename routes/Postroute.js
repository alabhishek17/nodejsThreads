const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const Postcontroller = require("../Controller/Postcontroller");

const Postrouter = express.Router()
Postrouter.get("/feed",authMiddleware,Postcontroller.getfeedPost)
Postrouter.get("/getpost/:id",Postcontroller.getPost)
Postrouter.post("/create",authMiddleware,Postcontroller.createPost)
Postrouter.delete("/delete/:id",authMiddleware,Postcontroller.deletePost)
Postrouter.post("/like/:id",authMiddleware,Postcontroller.likeandunlik)
Postrouter.post("/reply/:id",authMiddleware,Postcontroller.replyTopost)
module.exports=Postrouter;