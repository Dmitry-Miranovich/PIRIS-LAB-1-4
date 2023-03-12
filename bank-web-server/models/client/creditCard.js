const mongoose = require("mongoose")

const creditCardSchema = new mongoose.Schema({
    owner:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    date:{
        month: {
            type: String,
            required: true
        },
        year:{
            type: String,
            required: true
        }
    },
    code: {
        type: Number,
        required: true
    },
    balance: {
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
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("CreditCard", creditCardSchema)