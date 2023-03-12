const mongoose = require("mongoose")

const creditAccountSchema = new mongoose.Schema({
    creditType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreditType"
    },
    debit:{
        type: Number,
        required: true
    },
    credit:{
        type: Number,
        required: true
    },
    balance:{
        type: Number,
        required: true
    },
    creditAmount:{
        type: Number,
        required: true
    },
    creditPercent:{
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    creditNumber: {
        type: String,
        required: true
    },
    creditCode: {
        type: String,
        required: true
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
    accountName:{
        type: String,
        enum: ["Текущий счет", "Процентный счет"],
        required: true
    }
})

module.exports = mongoose.model("CreditAccount", creditAccountSchema)