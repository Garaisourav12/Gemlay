const express = require("express");
const isAuth = require("../middlewares/isAuth");
const testRouter = express.Router();

testRouter.get("/profile", isAuth, (req, res) => {
	return res.send(req.user);
});

testRouter.get("/user_already_exist", (req, res) => {
	return res.send("user already exist");
});

testRouter.get("/user_not_exist", (req, res) => {
	return res.send("user not exist");
});

testRouter.get("/registration_successfull", (req, res) => {
	return res.send("registration successfull");
});

testRouter.get("/something_wrong", (req, res) => {
	return res.send("something wrong");
});

module.exports = testRouter;
