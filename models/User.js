const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
});

User.plusgin(passwordLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;
