const express = require("express");
const router = express.Router();

const Item = require("../../models/Items");

// @route GET api/items
// @desc Get All Items
// @access Public
router.post("/", (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then(item => res.json(item));
});

module.exports = router;
