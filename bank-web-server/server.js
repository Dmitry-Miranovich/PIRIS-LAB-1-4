const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()

const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error)=>console.log(error))
db.once('open', ()=>console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

const clientsRouter = require("./routes/clients")
const clientDataRouter = require("./routes/clientData")
const clientRouter = require("./routes/client.js")
const bankDataRouter = require("./routes/bankData.js")
const bankRouter = require("./routes/bank.js")
const loginRouter = require("./routes/login.js")

app.use('/home/clients', clientsRouter)
app.use("/client", clientRouter)
app.use('/clientData', clientDataRouter)
app.use('/bankData', bankDataRouter)
app.use("/bankAccount", bankRouter)
app.use("/login", loginRouter)


app.listen(5000, ()=>console.log('Server Started'))