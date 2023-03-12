const express = require("express")
const Client = require("../models/client/client.js")
const Passport = require("../models/client/passport.js")
const Extra = require("../models/client/extra.js")
const CreditCard = require("../models/client/creditCard.js")
const { default: mongoose } = require("mongoose")
const router = express.Router()

router.post("/", async(req, res)=>{
    const {number, password} = req.body
    try{
        const card = await CreditCard.find({number: number, password: password})
        await Client.find({creditCard: mongoose.Types.ObjectId(card[0]._id)}).populate("extra").populate("passport").populate("creditCard")
        .exec((err, client)=>{
            console.log(client)
            if(err) res.status(409).json(err)
            else
            res.status(200).json(client)
        })        
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router