const mongoose = require("mongoose")

const PolicyScheme = mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true },
    DOB: { type: String, required: true },
    age: String,
    gender: String,
    sum_assured: String,
    modal_premium: String,
    policy_term: String,
    premium_paying_term:String,
    premium_frequency:String
},{ timestamps: true })

const PolicyModel = mongoose.model("policy", PolicyScheme)

module.exports={PolicyModel}