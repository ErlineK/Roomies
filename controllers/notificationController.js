/* Models */
const Notification = require("../models/Notification");

/* Controllers */
const userController = require("./userController");
const tenantsController = require("./houses/tenantsController");
const paymentController = require("./bills/paymentController");

// exports.getNotificationsForUser = async (req, res) => {
//     try{}
//     catch(err){
//         console.log(err);
//         res.status(400).json({ error: "Could not get notifications" });
//     }
// };

/**
 * @route       api/notifications/:userId
 * @access      Public
 * @returns     all user's notifications
 */
exports.getNotificationsForUser = async (req, res) => {
  try {
    //get user active house id
    const activeHouse = await userController.getUserActiveHouse(
      req.params.userId
    );
    //   TODO: limit number of notifications
    // get all notification related to user's current active house and user-specific notifications
    const notifications = await Notification.find({
      // ntf_house: activeHouse.active_house,
      $or: [
        {
          $and: [
            { to_user: { $exists: false } },
            { ntf_house: activeHouse.active_house },
            { added_date: { $gte: activeHouse.active_house_date } },
          ],
        },
        { to_user: [req.params.userId] },
      ],
    })
      .populate({
        path: "from_user",
        select: "email name",
      })
      .populate({ path: "ntf_house", select: "houseName address city" })
      .populate({
        path: "ntf_bill",
        select: "bill_type total_amount start_date end_date payments",
        populate: { path: "payments" },
      })
      .sort({ added_date: -1 });

    res.json({
      msg: "Got user notification successfully",
      messages: notifications,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get notifications" });
  }
};

/**
 * @route       api/notifications/:userId
 * @access      Public
 * @body        notification item
 * @returns     all user's notifications
 */
exports.addNotification = async (req, res) => {
  try {
    //create new notification
    await Notification.create(req.body);

    // return all notifications
    getNotificationsForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get notifications" });
  }
};

/**
 * @access      Private
 * @body        notification item
 * @returns     all user's notifications
 */
exports.addMsgNotification = async (req, res) => {
  try {
    //create new notification
    await Notification.create(req.body);

    // return all notifications for user
    getNotificationsForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get notifications" });
  }
};

/**
 * @access      Private
 * @body        {from user Id, to user Id, referred house Id}
 * @returns     notification item
 */
exports.createNvtNotification = async (fromId, toId, houseId) => {
  try {
    //create invitation notification
    const newInvitation = await Notification.create({
      type: "NVT",
      to_user: toId,
      from_user: fromId,
      ntf_house: houseId,
    });

    return newInvitation;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @access      Private
 * @body        { referred house Id, referred bill Id,}
 * @returns     notification item
 * @description create NTF notification to welcome user to house
 */
const createNtfNotificationWelcome = async (houseId, userId) => {
  try {
    //create invitation notification
    const ntfNotification = await Notification.create({
      type: "NTF",
      ntf_type: "welcome",
      ntf_house: houseId,
      from_user: userId,
    });

    return ntfNotification;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @access      Private
 * @body        { referred house Id, referred bill Id,}
 * @returns     notification item
 * @description    create NTF notification for 'bill paid'
 */
exports.createNtfNotificationBill = async (houseId, billId) => {
  try {
    //create invitation notification
    const newNtfNotification = await Notification.create({
      type: "NTF",
      ntf_house: houseId,
      ntf_bill: billId,
      ntf_type: "bill",
    });

    return newNtfNotification;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @access      Private
 * @body        { from user Id, to user Id, referred house Id, referred bill Id}
 * @returns     notification item
 */
exports.createTrnsNotification = async (fromId, toId, houseId, billId) => {
  try {
    //create invitation notification
    const newNotification = await Notification.create({
      type: "TRNS",
      to_user: toId,
      from_user: fromId,
      ntf_house: houseId,
      ntf_bill: billId,
    });

    return newNotification;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @access      Private
 * @body        { from user Id, to user Id, referred house Id, referred bill Id}
 * @returns     notification item
 */
const createNtfTrnsAcceptedNotification = async (
  fromId,
  toId,
  houseId,
  billId
) => {
  // crete notification: user accepted you transfer
  const newNotification = await Notification.create({
    type: "TRNS",
    ntf_type: "trnsAccepted",
    to_user: toId,
    from_user: fromId,
    ntf_house: houseId,
    ntf_bill: billId,
    accepted: true,
  });

  return newNotification;
};

/**
 * @access      Private
 * @body        { notification item, userId}
 * @returns     notification item
 * @description Accept notification of type roomie transfer
 */
exports.acceptRoomieTransfer = async (ntfItem, userId) => {
  // set bill/payment transfer as accepted
  await paymentController.acceptRoomieTransfer(ntfItem.ntf_bill, userId);

  // create notification Transfer accepted
  await createNtfTrnsAcceptedNotification(
    userId,
    ntfItem.from_user,
    ntfItem.ntf_house,
    ntfItem.ntf_bill
  );
  return;
};

/**
 * @access      Private
 * @body        { notification item, userId}
 * @returns     notification item
 */
exports.acceptInvitation = async (ntfItem, userId) => {
  try {
    //add house as user's active house
    await userController.updateActiveHouse(ntfItem.ntf_house, userId);

    // add user to house active tenants
    await tenantsController.setTenantActive(ntfItem.ntf_house, userId);

    // create dummy payment for house tenant
    await paymentController.addDummyPayment(ntfItem.ntf_house, userId);

    //create welcome notification (NTF, welcome) to all house tenants
    await createNtfNotificationWelcome(ntfItem.ntf_house, userId);

    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @access      Private
 * @body        { notification item, userId}
 */
exports.declineInvitation = async (ntfItem, userId) => {
  try {
    // remove tenant from house's tenants list
    await tenantsController.removeTenantFromHouse(ntfItem.ntf_house, userId);

    // remove notification
    await Notification.findByIdAndDelete(ntfItem._id);

    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @route       api/notifications/:userId/:notificationID
 * @access      Public
 * @returns     All user's notifications
 */
exports.updateNotificationAccept = async (req, res) => {
  try {
    //update notification
    const notificationItem = await Notification.findByIdAndUpdate(
      req.params.notificationID,
      req.body,
      { new: true }
    );

    switch (notificationItem.type) {
      case "NVT":
        req.body.accepted
          ? await this.acceptInvitation(notificationItem, req.params.userId)
          : await this.declineInvitation(notificationItem, req.params.userId);
        break;

      case "TRNS":
        // TODO: handle accept roomie transfer
        if (req.body.accepted) {
          await this.acceptRoomieTransfer(notificationItem, req.params.userId);
        }
        break;
    }

    //return all notifications for user
    this.getNotificationsForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update notification" });
  }
};
