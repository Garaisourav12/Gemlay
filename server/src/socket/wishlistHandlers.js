const WishList = require("../models/wishlist.model");

const addToWishlist = async (data, sockets, io) => {
	const { userId, productId } = data;

	try {
		const product = await WishList.findOne({
			productId,
		});

		if (!product) {
			throw new NotFoundError("Product not found");
		}

		const wishlist = new WishList({
			userId,
			productId,
		});

		// Save wishlist to database
		await wishlist.save();

		sockets.forEach((socket) => {
			io.to(socket).emit("new-wishlist", product);
		});
	} catch (err) {}
};

const deleteFromWishlist = async (data, sockets, io) => {
	const { wishlistId } = data;

	try {
		// Find wishlist
		const wishlist = await WishList.findById(wishlistId);

		// If wishlist not found
		if (!wishlist) {
			throw new NotFoundError("Wishlist not found");
		}

		// Delete wishlist
		await WishList.findByIdAndDelete(wishlistId);

		sockets.forEach((socket) => {
			io.to(socket).emit("delete-wishlist", wishlist);
		});
	} catch (err) {}
};

module.exports = { addToWishlist, deleteFromWishlist };
