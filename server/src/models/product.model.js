const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		remainingStock: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Product", productSchema);
