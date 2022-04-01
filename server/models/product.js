const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Restaurant = require("./restaurant");
const user = require("./user");
const contact = require("./contact");



const productSchema = new Schema({
	name: String,
	price: Number,
	description: String,
	category: String,
	restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
	productReviews: [{ type: Schema.Types.ObjectId, ref: "ProductReview" }],
	images: [String],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	deletedAt: { type: Date, default: null },
});

productSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

productSchema.post("remove", async function (next) {
	let restaurant = await Restaurant.findOne({});
});



module.exports = mongoose.model("Product", productSchema);
