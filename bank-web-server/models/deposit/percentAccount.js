const mongoose = require("mongoose")

const percentAccountSchema = new mongoose.Schema({
    depositNumber: {
        type: String,
        required: true
    },
    depositCode: {
        type: String,
        required: true
    },
    depositAmount: {
        type: Number,
        required: true
    },
    depositStart:{
        type: Date,
        required: true
    },
    depositEnd:{
        type: Date,
        required: true
    },
    depositPercentage:{
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    collectedMoney:{
        type: Number,
        required: true
    },
    balance:{
        type: Number,
        required: true
    },
    debit:{
        type: Number,
        required: true
    },
    credit:{
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    depositType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepositType"
    },
    isExpired:{
        type: Boolean,
        default: false
    },
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
})

module.exports = mongoose.model("PercentAccount", percentAccountSchema)