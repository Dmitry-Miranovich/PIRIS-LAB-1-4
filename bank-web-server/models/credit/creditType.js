const mongoose = require("mongoose")

const creditTypeSchema = new mongoose.Schema({
    type:{
        type:String,
        required: true
    },
})

module.exports = mongoose.model("CreditType", creditTypeSchema)