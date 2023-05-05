const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  },
  likes: Number,
  caption:String,
  imgURL:String,
  sport:String,
})

exports.Post = mongoose.model("Post",postSchema);