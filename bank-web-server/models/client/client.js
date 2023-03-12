const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    FCs:{
       name:{
        type: String,
        required: true
       },
       surname:{
        type: String,
        required: true
       },
       middleName:{
        type: String,
        required: true
       } 
    },
    birthDate:{
        type: Date,
        default: new Date("1999-01-24")
    },
    sex:{
        type:String,
        enum: ["male", "female"],
        required: true,
        default: "male"
    },
    passport :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Passport"
    },
    extra:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Extra"
    },
    creditCard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreditCard"
    }
})

module.exports= mongoose.model('Client', clientSchema)


/*
{
    "homePhone": "dsadsad",
    "mobilePhone": "dasdasd",
    "email": "dsadasd",
    "workPlace": "asdasdasd",
    "workPost": "asdasdasd",
    "city": "Mogilev",
    "address": "sadasd",
    "maritalStatus": "В браке",
    "citizenship": "Несколько гражданства",
    "disability": "По степени трудоспособности",
    "retiree": "yes",
    "monthlyValue": "dasdasd",
    "conscripted": "sadasdasd"
}
{
    "passportSeries": "sadasd",
    "passportID": "asdasd",
    "issuePlace": "ddaa",
    "passportNumber": "affafa",
    "birthPlace": "asdasfdasd",
    "registrationCity": "Brest",
    "registrationAddress": "dasdasd"
}
{
    "name": "sadasd",
    "surname": "asdasd",
    "middleName": "asdasda",
    "sex": "male",
    "birthDate": "1221-08-22T17:31:21.676Z"
}
*/