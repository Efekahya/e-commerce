const Joi = require('joi');


module.exports.productSchema = Joi.object({
	name: Joi.string().min(0).max(35).required(),
	price: Joi.number().required(),
	description: Joi.string().min(0).max(150).required(),
	category: Joi.string().min(0).max(35).required(),
});
module.exports.productObject = {
	name: Joi.string().min(0).max(35).required(),
	price: Joi.number().required(),
	description: Joi.string().min(0).max(150).required(),
	category: Joi.string().min(0).max(35).required(),
	images: [Joi.string().required()],
	restaurant: Joi.string(),
};