const express = require("express");
const cartRouter = express.Router();

const cartController = require("../controllers/cart.controller");

cartRouter.get("/", cartController.getCart);
cartRouter.post("/add", cartController.addToCart);
cartRouter.patch("/remove", cartController.removeFromCart);
cartRouter.delete("/delete", cartController.deleteFromCart);

module.exports = cartRouter;
