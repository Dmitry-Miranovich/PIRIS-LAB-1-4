const mongoose = require("mongoose")

const depositAccountSchema = new mongoose.Schema({
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
    depositType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepositType"
    },
    depositPercent:{
        type:Number,
        required: true
    },
    isExpired:{
        type: Boolean,
        default: false
    },
    depositPercentAmount:{
        type: Number,
        default: 0
    },
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    accountType:{
        type: String,
        enum:["Активный", "Пассивный"],
        required: true
    },
    accountName:{
        type: String,
        enum:["Текущий счет", "Процентный счет", "Касса", "Фонд банка"],
        required: true
    }
})

module.exports = mongoose.model("DepositAccount", depositAccountSchema)