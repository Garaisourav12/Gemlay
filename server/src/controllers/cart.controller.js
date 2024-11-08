const Cart = require("../models/cart.model");
const { NotFoundError, ForbiddenError } = require("../errors");

const getCart = async (req, res, next) => {
	const { userId } = req.user;

	try {
		const cart = await Cart.find({ userId }).populate("productId");

		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {
		next(err);
	}
};

const addToCart = async (req, res, next) => {
	const { productId, quantity } = req.body;
	const { userId } = req.user;

	try {
		// try to find cart
		let cart = await Cart.findOne({ userId, productId });

		if (!cart) {
			// if cart not found create new
			cart = new Cart({ userId, productId, quantity });
		} else {
			// if cart found increment quantity
			cart.quantity += quantity;
		}

		// save cart
		await cart.save();

		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {
		next(err);
	}
};

const removeFromCart = async (req, res, next) => {
	const { cartId } = req.params;

	try {
		// Find cart
		const cart = await Cart.findById(cartId);

		// If cart not found
		if (!cart) {
			throw new NotFoundError("Cart not found");
		}

		// Check if user is authorized to perform this action
		if (cart.userId.toString() !== req.user.userId) {
			throw new ForbiddenError(
				"You are not authorized to perform this action"
			);
		}

		// Decrease quantity
		cart.quantity -= 1;

		// Save cart
		await cart.save();

		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {}
};

const deleteFromCart = async (req, res, next) => {
	const { cartId } = req.params;

	try {
		// Find cart
		const cart = await Cart.findById(cartId);

		// If cart not found
		if (!cart) {
			throw new NotFoundError("Cart not found");
		}

		// Check if user is authorized to perform this action
		if (cart.userId.toString() !== req.user.userId) {
			throw new ForbiddenError(
				"You are not authorized to perform this action"
			);
		}

		// Delete cart
		await Cart.findByIdAndDelete(cartId);

		res.status(200).json({
			success: true,
			message: "Cart deleted successfully",
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { getCart, addToCart, removeFromCart, deleteFromCart };
