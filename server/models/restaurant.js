const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Product = require("./product");
const Contact = require("./contact");

const restaurantSchema = new Schema({
	reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
	rating: { type: Number, default: 0 },
	contactInfo: { type: Schema.Types.ObjectId, ref: "Contact" },
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	activeOrders: [
		{
			type: Schema.Types.ObjectId,
			ref: "Order",
		},
	],

	orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
	products: [
		{
			product: { type: Schema.Types.ObjectId, ref: "Product" },
			price: Number,
		},
	],
	restaurantCategories: [String],
	paymentMethod: [String],
	deliveryTime: { type: Number, default: 30 },
	images: [String],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

restaurantSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

restaurantSchema.pre("deleteOne", function (next) {
	const restaurantId = this.getQuery()["_id"];
	//* Delete all the reviews associated with this restaurant
	/*
	this.model("Reviews").deleteMany({ restaurant: restaurantId }, (err) => {
		if (err) {
			return next(err);
		}
	});

	this.model("Orders").deleteMany({ restaurant: restaurantId }, (err) => {
		if (err) {
			return next(err);
		}
	});*/

	Product.deleteMany({ restaurant: restaurantId }, (err) => {
		if (err) {
			return next(err);
		}
	});
	Contact.deleteMany({ user: restaurantId }, (err) => {
		if (err) {
			return next(err);
		}
	});

	User.updateOne({ restaurantInfo: restaurantId }, { $unset: { restaurantInfo: "" } }, (err) => {
		if (err) {
			return next(err);
		}
	});

	next();
});



module.exports = mongoose.model("Restaurant", restaurantSchema);



