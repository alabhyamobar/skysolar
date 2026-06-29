const express  = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("../src/modules/user/user.routes.js")
const adminRouter = require("../src/modules/admin/admin.routes.js")

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: ["https://skysolar-two.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.get("/", (req,res)=>{
  res.send("hello world");
})

app.use("/api/user" , userRouter)
app.use("/api/admin" , adminRouter)



module.exports = app;