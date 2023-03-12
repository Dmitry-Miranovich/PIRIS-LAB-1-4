const mongoose = require("mongoose")

const passportSchema = new mongoose.Schema({
    passportSeries: {
        type: String,
        required: true
    },
    passportID:{
        type: String,
        required: true
    },
    issuePlace:{
        type: String,
        required: true
    },
    passportNumber:{
        type: String,
        required: true
    },
    registrationCity:{
        type: String,
        required: true
    },
    registrationAddress:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Passport', passportSchema)