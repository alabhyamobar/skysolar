const express = require("express");
const {createQueryController} = require("../user/user.controller.js")
const queryLimiter = require("../../middleware/ratelimitter.js")

const userRouter = express.Router()
userRouter.post("/query" ,queryLimiter, createQueryController)

module.exports = userRouter