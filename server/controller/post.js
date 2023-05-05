const mongoose = require("mongoose");
const model = require("../model/post");


exports.getAllPosts = async(req,res)=>{
  const posts = await model.Post.find({});
  res.status(200).json(posts);
}

exports.createPost = async(req,res)=>{
  const newPost = new model.Post({...req.body});
  newPost.save().then(()=>{
    res.status(200).json(newPost);
  }).catch((err)=>{
    res.status(401).json({
      error: err,
    })
  })
}