const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const { catchAsync } = require("../middlewares/catchAsync");
const { isLoggedIn, isOwner, isAdmin } = require("../middlewares/basicCheckers");

router
	.route("/")
	.get(isLoggedIn, catchAsync(controller.currentCart))
	.post(isLoggedIn, catchAsync(controller.addProductsToCart))
	.put(isLoggedIn, catchAsync(controller.updateCart));
module.exports = router;
