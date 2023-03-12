const express = require("express")
const City = require("../models/city")
const Citizenship = require("../models/citizenship")
const Disability = require("../models/disability")
const MaritalStatus = require("../models/maritalStatus")
const router = express.Router()


const DepositType = require("../models/deposit/depositType.js")
const CreditType = require("../models/credit/creditType.js")
const Currency = require("../models/deposit/currency.js")



const initStart = (req, res, next)=>{
    try{

    }catch(err){

    }
}



router.post("/cities", async (req, res)=>{
    const city = new City({
        name: req.body.name,
        country: req.body.country
    })
    try{
        const newCity = await city.save()
        res.status(201).json(newCity)
    }catch(e){
        res.status(400).json({message: e.message})
    }
})

router.get("/cities", async (req, res)=>{
    try{
        const cities = await City.find()
        res.status(200).json(cities)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})
/**
 * Citizenship
 */
router.post("/citizenship", async (req, res)=>{
    const disability = new Disability({
        name: req.body.name,
        dualCitizenship: req.body.dualCitizenship
    })
    try{
        const newCitizenship = await citizenship.save()
        res.status(201).json(newCitizenship)
    }catch(e){
        res.status(400).json({message: e.message})
    }
})

router.get("/citizenship", async (req, res)=>{
    try{
        const citizenship = await Citizenship.find()
        res.status(200).json(citizenship)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})
/**
 * Disability routes
 */
router.post("/disability", async (req, res)=>{
    const disability = new Disability({
        name: req.body.name,
        createdData: req.body.createdData
    })
    try{
        const newDisability = await disability.save()
        res.status(201).json(newDisability)
    }catch(e){
        res.status(400).json({message: e.message})
    }
})

router.get("/disability", async (req, res)=>{
    try{
        const disability = await Disability.find()
        res.status(200).json(disability)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

/**
 * Marital status routes
 */
 router.post("/maritalStatus", async (req, res)=>{
    const maritalStatus = new MaritalStatus({
        name: req.body.name,
        description: req.body.description
    })
    try{
        const newMaritalStatus = await maritalStatus.save()
        res.status(201).json(newMaritalStatus)
    }catch(e){
        res.status(400).json({message: e.message})
    }
})

router.get("/maritalStatus", async (req, res)=>{
    try{
        const maritalStatuses = await MaritalStatus.find()
        res.status(200).json(maritalStatuses)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

module.exports = router