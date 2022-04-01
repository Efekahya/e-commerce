const express = require("express");
const router = express.Router();
const controller = require("../controllers/restaurantController");
const { catchAsync } = require("../middlewares/catchAsync");
const { restaurantValidation } = require("../middlewares/validate");
const { canAddReviewToRestaurant, isLoggedIn, isOwner, isAdmin } = require("../middlewares/basicCheckers");

router
	.route("/")
	.get(catchAsync(controller.getAllRestaurants))
	.post(isLoggedIn, catchAsync(isAdmin), catchAsync(restaurantValidation), catchAsync(controller.addRestaurant))
	.put(isLoggedIn, catchAsync(isOwner), catchAsync(restaurantValidation), catchAsync(controller.updateRestaurant))
	.delete(isLoggedIn, catchAsync(isAdmin), catchAsync(controller.deleteRestaurant));
router.route("/:id").get(catchAsync(controller.getRestaurant));
router.post("/:restaurant/review", isLoggedIn, catchAsync(canAddReviewToRestaurant), catchAsync(controller.addReview));
	
module.exports = router;
