const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// @REQ     api/user
// @DESC    register a user
// @ACCESS  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should have atleast 6 charcters").isLength({
      min: 6,
      max: 14,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // In case the body has errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If the is free of any errors
    const { name, email, password } = req.body;

    try {
      // Check if a user with same email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      } else {
        user = new User({
          name,
          email,
          password,
        });

        // Hashing of password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user
        await user.save();

        // Make a payload to send
        const payload = {
          user: {
            id: user.id,
          },
        };
        // Sign a token and send
        jwt.sign(
          payload,
          config.get("jwt"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      console.log("Server Error!");
    }
  }
);

module.exports = router;
