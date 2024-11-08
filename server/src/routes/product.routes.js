const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/product.controller");

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/add", productController.addProduct);
productRouter.post("/add/many", productController.addManyProducts);

module.exports = productRouter;
