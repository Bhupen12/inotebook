const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_TOKEN = "mynameisbhupen";

//Create a User using :POST "api/auth/". Doesn't require Auth
router.post(
  "/createuser",
  [
    check("name", "Name shouldn't be null").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      res.json({ authToken });
    } catch (err) {
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
