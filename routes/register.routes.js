const { Router } = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const AlreadyRegistered = require("../middleware/AlreadyExist")
const { PasswordChecker } = require("../middleware/passwordChecker")
require("dotenv").config()
RegisterationController = Router()

// LOGIN ROUTE
RegisterationController.post("/login", async(req, res) => {
    const { email, password } = req.body 
    let hashed = null                                   // INITIAL HASHED PASSWORD
    const user = await UserModel.findOne({ email })     // CHECK IF USER EXIST
    if (user) hashed = user.password                    // EXTRACTING HASHED PASSWORD 
    else return res.status(400).send({response:"USER NOT FOUND"})
    bcrypt.compare(password, hashed, (err, result) => { // COMPARING PLAIN PASSWORD WITH HASHED
        if (result) {
            const token = jwt.sign({ userId: user._id, userEmail: user.email }, process.env.SECRET_KEY) //JSON WEB TOKEN TO AUTHENTICATE
            res.status(200).send({response:"LOGIN SUCCESS",token})            //SUCCESS
        }
        else {
            res.status(400).send({response:"LOGIN FAILED"})             //ERROR IF WRONG CREDS
        }
    })
}) 

// SIGNUP ROUTE
RegisterationController.post("/signup",AlreadyRegistered,PasswordChecker, (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, 5, async (err, hash) => {  // HASHING PASSWORD TO SECURE PERSONAL INFORMATION
            const user = UserModel({ email, name, password: hash })
            await user.save()                          // SAVING TO DATABASE
            res.status(200).send({response:"SIGNUP SUCCESS"})
    })
    
})
module.exports={RegisterationController}