const express = require("express");
const authRouter = express.Router();
const passport = require("../passport");
const authController = require("../controllers/auth.controller");
const isAuth = require("../middlewares/isAuth");

authRouter.get(
	"/login/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		state: "login",
	})
);

authRouter.get(
	"/signup/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		state: "signup",
	})
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	authController.googleAuth
);

authRouter.get("/profile", isAuth, authController.getProfile);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
