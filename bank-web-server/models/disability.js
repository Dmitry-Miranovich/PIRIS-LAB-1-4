const mongoose = require("mongoose")

const disabilitySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    createdData:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Disability", disabilitySchema)