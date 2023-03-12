const mongoose = require("mongoose")

const currentAccountSchema = new mongoose.Schema({
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

module.exports = mongoose.model("CurrentAccount", currentAccountSchema)