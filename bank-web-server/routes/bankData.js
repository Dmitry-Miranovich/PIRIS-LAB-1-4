const express = require("express")
const DepositType = require("../models/deposit/depositType.js")
const CreditType = require("../models/credit/creditType.js")
const Currency = require("../models/deposit/currency.js")

const router = express.Router()

router.post("/depositType", async (req, res)=>{

    const depositType = new DepositType({
        type: req.body.type,
        isCancelled: req.body.isCancelled
    })

    try{
        const newtype = await depositType.save()
        res.status(201).json(newtype)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post("/creditType", async(req, res)=>{
    const creditType = new CreditType({
        type: req.body.type,
    })
    try{
        const newtype = await creditType.save()
        res.status(201).json(newtype)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})
router.get("/creditType", async(req, res)=>{
    try{
        const creditTypes = await CreditType.find()
        const currency = await Currency.find()
        res.status(200).json({creditTypes: creditTypes, currency: currency})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get("/depositType", async (req, res)=>{
    try{
        const depositTypes = await DepositType.find()
        const currency = await Currency.find()
        res.status(200).json({depositTypes: depositTypes, currency: currency})
    }catch(error){
        res.status(500).json({message: error.message})
    }

})

router.post("/currency", async(req, res)=>{
    try{
        const currency = new Currency({
            name: req.body.name,
            code: req.body.code
        })
        const newCurrency = await currency.save()
        res.status(201).json(newCurrency)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get("/currency", async(req, res)=>{
    try{
        const currency = await Currency.find()
        res.status(200).json(currency)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router