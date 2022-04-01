const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
	review: Joi.string().min(25).max(150).required(),
	rating: Joi.number().required(),
	product: Joi.string().required(),
	user: Joi.string().required(),
});
