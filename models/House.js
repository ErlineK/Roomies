const mongoose = require("mongoose");
const user = require("./User").model("user");

const HouseSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  opened: {
    type: Date,
    default: Date.now,
  },
  houseName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    enum: ["ON", "QC", "NS", "NB", "MB", "BC", "PE", "SK", "AB", "NL"],
    required: true,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
  },
  house_tenants: [
    {
      type: mongoose.Types.ObjectId,
      ref: user,
    },
  ],
  approved_tenants: [
    {
      type: mongoose.Types.ObjectId,
      ref: user,
    },
  ],
});

module.exports = House = mongoose.model("house", HouseSchema);
