const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const Authentication = (req, res, next) => {
  if (!req.headers.authorization) return res.send({ response: "Please Login" }); // IF TOKEN IN NOT PRESENT WHICH MEANS NOT AUTHORIZED 
  const token = req.headers.authorization.split(" ")[1];     // EXTRACTING TOKEN
  jwt.verify(token, "VALUE_ENABLE", async (err, decoded) => {  // DECODING DATA FROM TOKEN 
    if (err) return res.send({ response: "Please Login!!" });// IF TOKEN EXPIRED OR INCORRECT THEN FAILED
    else {
      const { userId, userEmail } = decoded;                  
      const user = await UserModel.findOne({ _id: userId })   // MANIPULATING REQUEST OBJECT
      req.body.name=user?.name
      req.body.userId = userId;
      req.body.email = userEmail;
      next();
    }
  });
};

module.exports = { Authentication };