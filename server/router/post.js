const express = require("express");
const postController = require("../controller/post")
const router = express.Router();

router
.get("/",postController.getAllPosts)
.post("/",postController.createPost)

exports.router = router;