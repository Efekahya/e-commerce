const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
	orderNumber: String,
	orderDate: { type: Date, default: Date.now },
	orderStatus: { type: String, enum: ["Awaiting Confirmation", "Active", "Done"], default: "Awaiting Confirmation" },
	orderTotal: Number,
	orderItems: [
		{
			type: Schema.Types.ObjectId,
			ref: "OrderItem",
		},
	],
	user: { type: Schema.Types.ObjectId, ref: "User" },
	restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	deletedAt: { type: Date, default: null },
});


module.exports = mongoose.model('Order', orderSchema);