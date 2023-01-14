const mongoose = require("mongoose")
require("dotenv").config()
mongoose.set('strictQuery', false)
const connection = mongoose.connect("mongodb+srv://Mufadal:MUFFY0101@cluster0.laqkkt4.mongodb.net/ValueEnable") // MAKING CONNECTION WITH MONGOOSE

module.exports={connection}         