const express = require('express')
const Client = require("../models/client/client.js")
const Passport = require("../models/client/passport.js")
const Extra = require("../models/client/extra.js")
const CurrentAccount = require("../models/deposit/currentAccount.js")
const PercentAccount = require("../models/deposit/percentAccount.js")
const BankAccount = require("../models/bankAccount/bankAccount.js")
const { default: mongoose } = require('mongoose')
const CreditAccount = require('../models/credit/creditAccount.js')



const router = express.Router()


let isAccountSaveFailed = false

// const initStart = ()=>{
//     try{
//         const currency = await Curre
//     }catch(err){

//     }
// }

const percentAccountMiddleWare = async (req, res, next)=>{
    const id = req.params.id
    const percentAccountCode = parseInt( Math.random() * 10000)
    const percentAccount = new PercentAccount({
        depositNumber: req.body.depositNumber,
        depositCode: percentAccountCode,
        depositAmount: req.body.depositAmount,
        depositStart: req.body.depositStart,
        depositEnd: req.body.depositEnd,
        depositType: req.body.depositType,
        depositPercentage: req.body.depositPercent,
        collectedMoney: 0,
        percentage: req.body.percentage,
        currency: req.body.currency,
        balance: 0,
        debit: 0,
        credit: 0,
        client: new mongoose.Types.ObjectId(id),
    })
    try{
        await percentAccount.save()
        next()
    }catch(err){
        isAccountSaveFailed = true
        console.log(err)
        next()
    }
}

const currentAccountMiddleWare = async (req, res, next)=>{
        const id = req.params.id
        const currentAccountCode = parseInt( Math.random() * 10000)
        const currentAccount = new CurrentAccount({
            depositNumber: req.body.depositNumber,
            depositCode: currentAccountCode,
            depositAmount: req.body.depositAmount,
            depositStart: req.body.depositStart,
            depositEnd: req.body.depositEnd,
            depositType: req.body.depositType,
            currency: req.body.currency,
            client: new mongoose.Types.ObjectId(id),
            balance: 0,
            debit: 0,
            credit: req.body.depositAmount
        })
        try{
            const bankAccount = await BankAccount.findOne(({accountName: "СФРБ"}))
            const boxOffice = await BankAccount.findOne(({accountName: "Касса"}))
            bankAccount.credit = parseInt(bankAccount.credit) + parseInt(currentAccount.depositAmount) 
            boxOffice.debit = parseInt(boxOffice.debit) + parseInt(currentAccount.depositAmount)
            await bankAccount.save()
            await boxOffice.save()
            await currentAccount.save()
            next()
        }catch(err){
            console.log(err)
            isAccountSaveFailed = true
            next()
        }
}


router.post("/:id/credit", async(req, res)=>{
    const {creditNumber, currency, creditType, creditStart, creditEnd, creditPercent, creditAmount} = req.body
    console.log(creditType, currency)
    const currentCreditCode = parseInt( Math.random() * 10000), percentCreditCode = parseInt( Math.random() * 10000)
    try{

        const currentCreditAccount = new CreditAccount({
            creditType: creditType._id,
            debit: creditAmount,
            credit: 0,
            balance: 0,
            creditAmount: creditAmount,
            creditPercent: creditPercent,
            startDate: creditStart,
            endDate: creditEnd,
            creditNumber: creditNumber,
            creditCode: currentCreditCode,
            currency: currency._id,
            client: mongoose.Types.ObjectId(req.params.id),
            accountName: "Текущий счет"
        })
        await currentCreditAccount.save()

        const percentCreditAccount = new CreditAccount({
            creditType: creditType._id,
            debit: 0,
            credit: 0,
            balance: creditAmount,
            creditAmount: creditAmount,
            creditPercent: creditPercent,
            startDate: creditStart,
            endDate: creditEnd,
            creditNumber: creditNumber,
            creditCode: percentCreditCode,
            currency: currency._id,
            client: mongoose.Types.ObjectId(req.params.id),
            accountName: "Процентный счет"
        })
        await percentCreditAccount.save()

        const bankAccount = BankAccount.find().exec()

        bankAccount.then(account=>{
            account.forEach(elem=>{
                if(elem.accountName === "СФРБ"){
                    elem.money -= creditAmount
                    elem.debit = creditAmount
                }else{
                    elem.debit+=creditAmount
                    elem.credit -= creditAmount
                }
                elem.save()
            })
        })

        res.status(201).json({message: "Accounts saved successfully"})
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: "Failed while saving accounts"})
    }
})

