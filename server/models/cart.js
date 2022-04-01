const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
	products: [
		{
			product: { type: Schema.Types.ObjectId, ref: "Product" },
			quantity: Number,
			price: Number,
		},
	],
	price: Number,

	user: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	deletedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Cart", cartSchema);
