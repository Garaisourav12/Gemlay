const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Cart", cartSchema);
