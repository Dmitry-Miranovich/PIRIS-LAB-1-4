const mongoose = require('mongoose')

const maritalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Пенсионер"
    }
})

module.exports = mongoose.model("MaritalStatus",maritalSchema)