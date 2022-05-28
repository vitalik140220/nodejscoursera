const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);

const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
	},
	label: {
		type: String,
	},
	price: {
		type: Currency,
		required: true,
		min: 0,
	},
	description: {
		type: String,
		required: true,
	},
	featured: {
		type: Boolean,
		required: true,
	},
});

const Promotions = mongoose.model("Promotions", promotionsSchema);

module.exports = Promotions;
