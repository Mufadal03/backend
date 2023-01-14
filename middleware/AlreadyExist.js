const { UserModel } = require("../models/user.model")

const AlreadyRegistered = async (req, res, next) => {
    const { email } = req.body
    const exist = await UserModel.findOne({ email })
    if (exist == null) next()
    else res.send({response:"User Already exist"})
 }
module.exports=AlreadyRegistered