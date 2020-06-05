const mongoose = require("mongoose");
const user = require("./User").model("user");
const house = require("./House").model("house");
const bill = require("./Bill").model("bill");

const NotificationSchema = new mongoose.Schema({
  type: {
    /* NVT => Invitation to join a peoperty account
     * MSG => message on messages board
     * NTF => notification of paid bill/welcome new tenant/birthdays(?)
     * TRNS => notification of transaction between tenants
     */
    type: String,
    enum: ["NVT", "MSG", "NTF", "TRNS"],
    required: true,
  },
  ntf_type: {
    type: String,
    enum: ["bill", "welcome", "general", "trnsAccepted"],
  },
  to_user: {
    type: mongoose.Types.ObjectId,
    ref: user,
  },
  from_user: {
    type: mongoose.Types.ObjectId,
    ref: user,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
  ntf_house: {
    type: mongoose.Types.ObjectId,
    ref: house,
  },
  ntf_bill: {
    type: mongoose.Types.ObjectId,
    ref: bill,
  },
  msg: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
