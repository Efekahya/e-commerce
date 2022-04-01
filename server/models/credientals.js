const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const credientalsSchema = new Schema({
    cardName: String,
    cardNumber: String,
    cardHolderName: String,
    expiryDate: String,
    cvv: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },   
})


module.exports = mongoose.model("Credientals", credientalsSchema);