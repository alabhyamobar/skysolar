const mongoose = require("mongoose")
const config = require("./config")

const connectToDB = async()=>{
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);
        throw new Error("database connection failed");
    }
}

module.exports = connectToDB