const Joi = require("joi");

module.exports.cartSchema = Joi.object({
	product: Joi.array().items({
		product: Joi.object().required(),
		quantity: Joi.number().required(),
		price: Joi.number().required(),
	}),
	quantity: Joi.number().required(),
	price: Joi.number().required(),
	user: Joi.string().required(),
	createdAt: Joi.string().required(),
	updatedAt: Joi.string().required(),
	deletedAt: Joi.string().required(),
});
module.exports.cartObject = {
	product: Joi.array().items({
		product: Joi.object().required(),
		quantity: Joi.number().required(),
		price: Joi.number().required(),
	}),
	quantity: Joi.number().required(),
	price: Joi.number().required(),
	user: Joi.string().required(),
	createdAt: Joi.string().required(),
	updatedAt: Joi.string().required(),
	deletedAt: Joi.string().required(),
};
