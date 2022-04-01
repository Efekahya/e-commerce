const Joi = require('joi');


module.exports.orderSchema = Joi.object({
	orderNumber: Joi.string().min(0).max(35).required(),
	orderDate: Joi.string().min(0).max(35).required(),
	orderStatus: Joi.string().min(0).max(35).required(),
	orderTotal: Joi.number().required(),
	orderItems: Joi.array().items({
		product: Joi.object().required(),
		quantity: Joi.number().required(),
		price: Joi.number().required(),
	}),
	user: Joi.string().required(),
	restaurant: Joi.string().required(),
});

module.exports.orderObject = {
	orderNumber: Joi.string().min(0).max(35).required(),
	orderDate: Joi.string().min(0).max(35).required(),
	orderStatus: Joi.string().min(0).max(35).required(),
	orderTotal: Joi.number().required(),
	orderItems: Joi.array()
		.items(
			Joi.object({
				product: Joi.object().keys(productObject),
			})
		)
		.required(),
	user: Joi.string().required(),
	restaurant: Joi.string().required(),
};