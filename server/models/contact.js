const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    
    name: String,
    countrycode: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    zip: Number,
    geolocation: {type: [[Number, Number]], default: [0, 0]}
});






module.exports = mongoose.model("Contact", contactSchema);
