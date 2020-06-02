const express = require("express");
const router = express.Router();
const { auth, billAuth } = require("../../helpers/auth");

const billController = require("../../controllers/bills/billController");
const paymentController = require("../../controllers/bills/paymentController");
const billCommentsController = require("../../controllers/bills/billCommentsController");
const balanceController = require("../../controllers/bills/balanceController");

/**
 * @route       api/bills/:houseId/:userId
 * @access      Public
 */
router
  .route("/:houseId/:userId")
  .get(auth, billController.getAllBillsForHouse)
  .patch(auth, billController.updateBill)
  .post(auth, billController.addNewBill);

/**
 * @route       api/bills/bill/:billId/:userId
 * @access      Public
 */
router
  .route("/bill/:billId/:userId")
  .delete(auth, billAuth, billController.deleteBill);

/**
 * @route       api/bills/accept/:houseId/:userId
 * @access      Public
 * @description Accept Roomie transfer
 */
router
  .route("/accept/:houseId/:userId")
  .patch(auth, billController.acceptRoomieTransfer);

/**
 * @route       api/bills/payment/:billId/:userId
 * @access      Public
 */
router
  .route("/payment/:billId/:userId")
  .post(auth, billAuth, paymentController.addNewPayment)
  .delete(auth, paymentController.deletePayment);

/**
 * @route       api/bills/comment/:billId/:userId
 * @access      Public
 */
router
  .route("/comment/:billId/:userId")
  .post(auth, billCommentsController.addNewComment);
// .delete(billController.deleteComment);

/**
 * @route       api/bills/comment/:houseId/:userId
 * @access      Public
 */
router
  .route("/balance/:houseId/:userId")
  .get(auth, balanceController.getUserBalance);

module.exports = router;
