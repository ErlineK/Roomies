/* Models */
const Chore = require("../models/Chore");

/**
 * @route       api/chores/:houseId
 * @access      Public
 * @returns     all house chores
 */
exports.getAllChoresForHouse = async (req, res) => {
  try {
    const chores = await Chore.find({ houseID: req.params.houseID })
      .sort({
        dueDate: -1,
      })
      .populate({ path: "leader", select: "name" });

    res.json({ msg: "Got house chores successfully", chores: chores });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Could not get chores" });
  }
};

/**
 * @route       api/chores/:houseId/:userId
 * @access      Public
 * @returns     add new chore to house
 */
exports.addNewChore = async (req, res) => {
  const reqDataChore = req.body;

  try {
    // save new chore
    const newChore = await new Chore({
      houseId: req.params.houseId,
      task: reqDataChore.task,
      leader: reqDataChore.leader ? reqDataChore.leader : undefined,
      dueDate: reqDataChore.dueDate ? reqDataChore.dueDate : undefined,
      updated_by: req.params.userId,
      updated_date: Date.now(),
    }).save();

    this.getAllChoresForHouse(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not add chore" });
  }
};

/**
 * @route       api/chores/:houseId/:userId
 * @access      Public
 * @returns     update chore
 */
exports.updateChore = async (req, res) => {
  const reqDataChore = req.body.chore;

  try {
    const updatedChore = await Chore.findByIdAndUpdate(req.body.choreId, {
      updated_by: req.params.userId,
      updated_date: Date.now(),
      ...req.body,
    });

    this.getAllChoresForHouse(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not update chore" });
  }
};

/**
 * @route       api/chores/:houseId/:choreId
 * @access      Public
 * @returns     delete chore
 */
exports.deleteChore = async (req, res) => {
  try {
    const deletedChore = await Chore.findByIdAndRemove(req.params.choreId);

    this.getAllChoresForHouse(req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not delete chore" });
  }
};
