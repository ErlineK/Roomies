const mongoose = require("mongoose");
const user = require("./User").model("user");

const UserCommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: user,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  publish_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserComment = mongoose.model("userComment", UserCommentSchema);
