const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");

const houseController = require("../../controllers/houses/houseController");
const tenantsController = require("../../controllers/houses/tenantsController");

/**
 * @route       api/houses/:userId
 * @access      Public
 */
router
  .route("/:userId")
  .get(auth, houseController.getAllHousesForUser)
  .patch(auth, houseController.updateHouse)
  .post(auth, houseController.addNewHouse);

/**
 * @route       api/houses/accept/:userId/:houseId
 * @access      Public
 * @description Accept house invitation
 */
router
  .route("/accept/:userId/:houseId")
  .patch(auth, houseController.acceptHouseInv);

/**
 * @route       api/houses/:userId/tenants
 * @access      Public
 */
router.route("/:userId/tenants").put(auth, tenantsController.addTenant);

module.exports = router;
