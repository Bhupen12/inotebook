const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Create a User using :POST "api/auth/". Doesn't require Auth
router.post(
  "/",
  [
    check("name", "Name shouldn't be null").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then((user) => res.json(user));
    } catch (error) {
      console.log("something went wrong", error);
      res.status(500).send("something went wrong!!");
    }
  }
);

module.exports = router;
