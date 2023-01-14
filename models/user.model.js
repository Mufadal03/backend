const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:{type:String,required:true},  // USERNAME
    email: { type: String, required: true }, // USER EMAIL
    password:{type:String,required:true} // USER PASSWORD
})


const UserModel = mongoose.model("user", UserSchema)

module.exports={UserModel}