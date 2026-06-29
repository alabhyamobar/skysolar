const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    sourceQueryId: { type: mongoose.Schema.Types.ObjectId, ref: 'query' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    conversionDate: { type: Date, default: Date.now },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
