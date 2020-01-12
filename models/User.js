const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserChema = {
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
        required: true,
        unique: true
	},
	password: {
		type: String,
		required: true
	},
	registration_date: {
		type: Date,
		default: Date.now
	}
};

module.exports = Item = mongoose.model("user", UserChema);
