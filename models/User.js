const mongoose = require("mongoose");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  birth_date: {
    type: Date,
  },
  user_avatar: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  active_house: {
    type: mongoose.Types.ObjectId,
  },
  active_house_date: {
    type: Date,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
