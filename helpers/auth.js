const config = require("config");
const jwt = require("jsonwebtoken");

// Bill model
const Bill = require("../models/Bill");

// House model
const House = require("../models/House");

// validates user token
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for Unauthorized
  if (!token) {
    return res.status(401).json({ error: "Authorization denied for user" });
  }

  try {
    // verify token and get user id from it
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.userID = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Token not vaild" });
  }
}

//checks if user is permited to edit bill
async function billAuth(req, res, next) {
  try {
    const bill = await Bill.findById(req.params.billId)
      // .populate("ref_house");
      .select("ref_house");

    const house = await House.find({
      _id: bill.ref_house,
      approved_tenants: req.params.userId,
    }).select("approved_tenants");

    if (house) {
      next();
    } else {
      return res.status(401).json({ error: "Authorization denied for bill" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Authorization denied" });
  }
}

module.exports = { auth, billAuth };
