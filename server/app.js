require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const posts = require("./router/post");
const users = require("./router/user");
const authRouter = require("./router/auth");
const auth = require("./middleware/auth").auth;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB).then(()=>{
  console.log("DataBase Connected");
}).catch((err)=>{
  console.log(err);
})

app.use("/posts",auth,posts.router);
app.use("/users",auth,users.router);
app.use("/auth",authRouter.router);

app.get("/",(req,res)=>{
  res.send("Server Running")
})

app.listen(process.env.PORT||3000,()=>{
  console.log("Server Started")
})