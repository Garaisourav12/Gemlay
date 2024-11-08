const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = model("WishList", wishlistSchema);
