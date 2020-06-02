// House model
const House = require("../../models/House");

// User controller
const userController = require("../userController");
// Notifications controller
const notificationController = require("../notificationController");
// House controller
const houseController = require("./houseController");

/**
 * @route       api/houses/:userId/tenants
 * @access      Public
 * @receives    {house Id, tenant email, tenant name (to be used later)}
 * @returns     All houses for user
 */
exports.addTenant = async (req, res) => {
  const { houseId, email, name } = req.body;

  try {
    // get user with tenant email
    const tenant = await userController.getSafeUserByParam({ email: email });
    if (!tenant) {
      res.status(404).json({ error: "No such user" });
    }

    // add tenant to house
    await House.findByIdAndUpdate(houseId, {
      $push: { house_tenants: tenant },
    });

    // create invitation notification
    notificationController.createNvtNotification(
      req.params.userId,
      tenant._id,
      houseId
    );
    // get houses list
    houseController.getAllHousesForUser(req, res);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Could not add tenant" });
  }
};

/**
 * @access      Private
 * @returns     house item
 * @description add tenant to 'approved tenants' list of a house object
 */
exports.getHouseTenants = async (houseId) => {
  return await House.findById(houseId)
    .select("approved_tenants")
    .populate({ path: "approved_tenants", select: "name" });
};

/**
 * @access      Private
 * @returns     house item
 * @description add tenant to 'approved tenants' list of a house object
 */
exports.setTenantActive = async (houseId, userId) => {
  return House.findByIdAndUpdate(houseId, {
    $push: { approved_tenants: userId },
  });
};

/**
 * @access      Private
 * @returns     house item
 * @description remove tenant from 'house tenants' list of a house object
 */
exports.removeTenantFromHouse = async (houseId, userId) => {
  return House.findByIdAndUpdate(
    houseId,
    {
      $pull: { house_tenants: userId },
    },
    { new: true }
  );
};
