const Joi = require("joi");

module.exports.userSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	contactInfo: Joi.string(),
	restaurantInfo: Joi.string(),
	restaurantReviews: Joi.array().items(Joi.string().min(0).max(35).required()),
	productReviews: Joi.array().items(Joi.string().min(0).max(35).required()),
	cart: Joi.array().items(Joi.string().min(0).max(35).required()),
	order: Joi.array().items(Joi.string().min(0).max(35).required()),
	credientals: Joi.array().items(Joi.string().min(0).max(35).required()),
});
