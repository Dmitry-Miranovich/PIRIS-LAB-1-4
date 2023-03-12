const mongoose = require('mongoose')

const citizenshipSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dualCitizenship: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Citizenship", citizenshipSchema)