const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")

router
.post("/signup",authController.createUser)
.post("/login",authController.loginUser)
.post("/",authController.getUser)

exports.router = router;