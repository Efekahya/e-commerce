const Joi = require("joi");

const { userObject } = require("./User");

module.exports.credientalsSchema = Joi.object({
	cardName: Joi.string().min(0).max(35).required(),
	cardNumber: Joi.string().min(16).max(16).required(),
	cardHolderName: Joi.string().min(0).max(24).required(),
	expiryDate: Joi.string().min(5).max(5).required(),
	cvv: Joi.string().min(3).max(3).required(),
	user: Joi.string().required(),
	createdAt: { type: Joi.string().required(), default: Date.now },
	updatedAt: { type: Joi.string().required(), default: Date.now },
	deletedAt: { type: Joi.string().required(), default: null },
});
module.exports.credientalsObject = Joi.object({
	cardName: Joi.string().min(0).max(35).required(),
	cardNumber: Joi.string().min(16).max(16).required(),
	cardHolderName: Joi.string().min(0).max(24).required(),
	expiryDate: Joi.string().min(5).max(5).required(),
	cvv: Joi.string().min(3).max(3).required(),
	user: Joi.string().required(),
	createdAt: { type: Joi.string().required(), default: Date.now },
	updatedAt: { type: Joi.string().required(), default: Date.now },
	deletedAt: { type: Joi.string().required(), default: null },
});
