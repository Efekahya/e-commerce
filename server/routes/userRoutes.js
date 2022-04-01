const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const { catchAsync } = require("../middlewares/catchAsync");
const { userValidation, contactValidation } = require("../middlewares/validate");
const {isLoggedIn, doesPersonalContactExist} = require("../middlewares/basicCheckers");

router.post("/login", userValidation, catchAsync(controller.login));
router.post("/register", userValidation, catchAsync(controller.register));
router.get("/logout", controller.logout);
router.post("/register/contact", isLoggedIn,
                                 doesPersonalContactExist,
                                 contactValidation,
                                 catchAsync(controller.registerContact));

router.put ("/register/contact", isLoggedIn , contactValidation, catchAsync(controller.updateContact));
router.get("/contact", isLoggedIn, catchAsync(controller.getContact));
router.get("/register/verify", controller.verify);

module.exports = router;
