const dotenv = require("dotenv")
dotenv.config()



if(!process.env.MONGO_URI){
    throw new Error("Mongo URI is not defined")
}

if(!process.env.RESEND_API_KEY){
    throw new Error("RESEND API KEY is not defined")
}

const config = {
    MONGO_URI:process.env.MONGO_URI,
    RESEND_API_KEY:process.env.RESEND_API_KEY
}

module.exports = config;