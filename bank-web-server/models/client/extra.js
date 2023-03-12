const mongoose = require("mongoose")

const clientExtraSchema = new mongoose.Schema({
    homePhone:{
        type:String,
        required: false,
    },
    mobilePhone:{
        type: String,
        required:false
    },
    email:{
        type: String,
        unique: true,
        required: false
    },
    workPlace:{
        type: String,
        required: false
    },
    workPost:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    maritalStatus: {
        type:String,
        required: true
    },
    citizenship:{
        type: String, 
        required: true
    },
    disability:{
        type: String,
        required: true
    },
    retiree:{
        type: String,
        enum: ["yes", "no"],
        required: true
    },
    monthlyValue:{
        type: String,
        required: false
    },
    conscripted:{
        type: String,
        enum:["yes" , "no"],
        required: true
    }
})

module.exports = mongoose.model("Extra",clientExtraSchema)

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
}*/