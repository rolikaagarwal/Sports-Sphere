const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:{
    type: String,
    unique: true,
  },
  password:{
    type: String,
  },
  contact: Number,
  token: String,
  interest: [String]
})
exports.User = mongoose.model("User",userSchema);