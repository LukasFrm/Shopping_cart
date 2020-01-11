const express = require("express");
const router = express.Router();

const Item = require("../../models/Items");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items));
  });

// @route POST api/items
// @desc Create a post
// @access Public
router.post("/", (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete a post
// @access Public
router.delete("/:id", (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ successful: true })))
		.catch(err => res.status(404).json({ successful: false }));
});

module.exports = router;
