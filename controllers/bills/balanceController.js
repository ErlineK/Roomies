/* Models */
const Bill = require("../../models/Bill");
const House = require("../../models/House");
const Payment = require("../../models/Payment");

/* Controllers */
const paymentController = require("../../controllers/bills/paymentController");

/**
 * @route       api/bills/balance/:houseId/:userId
 * @access      Public
 * @description Calculate user balance for house
 * @returns     User balance object
 */
exports.getUserBalance = async (req, res) => {
  // // TODO: limit balance to last break even date
  try {
    // get total payments each tenant made exluding roomie transfers
    const roomieTransSums = await paymentController.getPaymentsSum(
      req.params.houseId,
      req.params.userId
    );

    // calculate base bills break-even
    const billsNotEmpty =
      roomieTransSums.billSums && roomieTransSums.billSums.length > 0;
    const numRoomies = billsNotEmpty ? roomieTransSums.billSums.length : 0;
    const billsPaidTotal = billsNotEmpty
      ? roomieTransSums.billSums.map((p) => p.total).reduce((a, b) => a + b, 0)
      : 0;
    const billsEven = billsPaidTotal / numRoomies;

    // calculate individual balance for each user
    let userBalances = roomieTransSums.billSums;
    userBalances = userBalances.map((user) => {
      // Check if balance calculated for me
      const me = user._id == req.params.userId;

      let received = getTransfersForUser(
        me,
        roomieTransSums.roomieReceived,
        user._id
      );

      // If user is me: add all given transfers, If giving: substruct for receiveing user
      let transfered = getTransfersForUser(
        me,
        roomieTransSums.roomieTransfered,
        user._id
      );

      let newUser = {
        ...user,
        totals: {
          received: received,
          transfered: transfered,
          paidBills: user.total,
          billsEven: Number(billsEven.toFixed(2)),
        },
        totalBalance: Number(
          (user.total - billsEven + received - transfered).toFixed(2)
        ),
      };
      return newUser;
    });

    res.json({ msg: "Got balance successfully", balance: userBalances });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not get balance" });
  }
};

/**
 * @access      Private
 * @description Calculate user balance for house
 * @requires    {me: Boolean, transfers: Obj Array: iUserId: String}
 * @returns     User transfers sum total : Number
 */
function getTransfersForUser(me, transfers, iUserId) {
  let totalTransfered = 0;

  if (transfers) {
    totalTransfered = me
      ? transfers
          .map((rTransfer) => rTransfer.totalTransfered)
          .reduce((a, b) => a + b, 0)
      : transfers.filter(
          (rTrns) => rTrns._id.toString() === iUserId.toString()
        );

    if (!me) {
      totalTransfered =
        totalTransfered.length > 0
          ? (totalTransfered = totalTransfered[0].totalTransfered)
          : 0;
    }
  }

  totalTransfered = me ? 0 - totalTransfered : totalTransfered;

  return totalTransfered;
}
