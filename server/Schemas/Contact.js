const Joi = require('joi');


module.exports.contactSchema = Joi.object({
	name: Joi.string().min(0).max(24).required(),
	countrycode: Joi.string().min(2).max(4).required(),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/)
		.required(),
	address: Joi.string().min(10).max(200).required(),
	city: Joi.string().required(),
	country: Joi.string().required(),
	zip: Joi.number().required(),
	user: Joi.string(),
	geolocation: Joi.array().items(Joi.number()),
});

module.exports.contactObject = {
	name: Joi.string().min(0).max(24).required(),
	countrycode: Joi.string().min(2).max(2).required(),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/)
		.required(),
	address: Joi.string().min(10).max(200).required(),
	city: Joi.string().required(),
	country: Joi.string().required(),
	zip: Joi.number().required(),
	user: Joi.string().required(),
	geolocation: Joi.array().items(Joi.number()).required(),
};