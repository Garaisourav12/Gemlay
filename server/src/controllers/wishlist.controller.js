const WishList = require("../models/wishlist.model");

const getWishlist = async (req, res, next) => {
	const { userId } = req.user;

	try {
		const wishlist = await WishList.find({ userId }).populate("productId");

		res.status(200).json({
			success: true,
			data: wishlist,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getWishlist,
};
