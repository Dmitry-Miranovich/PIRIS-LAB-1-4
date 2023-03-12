const mongoose = require("mongoose")

const depositSchema = new mongoose.Schema({
    depositType:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "DepositType",
        required: true
    },
    currency:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true
    },
    depositId: {
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    depositTerm:{
        type: Number,
        required: true
    },
    depositAmount: {
        type: Number,
        required: true
    },
    depositPercent:{
        type: Number,
        min: 0.1,
        max: 1,
        required: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
})

module.exports = mongoose.model("Deposit", depositSchema)