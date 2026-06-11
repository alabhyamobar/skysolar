const express = require("express");
const {createQueryController} = require("../user/user.controller.js")


const userRouter = express.Router()
userRouter.post("/query" , createQueryController)

module.exports = userRouter