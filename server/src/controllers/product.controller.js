const { BadRequestError, NotFoundError } = require("../errors");
const Product = require("../models/product.model");
const { isArray } = require("../utils/commonUtils");

const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find({});

		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		next(err);
	}
};

const getProduct = async (req, res, next) => {
	const { id } = req.params;

	try {
		// If id is not provided
		if (!id) {
			throw new BadRequestError("Product not found");
		}

		// Find product
		const product = await Product.findById(id);

		// If product not found
		if (!product) {
			throw new NotFoundError("Product not found");
		}

		return res.status(200).json({
			success: true,
			data: product,
		});
	} catch (err) {
		next(err);
	}
};

const addProduct = async (req, res, next) => {
	const { name, price, description, image, remainingStock } = req.body;

	try {
		if (!name || !price || !description || !image || !remainingStock) {
			throw new BadRequestError("All fields are required");
		}

		if (remainingStock <= 0) {
			throw new BadRequestError("Remaining stock must be positive");
		}

		if (price <= 0) {
			throw new BadRequestError("Price must be positive");
		}

		const product = new Product({
			name,
			price,
			description,
			image,
			remainingStock,
		});

		await product.save();

		return res.status(201).json({
			success: true,
			data: product,
			message: "Product added successfully",
		});
	} catch (err) {
		next(err);
	}
};

const addManyProducts = async (req, res, next) => {
	const products = req.body;

	try {
		if (!isArray(products)) {
			throw new BadRequestError("Products must be an array");
		}

		// Data validation
		products.forEach((product) => {
			if (
				!product.name ||
				!product.price ||
				!product.description ||
				!product.image ||
				!product.remainingStock
			) {
				throw new BadRequestError("All fields are required");
			}

			if (product.remainingStock <= 0) {
				throw new BadRequestError("Remaining stock must be positive");
			}

			if (product.price <= 0) {
				throw new BadRequestError("Price must be positive");
			}
		});

		await Product.insertMany(products);

		return res.status(201).json({
			success: true,
			message: "Products added successfully",
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { getAllProducts, getProduct, addProduct, addManyProducts };
