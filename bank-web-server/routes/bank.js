const express = require('express')
const mongoose = require("mongoose")
const BankAccount = require("../models/bankAccount/bankAccount.js")
const Currency = require('../models/deposit/currency.js')

const router = express.Router()

router.get("/", async(req, res)=>{
    try{
        const bankAccounts = await BankAccount.find()
        res.status(201).json(bankAccounts)
    }catch(err){
        res.status(500).json({message:err.message })
    }
})

let currency = {}
let isCurrencyExists = true

const getBankCurrency = async (req, res, next)=>{
    try{
        await Currency.find({name: req.body.currency.name}).exec((err, curr)=>{
            if(err) isCurrencyExists = false
            else{
                currency = curr
            }
            next()
        })
    }catch(err){
        console.log(err)
        isCurrencyExists = false
        next()
    }
}

router.post("/", getBankCurrency,async(req, res)=>{
    if(isCurrencyExists){
        const code1 = parseInt(Math.random() * 10000).toString(),
        code2 = parseInt(Math.random() * 10000).toString() 
        const bankAccount = new BankAccount({
            name: "Счет фонда развития банка",
            accountNumber: req.body.accountNumber,
            code: code1,
            money: req.body.money,
            balance: req.body.balance,
            debit: 0,
            credit: 0,
            accountName: "СФРБ"
        })
        const boxOfficeAccount = new BankAccount({
            name: "Касса",
            accountNumber: req.body.accountNumber,
            code: code2,
            money: 0,
            balance: req.body.balance,
            debit: 0,
            credit: 0,
            accountName: "Касса"
        })
        bankAccount.currency = mongoose.Types.ObjectId(currency._id)
        boxOfficeAccount.currency = mongoose.Types.ObjectId(currency._id) 
        try{
            await bankAccount.save()
            await boxOfficeAccount.save()
            res.status(201).json({message: "Bank account created successfully", data: {
                bank: bankAccount,
                boxOffice: boxOfficeAccount
            }})
        }catch(err){
            res.status(409).json({message: err.message})
        }
    }
   
})

module.exports = router