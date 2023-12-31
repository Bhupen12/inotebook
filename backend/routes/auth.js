const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_TOKEN = "mynameisbhupen";

//Route 1: Create a User using :POST "api/auth/". Doesn't require Auth
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
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({ success, error: "User already exists" });
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
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      res.status(500).send("Some error occured");
    }
  }
);

//Route 2: Login a User using :POST "api/auth/". No login required
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ success, error: "Invalid Credentials" });
      }
      const passCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passCompare) {
        return res.status(400).send({ success, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      success = true;
      res.json({ success, authToken });
    } catch {
      res.status(500).send("Internal Server Error");
    }
  }
);

// Router 3: Get loggedin User Details using :POST "api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.status(200).send(user);
  } catch {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
