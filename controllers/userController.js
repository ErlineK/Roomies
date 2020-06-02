const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User model
const User = require("../models/User");

/**
 * @route       api/users
 * @access      Public
 * @description Register new user
 * @returns     Updated user
 */
exports.registerNewUser = async (req, res) => {
  const { email, password, name } = req.body;

  // validate unique email
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    // const newUser = new User({ name, email, password });

    // Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, passHash) => {
        if (err) throw err;
        // newUser.password = hash;

        // create new user and return user token valid for 1 hour
        User.create({ name, email, password: passHash })
          .then((user) => {
            jwt.sign(
              {
                id: user._id,
              },
              config.get("JWT_SECRET"),
              { expiresIn: 60 * 60 * 1000 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  msg: "User was added successfully",
                  token,
                  user: {
                    _id: user._id,
                    name,
                    email,
                  },
                });
              }
            );
          })
          .catch((err) => {
            console.log("registration err: " + err);
            res.status(400).json({ error: "Unable to add new user" });
          });
      });
    });
  });
};

/**
 * @route
 * @access      Public
 * @description User's params to update
 * @returns     Updated user
 */
exports.updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .select("-password")
    .then((user) => res.json({ msg: "Updated successfully", user }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Could not update user" });
    });
};

/**
 * @access      Private
 * @receives    User params object
 * @returns     User object without the password
 */
exports.getSafeUserByParam = async (searchObj) => {
  return User.findOne(searchObj).select("-password");
};

/**
 * @access      Private
 * @receives    User params object
 * @returns     User object without the password
 */
exports.getUserActiveHouse = async (userId) => {
  return await User.findById(userId).select(
    "name active_house active_house_date"
  );
};

/**
 * @access      Private
 * @receives    houseId, userId
 * @returns     User object without the password
 * @description updates user's active_house
 */
exports.updateActiveHouse = async (houseId, userId) => {
  return User.findByIdAndUpdate(
    userId,
    {
      active_house: houseId,
      active_house_date: Date.now(),
    },
    { new: true }
  ).select("-password");
};
