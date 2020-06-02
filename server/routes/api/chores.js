const express = require("express");
const router = express.Router();

// Load Chore model
const Chore = require("../../models/Chore");

// @route GET api/chores/test
// @description tests chores route
// @access Public
router.get("/test", (req, res) => res.send("chores route testing!"));

// @route GET api/chores
// @description Get all chores
// @access Public
router.get("/", (req, res) => {
  Chore.find()
    .sort({ dueDate: -1 })
    .then(chores => res.json(chores))
    .catch(err => res.status(404).json({ nochoresfound: "No Chores found" }));
});

// @route GET api/chores
// @description Get all chores for houseId
// @access Public
router.get("/:houseId", (req, res) => {
  Chore.find({ houseID: req.params.houseID })
    .sort({ dueDate: -1 })
    .then(chores => res.json(chores))
    .catch(err => res.status(404).json({ nochoresfound: "No chores found" }));
});

// @route GET api/chores/:id
// @description Get single chore by id
// @access Public
router.get("/:id", (req, res) => {
  Chore.findById(req.params.id)
    .then(chore => res.json(chore))
    .catch(err => res.status(404).json({ nochorefound: "No Chore found" }));
});

// @route POST api/chores
// @description add/save chore
// @access Public
router.post("/", (req, res) => {
  Chore.create(req.body)
    .then(chore => res.json({ msg: "Chore added successfully" }))
    .catch(err => res.status(400).json({ error: "Unable to add this chore" }));
});

// @route PUT api/chores/:id
// @description Update chore
// @access Public
router.put("/:id", (req, res) => {
  Chore.findByIdAndUpdate(req.params.id, req.body)
    .then(chore => res.json({ msg: "Updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/chores/:id
// @description Delete chore by id
// @access Public
router.delete("/:id", (req, res) => {
  Chore.findByIdAndRemove(req.params.id, req.body)
    .then(chore => res.json({ mgs: "Chore entry deleted successfully" }))
    .catch(err => res.status(404).json({ error: "No such a chore" }));
});

module.exports = router;
