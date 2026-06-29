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
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        default: null
    },
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Converted', 'Dismissed'],
        default: 'Pending'
    }
}, { timestamps: true })


const QueryModel = mongoose.model("query", querySchema);
module.exports = QueryModel;