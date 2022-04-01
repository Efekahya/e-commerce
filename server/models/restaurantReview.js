const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantReview = new Schema({
  review: String,
  service: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});



module.exports = mongoose.model("RestaurantReview", restaurantReview);