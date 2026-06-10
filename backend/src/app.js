const express  = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("../src/modules/user/user.routes.js")

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: [ "http://localhost:5173","https://skysolar-two.vercel.app/"],
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    credentials:true 
}))


app.get("/", (req,res)=>{
  res.send("hello world");
})

app.use("/api/user" , userRouter)



module.exports = app;