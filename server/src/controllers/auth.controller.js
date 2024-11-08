const User = require("../models/user.model");
const { NotFoundError } = require("../errors");
const { generateToken } = require("../utils/authUtils");

const googleAuth = async (req, res, next) => {
	const { state } = req.query;
	const user = req.user;

	try {
		if (state === "login") {
			const {
				emails: [{ value: email }],
			} = user;

			// Database operations
			const userExist = await User.findOne({ email });

			// If user is not found, redirect to signup page
			if (!userExist) {
				// Have to send some message to signup page with the redirect
				return res.redirect(process.env.USER_NOT_EXIST_PAGE);
			}

			// Generate Jwt Token
			const token = generateToken({ userId: userExist._id });

			// Send response
			res.cookie("token", token, {
				httpOnly: true,
				expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
				sameSite:
					process.env.NODE_ENV === "development" ? "strict" : "none",
				secure: process.env.NODE_ENV !== "development",
			});

			return res.redirect(process.env.PROFILE_PAGE);
		} else if (state === "signup") {
			const {
				displayName: name,
				emails: [{ value: email }],
				photos: [{ value: profileImage }],
			} = user;

			// Find user by email
			const userExist = await User.findOne({ email });

			// If user is not found, redirect to user exist page
			if (userExist) {
				return res.redirect(process.env.USER_ALREADY_EXIST_PAGE);
			}

			// Create new user
			const newUser = new User({
				name,
				email,
				profileImage,
			});

			// Save new user
			await newUser.save();

			// Redirect to registration successfull page
			return res.redirect(process.env.REGISTRATION_SUCCESS_PAGE);
		}
	} catch (err) {
		console.log(err);

		return res.redirect(process.env.SOMETHING_WRONG_PAGE);
	}
};

const logout = async (req, res, next) => {
	try {
		res.status(200)
			.clearCookie("token", {
				sameSite:
					process.env.NODE_ENV === "development" ? "strict" : "none",
				secure: process.env.NODE_ENV !== "development",
			})
			.json({
				message: "Logout successfully",
			});
	} catch (err) {
		next(err);
	}
};

const getProfile = async (req, res, next) => {
	const { userId } = req.user;

	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new NotFoundError("User not found");
		}

		res.status(200).json({
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { googleAuth, logout, getProfile };
