const express = require("express");
const newsController = require("../controller/news")
const router = express.Router();


router
.get("/",newsController.getNews)

exports.router = router;