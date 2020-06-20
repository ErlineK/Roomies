const mongoose = require("mongoose");
const user = require("./User").model("user");
const house = require("./House").model("house");

const ChoreSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Types.ObjectId,
    ref: house,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  leader: {
    // userID of leader
    type: mongoose.Types.ObjectId,
    ref: user,
    // required: true,
  },
  dueDate: {
    type: Date,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    // userID of updating tenant
    type: mongoose.Types.ObjectId,
    ref: user,
    required: true,
  },
});

module.exports = Chore = mongoose.model("chore", ChoreSchema);
