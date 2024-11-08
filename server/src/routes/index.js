const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./auth.routes");
const productRouter = require("./product.routes");
const cartRouter = require("./cart.routes");
const wishlistRouter = require("./wishlist.routes");
const isAuth = require("../middlewares/isAuth");
const testRouter = require("./test.routes");

apiRouter.use("/auth", authRouter);
apiRouter.use("/products", isAuth, productRouter);
apiRouter.use("/cart", isAuth, cartRouter);
apiRouter.use("/wishlist", isAuth, wishlistRouter);
apiRouter.use("/test", testRouter);

module.exports = apiRouter;