router.get("/:id/credit", async(req, res)=>{
    const id = req.params.id
    try{
    const credits = await CreditAccount.find({client: mongoose.Types.ObjectId(id)}).populate("creditType").populate("currency")
    res.status(200).json(credits)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post("/:id/deposit", currentAccountMiddleWare,percentAccountMiddleWare , (req,res)=>{
    if(!isAccountSaveFailed){
        res.status(201).json({message: "Accounts saved successfully"})
    }else{
        res.status(500).json({message: "Failed while saving accounts"})
    }
    
})

const accounts = {}
let isAccountsExists = true

const getPercentAccounts = async (req, res, next)=>{
    try{ 
        await PercentAccount.find({client: mongoose.Types.ObjectId(req.params.id)})
        .populate("depositType").populate("currency")
        .exec((err, p)=>{
            if(err){
                isAccountsExists = false
            }else{
                accounts.percentAccounts = p
            }
            next()
        })
    }catch(err){
        isAccountsExists = false
        next()
    }
}
const getCurrentAccounts = async (req, res, next)=>{
    if(isAccountsExists){
        const id = req.params.id
        try{
            await CurrentAccount.find({client:mongoose.Types.ObjectId(id)})
            .populate("depositType").populate("currency")
            .exec((err, current)=>{
                if(err){
                    isAccountsExists = false
                }else{
                    accounts.currentAccounts = current
                }
                next()
            })
        }catch(err){
            isAccountsExists = false
            next()
        }
    }else{
        next()
    }
}

router.get("/:id/accounts",getCurrentAccounts,getPercentAccounts,async(req, res)=>{
    if(isAccountsExists){
        try{
            res.status(200).json({message: accounts})
        }catch(err){
            res.status(500).json({message: err.message})
        }
    }else{
        res.status(500).json({message: "Error while finding accounts has occurred"})
    }
    
})

router.put("/",async(req, res)=>{
    try{
        const accounts = await PercentAccount.find()
        const b_account = await BankAccount.findOne({accountName: "СФРБ"})    
        const boxOffice = await BankAccount.findOne({accountName: "Касса"})
        accounts.forEach(async (elem)=>{
            elem.credit =  parseInt(elem.debit) + parseInt(elem.percentage)
            elem.collectedMoney +=parseInt(elem.collectedMoney) + parseInt(elem.percentage)
            b_account.debit = parseInt(b_account.debit) - parseInt(elem.percentage)
            b_account.money = parseInt(b_account.money) - parseInt(elem.percentage)
            boxOffice.debit = parseInt(boxOffice.debit) + parseInt(elem.percentage)
            boxOffice.credit = parseInt(boxOffice.credit) - parseInt(elem.percentage)
            await elem.save()
        })
        await b_account.save()    
        await boxOffice.save()           

       const creditAccounts = await CreditAccount.find({accountName: "Процентный счет"}).populate("creditType").populate("client").populate("currency")
       console.log(creditAccounts)
       creditAccounts.forEach( async(elem)=>{
                    const card = await CreditCard.findOne({_id: mongoose.Types.ObjectId(elem.client.creditCard)})
                    const startDate = new Date(elem.startDate)
                        const endDate = new Date(elem.endDate)
                        const yearDiff = endDate.getFullYear() - startDate.getFullYear();
                        const monthDiff = endDate.getMonth() - startDate.getMonth();
                        const totalMonthDiff = yearDiff * 12 + monthDiff;
                    if(elem.creditType.type === "Фиксированный"){
                        const percentage = Math.round((parseInt(elem.creditAmount) * (parseInt(elem.creditPercent)/100)) / totalMonthDiff) 
                        console.log(percentage)
                        b_account.credit  = parseInt(b_account.credit) + percentage
                        elem.credit  = parseInt(elem.credit) - percentage
                        elem.balance = parseInt(elem.balance) - percentage
                        boxOffice.debit = parseInt(boxOffice.debit) + percentage
                        boxOffice.credit = parseInt(boxOffice.credit) - percentage
                        card.credit = parseInt(card.credit) + percentage
                        card.balance = parseInt(card.balance) - percentage
                    }else{
                        const percentage = Math.round((parseInt(elem.creditAmount) / totalMonthDiff) + (parseInt(elem.balance) *((parseInt(elem.creditPercent)/100) / 12)))
                        console.log(percentage)
                        b_account.credit  = parseInt(b_account.credit) + percentage
                        elem.credit  = parseInt(elem.credit) - percentage
                        elem.balance = parseInt(elem.balance) - percentage
                        boxOffice.debit = parseInt(boxOffice.debit) + percentage
                        boxOffice.credit = parseInt(boxOffice.credit) - percentage
                        card.credit = parseInt(card.credit) + percentage
                        card.balance = parseInt(card.balance) - percentage
                    }
                    await elem.save()    
                    await card.save()
                })
                await b_account.save()
                await boxOffice.save()
                res.status(200).json({message: "Обновление прошло успешно"})
    }catch(error){
        res.status(500).json({message: error.message})
        console.log(error.message)
    }
    
})

router.get('/', async (req, res)=>{
    try{
        const clients = await Client.find()
        res.json(clients)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Get certain client
router.get('/:id', async (req, res)=>{
    try{
        await Client.findOne({_id: req.params.id}).populate('passport').populate("extra")
        .exec((err, person)=>{
            if(err) res.status(400).json({message: err.message})
            else {
                res.status(201).json(person)
            }
        })
    }catch(err){

    }
})

//todo Check for the similar clients
router.use("/", async (req, res, next)=>{
    req.isClientValid = true
    try{
        await Passport.findOne({
                passportSeries: req.body.passportSeries,
                passportID: req.body.passportID,
                issuePlace: req.body.issuePlace,
                passportNumber: req.body.passportNumber,
                birthPlace: req.body.birthPlace,
                registrationDate: req.body.registrationDate,
                registrationCity: req.body.registrationCity,
                registrationAddress:req.body.registrationAddress
        }).exec((err, passport)=>{
            if(passport){
                req.isClientValid = false
                req.message = "This passport is already exists"
            }
            next()
        })        
    }catch(err){
        console.log(err.message)
    }
})
//Create a new client

//todo Check for the passport identity

router.use("/", async(req, res, next)=>{
    if(req.isClientValid){
        try{
            await Passport.findOne({passportID: req.body.passport?req.body.passport.passportID:req.body.passportID})
            .exec((err, passport)=>{
                if(passport){
                    req.isClientValid = false
                    req.message = "This passportId is already exists!"          
                }
                next()
            })
        }catch(err){
            console.log(err.message)
        }
    }else
    next()
})

router.use("/", async(req, res, next)=>{
    if(req.isClientValid){
        try{
            await Passport.findOne({passportNumber: req.body.passport?req.body.passport.passportNumber: req.body.passportNumber})
            .exec((err, passport)=>{
                if(passport){
                    req.isClientValid = false
                    req.message = "This passport number is already exists!"
                }
                next()
            })
        }catch(err){
            console.log(err.message)
        }
    }else next()
})


//todo Check for the ID passport number
router.post("/", async (req, res)=>{
    if(req.isClientValid){
        try{
            console.log("middleware2")
           res.status(200).json("message")
            const client = new Client({
            FCs:{
                        name: req.body.FCs.name,
                        surname: req.body.FCs.surname,
                        middleName: req.body.FCs.middleName
                    },
                    birthDate: req.body.birthDate,
                    sex: req.body.sex,
                })
                const passport = new Passport({
                            passportSeries: req.body.passport.passportSeries,
                        passportID: req.body.passport.passportID,
                        issuePlace: req.body.passport.issuePlace,
                        passportNumber: req.body.passport.passportNumber,
                        birthPlace: req.body.passport.birthPlace,
                        registrationDate: req.body.passport.registrationDate,
                        registrationCity: req.body.passport.registrationCity,
                        registrationAddress:req.body.passport.registrationAddress
                })
            
                const extra = new Extra({
                    homePhone: req.body.extra.homePhone,
                    mobilePhone: req.body.extra.mobilePhone,
                    email: req.body.extra.email,
                    workPlace: req.body.extra.workPlace,
                    workPost: req.body.extra.workPost,
                    city: req.body.extra.city,
                    address: req.body.extra.address,
                    maritalStatus: req.body.extra.maritalStatus,
                    citizenship: req.body.extra.citizenship,
                    disability: req.body.extra.disability,
                    retiree: req.body.extra.retiree,
                    monthlyValue: req.body.extra.monthlyValue,
                    conscripted: req.body.extra.conscripted,
                })
                client.passport = passport
                client.extra = extra
                try{
                    await passport.save()
                    await extra.save()
                    const newClient = await client.save()
                    res.status(201).json(newClient)
                    console.log(client)
                }catch(err){
                    res.status(400).json({message: err.message})
                }
        }catch(error){
            res.status(400).json({message: "Client is already exists"})
        }    
    }else{
        res.status(409).json({message: req.message})
    }
})


//Delete a certain client

module.exports = router