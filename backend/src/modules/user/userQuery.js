const mongoose = require("mongoose");


const querySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "username is required"],
        trim: true
    },
    Email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    PhoneNumber: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/,
    },
    Message: {
        type: String,
        default: "solar query",
        trim: true
    }
})


const QueryModel = mongoose.model("query", querySchema);
module.exports = QueryModel;