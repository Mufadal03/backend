const { Router } = require("express")
const { PolicyModel } = require("../models/policy.model")

PolicyController = Router()

PolicyController.post("/create", async(req, res) => {
    const policy = PolicyModel({ ...req.body })
    await policy.save()
    res.status(200).send({response:"Policy Created"})
})


PolicyController.get("/", async (req, res) => {
    const { userId } = req.body
    const Policies = await PolicyModel.find({ userId })
    res.status(200).send(Policies)
})  

module.exports={PolicyController}
