const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { auth } = require("../../helpers/auth");

// User Model
const User = require("../../models/User");

/**
 * @route   POST api/auth
 * @desc    Auth user (Login)
 * @access  Public
 */

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email and password" });
  }

  // get user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      console.log("Couldnt find user with email " + email);
      console.log(user);
      return res.status(400).json({ error: "User not found" });
    }

    // validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

      jwt.sign(
        {
          id: user._id,
        },
        config.get("JWT_SECRET"),
        { expiresIn: 60 * 60 * 1000 },
        (err, token) => {
          if (err) throw err;

          //get user without password
          User.findById(user.id)
            .select("-password")
            .then((safeUser) =>
              res.json({
                msg: "User logged in successfully",
                token,
                user: safeUser,
              })
            )
            .catch((err) => {
              console.log(err);
              return res.status(400).json({ error: "Error getting user" });
            });
        }
      );
    });
  });
});

// /**
//  * @route       GET api/auth/user
//  * @description Get user data
//  * @access      Private
//  */

// router.get("/user", auth, (req, res) => {
//   User.findById(req.user.id)
//     .select("-password")
//     .then((user) => res.json(user));
// });
/**
 * @route       GET api/auth/:userId
 * @description Get user data
 * @access      Private
 */

router.get("/:userId", auth, (req, res) => {
  User.findById(req.params.userId)
    .select("-password")
    .then((user) =>
      res.json({
        msg: "Got user data successfully",
        user: user,
      })
    )
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: "Error getting user" });
    });
});

module.exports = router;
