const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const config = require("config");
// const jwt = require("jsonwebtoken");
const { auth } = require("../../helpers/auth");

/* Models */
const User = require("../../models/User");
/* Controllers */
const userController = require("../../controllers/userController");

/**
 * @route       api/users
 * @description Register new user
 * @access      Public
 */
router.route("/").post(userController.registerNewUser);

/**
 * @route   api/users/:userId
 * @access  Public
 */
router.route("/:userId").patch(auth, userController.updateUser);

/**
 * @route       PUT api/users/profile
 * @description Update user
 * @access      Public
 */
router.put("/profile", auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .select("-password")
    .then((user) => res.json({ msg: "Updated successfully", user }))
    .catch((err) => res.status(400).json({ error: "Unable to update user" }));
});

/**
 * @route       PUT api/users/avatar
 * @description Update user avatar
 * @access      Public
 */
router.put("/avatar", auth, (req, res) => {
  console.log("updating avatar for user " + req.body.userId);
  User.findByIdAndUpdate(
    { _id: req.body.userId },
    { user_avatar: req.body.avatar },
    { new: true }
  )
    .select("-password")
    .then((user) => {
      res.json({ msg: "Avatar updated successfully", user });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Unable to update avatar" });
    });
});

module.exports = router;
