// Bill model
const Bill = require("../../models/Bill");

// UserComment model
const UserComment = require("../../models/UserComment");

/**
 * @route       api/bills/comment/:billId/:userId
 * @access      Public
 */
exports.addNewComment = async (req, res) => {
  try {
    //   TODO: check if user permitetd to edit bill
    if (
      houseController.checkUserCanEdit(req.params.houseId, req.params.userId)
    ) {
      // create comment
      const newComment =
        req.body.comment && req.body.comment !== ""
          ? await new UserComment({
              author: req.params.userId,
              msg: req.body.comment,
            }).save()
          : undefined;

      //  TODO: add comment to bill_comments

      // return all bills
      this.getAllBillsForHouse(req, res);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add comment" });
  }
};
