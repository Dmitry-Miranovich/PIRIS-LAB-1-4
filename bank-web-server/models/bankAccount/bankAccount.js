const mongoose = require("mongoose")

const bankAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accountNumber:{
        type: String,
        required: true
    },
    code:{
        type:String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    currency:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
    },
    debit:{
        type: Number,
        required: true
    },
    credit:{
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    accountName:{
        type: String,
        required: true,
        enum: ["СФРБ", "Касса"]
    }

})

module.exports = mongoose.model("BankAccount", bankAccountSchema)