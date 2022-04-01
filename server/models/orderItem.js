const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
	orderItems: [
		{
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: Number,
			price: Number,
		},
	],
	orderItemStatus: {
		type: String,
		enum: ["Awaiting Confirmation", "Confirmed", "Preparing", "Delivered", "Done", "Cancelled"],
		default: "Awaiting Confirmation",
	},
	paid: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
