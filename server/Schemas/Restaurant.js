const Joi = require("joi");

module.exports.restaurantSchema = Joi.object({
	reviews: Joi.array().items(Joi.string().min(0).max(35).required()),
	rating: Joi.number(),
	contactInfo: Joi.object(),
	owner: Joi.string(),
	orders: Joi.array().items(Joi.string().min(0).max(35).required()),
	products: Joi.array().items(Joi.string().min(0).max(35).required()),
	restaurantCategories: Joi.array().items(Joi.string().min(0).max(35).required()),
	paymentMethod: Joi.array().items(Joi.string().min(0).max(35).required()),
	deliveryTime: Joi.number(),
	images: Joi.array().items(Joi.string().min(0).max(35)),
});
