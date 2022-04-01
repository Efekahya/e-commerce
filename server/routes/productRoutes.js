const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const { catchAsync } = require("../middlewares/catchAsync");
const { productValidation } = require("../middlewares/validate");
const { canAddReviewToProduct, isLoggedIn, isOwner, isAdmin } = require("../middlewares/basicCheckers");

router.route("/").get(catchAsync(controller.getAllProducts)).post(isLoggedIn, isOwner, catchAsync(controller.addProduct));
router
	.route("/:id")
	.get(isLoggedIn, catchAsync(controller.getOneProduct))
	.put(isLoggedIn, catchAsync(controller.updateProduct))
	.delete(isLoggedIn, catchAsync(controller.deleteProduct));
router.post("/:product/review", isLoggedIn, catchAsync(canAddReviewToProduct), catchAsync(controller.addReview));
module.exports = router;
