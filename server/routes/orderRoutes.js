const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const { catchAsync } = require("../middlewares/catchAsync");
const { isLoggedIn, isOwner, isAdmin } = require("../middlewares/basicCheckers");

router.route("/").get(isLoggedIn, controller.UserGetOrders).post(isLoggedIn, catchAsync(controller.createOrder));
router.route("/:orderId").put(isLoggedIn, catchAsync(controller.updateOrder)).post(isLoggedIn, catchAsync(controller.createLittleOrder));
router.route("/:restaurantId").get(isLoggedIn, catchAsync(controller.RestaurantGetOrders));
router.route("/:orderId/:orderItemId").put(isLoggedIn, catchAsync(controller.updateOrderItem));
module.exports = router;
