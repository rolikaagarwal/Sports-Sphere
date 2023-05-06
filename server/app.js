require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const posts = require("./router/post");
const users = require("./router/user");
const authRouter = require("./router/auth");
const news = require("./router/news");
const auth = require("./middleware/auth").auth;

const app = express();
const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB).then(()=>{
  console.log("DataBase Connected");
}).catch((err)=>{
  console.log(err);
})

app.use("/posts",auth,posts.router);
app.use("/users",auth,users.router);
app.use("/news",news.router);
app.use("/auth",authRouter.router);


app.get("/",(req,res)=>{
  res.send("Server Running")
})

io.on('connection', (socket) => {
  console.log('Connected...')
  socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg)
  })
})

http.listen(process.env.PORT||3000,()=>{
  console.log("Server Started")
})