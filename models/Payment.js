const mongoose = require("mongoose");
const user = require("./User").model("user");
const userComment = require("./UserComment").model("userComment");
const house = require("./House").model("house");

const PaymentSchema = new mongoose.Schema({
  added_date: {
    type: Date,
    default: Date.now,
  },
  payment_type: {
    type: String,
    enum: ["rTRNS", "Bill", "Other"],
  },
  transaction_date: {
    type: Date,
    default: Date.now,
  },
  reference_num: {
    type: String,
    maxlength: 12,
  },
  house_ref: {
    type: mongoose.Types.ObjectId,
    ref: house,
    required: true,
  },
  from_user: {
    type: mongoose.Types.ObjectId,
    ref: user,
    required: true,
  },
  to_user: {
    type: mongoose.Types.ObjectId,
    ref: user,
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0,
    max: 1000.0,
  },
  user_comment: {
    type: mongoose.Types.ObjectId,
    ref: userComment,
  },
  reference_images: [
    {
      type: String,
    },
  ],
  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
