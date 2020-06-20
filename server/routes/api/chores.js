const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");

/* models */
const Chore = require("../../models/Chore");
/* Controllers */
const choresController = require("../../controllers/choresController");

/**
 * @route       api/chores/:houseId
 * @access      Public
 */
router.route("/:houseId").get(auth, choresController.getAllChoresForHouse);

/**
 * @route       api/chores/:houseId/:userId
 * @access      Public
 */
router
  .route("/:houseId/:userId")
  .post(auth, choresController.addNewChore)
  .patch(auth, choresController.updateChore);

/**
 * @route       api/chores/:houseId/:choreId
 * @access      Public
 */
router
  .route("/:houseId/:choreId")
  // .patch(auth, choresController.updateChore)
  .delete(auth, choresController.deleteChore);

module.exports = router;
