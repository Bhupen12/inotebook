const express = require("express");
const User = require("../models/User");
const router = express.Router();

//Create a User using :POST "api/auth/". Doesn't require Auth
router.post("/", (req, res) => {
  try {
    const userData = User(req.body);

    res.status(200).send({ status: "Success", userData });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).send("something went wrong!!");
  }
});

module.exports = router;
