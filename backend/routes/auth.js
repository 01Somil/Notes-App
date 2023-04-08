const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser")
const JWT_SECRET = "MERN";

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {

        return res.status(400).json({ success,error: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData)
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

// For Login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try to login with valid credentials" });
      }
      let success=false;
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
      {
        success=false;
        return res.status(400).json({ success,error: "Please try to login with valid credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData)
      success=true;
      res.json({ success, authToken });

    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
);


// Fetch user details
router.post("/getuser",fetchuser,async (req, res) => {
    try {
      let userId=req.user.id;
      const user=await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
);


module.exports = router;
