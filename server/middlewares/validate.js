const user = require("../Schemas/User");
const restaurant = require("../Schemas/Restaurant");
const contact = require("../Schemas/Contact");
const product = require("../Schemas/Product");

module.exports.userValidation = (req, res, next) => {
	const { error } = user.userSchema.validate(req.body);
	if (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
		});
		// throw new ExpressError(error.message, 400);
		return;
	}
	return next();

	//*res.locals.user = req.body;
};

module.exports.restaurantValidation = (req, res, next) => {
	const { error } = restaurant.restaurantSchema.validate(req.body);
	if (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
		});
		// throw new ExpressError(error.message, 400);
		return;
	}
	return next();

	//*res.locals.user = req.body;
};

module.exports.contactValidation = (req, res, next) => {
	const { error } = contact.contactSchema.validate(req.body);
	if (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
		});
		// throw new ExpressError(error.message, 400);
		return;
	}
	return next();

	//*res.locals.user = req.body;
};

module.exports.productValidation = (req, res, next) => {
	const { error } = product.productSchema.validate(req.body);
	if (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
		});
		// throw new ExpressError(error.message, 400);
		return;
	}
	return next();

	//*res.locals.user = req.body;
};
