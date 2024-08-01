const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./routes/Userroute")
const Postrouter = require("./routes/Postroute")
const dotenv = require("dotenv")
const cors = require('cors');
// const cloudinary = require('cloudinary').v2;

//env config
dotenv.config();
const app=express();
 
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's origin
  }));

  // cloudinary.config({
  //   cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key:process.env.CLOUDINARY_API_KEY,
  //   api_secret:process.env.CLOUDINARY_API_SECRET,
  // });
//middleware
app.use(express.json());

//DB connection
mongoose
.connect(process.env.DATABASE_URI)
.then(()=>console.log("DB connencted"))
.catch((err)=>console.log("err to connect",err))

//api router
app.use("/api/v1/user",UserRouter)
app.use("/api/v1/post",Postrouter)

const PORT = 7777;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));