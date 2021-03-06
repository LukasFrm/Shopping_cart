const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ msg: "User already exists" });
	});

	const newUser = new User({ name, email, password });

	// Create salt & hash
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save().then(user =>
				jwt.sign(
					{ id: user.id },
					config.get("jwtSecret"),
					{ expiresIn: 4000 },
					(err, token) => {
						if (err) throw err;
						res.json({
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email
							}
						});
					}
				)
			);
		});
	});
});

// @route POST api/users
// @desc Create a post
// @access Public

// @route DELETE api/users/:id
// @desc Delete a post
// @access Public

module.exports = router;
