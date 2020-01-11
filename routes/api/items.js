const express = require("express");
const router = express.Router();

const Item = require("../../models/Items");

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
