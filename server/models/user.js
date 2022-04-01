const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
	},
	password: String,

	contactInfo: {
		type: Schema.Types.ObjectId,
		ref: "Contact",
	},
	restaurantInfo: {
		type: Schema.Types.ObjectId,
		ref: "Restaurant",
	},
	restaurantReviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "RestaurantReview",
		},
	],
	productReviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "ProductReview",
		},
	],
	cart: {
		type: Schema.Types.ObjectId,
		ref: "Cart",
	},
	latestOrders: [
		{
			order: {
				type: Schema.Types.ObjectId,
				ref: "Order",
			},
			expiryDate: { type: Date, default: Date.now() + 1000 * 60 * 90 },
		},
	],

	orders: [
		{
			type: Schema.Types.ObjectId,
			ref: "Order",
		},
	],
	credientals: [
		{
			type: Schema.Types.ObjectId,
			ref: "Credientals",
		},
	],
	role: {
		type: String,
		enum: ["user", "restaurant", "admin"],
		default: "user",
	},
	validated: {
		type: Boolean,
		default: false,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	deletedAt: { type: Date, default: null },
});

module.exports = mongoose.model("User", userSchema);