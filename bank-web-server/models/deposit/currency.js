const mongoose = require("mongoose")

const currencySchema = new mongoose.Schema({
    name:{
        type:String,
        enum:["USA dollar", "Euro", "Russian ruble", "Belarussian ruble"]
    },
    code:{
        type:String,
        enum:["BYN","USD","RUB", "EUR"],
        required: true
    },
})

module.exports = mongoose.model("Currency", currencySchema)