const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productReview = new Schema({
  review: String,
  taste: { type: Number, default: 0 },
  portion: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  review: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

module.exports = mongoose.model("ProductReview", productReview);
