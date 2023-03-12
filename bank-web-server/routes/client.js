const express = require("express")
const mongoose = require("mongoose")
const CreditCard = require("../models/client/creditCard.js")
const CreditAccount = require("../models/credit/creditAccount.js")
const BankAccount = require("../models/bankAccount/bankAccount.js")
const CurrentAccount = require("../models/deposit/currentAccount.js")
const PercentAccount = require("../models/deposit/percentAccount.js")
const Currency = require("../models/deposit/currency.js")
const Client = require("../models/client/client.js")

const router = express.Router()

router.get("/:id/creditCard/form", async(req, res)=>{
    try{
        const client = await Client.find({_id:mongoose.Types.ObjectId(req.params.id)}).populate("creditCard")
        res.status(200).json(client)
    }catch(err){
        res.status(200).json({message: err.message})
    }
})
router.post("/:id/creditCard/form", async(req, res)=>{
    const {number, code, owner, date, password} = req.body
    try{
        const currency = await Currency.find({code: "BYN"})
        const client = await Client.find({_id: mongoose.Types.ObjectId(req.params.id)})    
        const card = new CreditCard({
            number: number,
            code: code,
            owner: owner,
            date:{
                month: date.month,
                year: date.year
            },
            balance: 1000,
            debit: 0,
            credit: 0,
            currency: mongoose.Types.ObjectId(currency._id),
            password: password
        })
        client[0].creditCard = card
        await client[0].save()
        await card.save()
        res.status(201).json({
            message: "Success"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

router.get("/:id/credit", async(req, res)=>{
    try{
        const accounts = await CreditAccount.find({client: mongoose.Types.ObjectId(req.params.id)}).populate("creditType").populate("client")
        .populate("currency")
        const result = {
            currentAccounts: accounts.filter(elem => elem.accountName==="Текущий счет"),
            percentAccounts: accounts.filter(elem => elem.accountName==="Процентный счет")
        }
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get("/:id/deposit", async(req, res)=>{
    try{
        const curr_accounts = await CurrentAccount.find({client: mongoose.Types.ObjectId(req.params.id)}).populate("depositType")
        .populate("currency")
        const percent_accounts = await PercentAccount.find({client: mongoose.Types.ObjectId(req.params.id)}).populate("depositType")
        .populate("currency")
        
        const result = {
            currentAccounts: curr_accounts,
            percentAccounts: percent_accounts
        }
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


router.post("/:id/credit/:creditID/form", async(req, res)=>{
    const {card, sum, password} = req.body
    try{
        const creditCard = await CreditCard.findOne({_id: mongoose.Types.ObjectId(card._id), password: password})
        if(creditCard){
            const account = await CreditAccount.findOne({_id: mongoose.Types.ObjectId( req.params.creditID)})
            if(account.creditAmount >= parseInt(sum)){
                const boxOffice = await BankAccount.findOne({accountName: "Касса"})
                boxOffice.debit = parseInt(boxOffice.debit) + parseInt(sum)
                account.creditAmount=parseInt(account.creditAmount) - parseInt(sum)
                account.credit =parseInt(account.credit) - parseInt(sum)
                creditCard.balance = parseInt(creditCard.balance) + parseInt(sum)
                creditCard.debit = parseInt(creditCard.debit) + parseInt(sum)
                account.balance = parseInt(account.creditAmount) - parseInt(sum)
                await boxOffice.save()
                await account.save()
                await creditCard.save()
                res.status(200).json({message: "Баланс пополнен успешно"})
            }else{
                res.status(409).json({message: "Запрашиваемая сумма превышает баланс счета"})
            }
        }else{
            res.status(409).json({message: "Не пройдена авторизация: Пароль неверный"})
        }
    }catch(err){
        res.status(500).json(err.message)
    }
})

router.get("/:id", async(req, res)=>{
    try{
        const client = await Client.findOne({_id: mongoose.Types.ObjectId(req.params.id)}).populate("extra").populate("passport")
        res.status(200).json(client)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router