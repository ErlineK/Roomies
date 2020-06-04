// House model
const House = require("../../models/House");
// User controller
const userController = require("../userController");

/* Controllers */
const notificationController = require("../notificationController");
const paymentController = require("../bills/paymentController");

/**
 * @route       api/houses/:userId
 * @access      Public
 * @returns     All user's houses
 */
exports.getAllHousesForUser = async (req, res) => {
  try {
    // get all houses where user is a tenant
    const houses = await House.find()
      .where("house_tenants")
      .equals(req.params.userId)
      .populate({
        path: "house_tenants",
        select: "email name",
      })
      .populate({ path: "approved_tenants", select: "name" })
      .sort({ opened: -1 });

    res.json({ msg: "Got user houses successfully", houses: houses });
  } catch (err) {
    res.status(404).json({ error: "Could not find houses" });
  }
};

/**
 * @route       api/houses/:userId
 * @access      Public
 * @returns     Usdeted house
 */
exports.updateHouse = async (req, res) => {
  House.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((house) => res.json({ msg: "Updated successfully", house }))
    .catch((err) => res.status(400).json({ error: "Could not update house" }));
};

/**
 * @route       api/houses/:userId
 * @access      Public
 * @returns     Updated user (all houses are retreived from client)
 */
exports.addNewHouse = async (req, res) => {
  const reqDataHouse = req.body.newHouse;

  try {
    // save new house
    const newHouse = await new House({
      admin: req.params.userId,
      houseName: reqDataHouse.houseName,
      address: reqDataHouse.address,
      city: reqDataHouse.city,
      province: reqDataHouse.province,
      description: reqDataHouse.description,
      house_tenants: [req.params.userId], // set user as first member in house
      approved_tenants: [req.params.userId], // self approved
      avatar: reqDataHouse.avatar,
    }).save();

    // create dummy payment for house tenant
    await paymentController.addDummyPayment(newHouse._id, req.params.userId);

    //update user's active house
    const updateUserReq = {
      params: { userId: req.params.userId },
      body: { active_house: newHouse._id, active_house_date: Date.now() },
    };
    userController.updateUser(updateUserReq, res);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Could not save new house" });
  }
};

/**
 * @access      Private
 * @returns     house item
 * @description checks a user is an approved tenant in house and is authorized to modify related info
 */
exports.checkUserCanEdit = async (houseId, userId) => {
  try {
    const authorized = await House.find({
      _id: houseId,
      approved_tenants: userId,
    });
    return authorized;
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * @route       api/houses/house/:userId/:houseId
 * @access      Public
 * @receive     {accepted : Boolean, viewed : Boolean}
 * @returns     Updated user
 */
exports.acceptHouseInv = async (req, res) => {
  try {
    // update invitation accepted and do accept invitation proccess
    const invitationItem = await Notification.findOneAndUpdate(
      {
        type: "NVT",
        ntf_house: req.params.houseId,
        to_user: req.params.userId,
      },
      res.body,
      { new: true }
    );

    req.body.accepted
      ? await notificationController.acceptInvitation(
          invitationItem,
          req.params.userId
        )
      : await notificationController.declineInvitation(
          invitationItem,
          req.params.userId
        );

    const user = await userController.getSafeUserByParam({
      _id: req.params.userId,
    });
    res.json({ msg: "Invitation updated", user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update house invitation" });
  }
};
