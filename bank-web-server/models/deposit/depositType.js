const mongoose = require("mongoose")

const depositTypeSchema = new mongoose.Schema({
    type:{
        type:String,
        required: true
    },
    isCancelled:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model("DepositType", depositTypeSchema)