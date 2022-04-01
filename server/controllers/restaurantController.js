const Restaurant = require("../models/restaurant");
const Contact = require("../models/contact");
const User = require("../models/user");
const RestaurantReview = require("../models/restaurantReview");
const user = require("../models/user");

exports.getAllRestaurants = async (req, res, next) => {
	const restaurants = await Restaurant.find(req.query);
	res.status(200).json({
		status: "success",
		results: restaurants.length,
		data: {
			restaurants,
		},
	});
};

exports.addRestaurant = async (req, res, next) => {
	const currentUser = await User.findOne({ email: req.session.user.email });
	if (currentUser.restaurantInfo) {
		res.status(400).json({
			status: "fail",
			message: "User already has a restaurant",
		});
		return;
	}
	let contact = new Contact(req.body.contactInfo);
	contact.user = currentUser._id;
	await contact.save();
	const newRestaurant = new Restaurant({ owner: currentUser._id, contactInfo: contact._id, images: req.body.images }); //TODO: Imageları bir şekilde ekle
	await newRestaurant.save();

	currentUser.restaurantInfo = newRestaurant._id;
	await currentUser.save();
	res.status(201).json({
		status: "success",
		data: {
			restaurant: newRestaurant,
		},
	});
};;

exports.updateRestaurant = async (req, res, next) => {
	const currentUser = await User.findOne({ email: req.session.user.email }).populate("restaurantInfo");
	const restaurant = await Restaurant.findById(currentUser.restaurantInfo._id);
	const contactInfo = await Contact.findByIdAndUpdate(restaurant.contactInfo._id, req.body.contactInfo);

	res.status(200).json({
		status: "success",
		data: {
			restaurant,
		},
	});
};

exports.deleteRestaurant = async (req, res, next) => {
	const currentUser = await User.findOne({ email: req.session.user.email });
	await Restaurant.deleteOne({ _id: currentUser.restaurantInfo._id });
	res.status(200).json({
		status: "Restaurant has been deleted",
	});
};

exports.addReview = async (req, res, next) => {
	// TODO: Şu anda adam sadece kendi restaurantına ekleme yapabiliyor orderi anlayınca fixlicem.
	const currentUser = await User.findById(req.session.user.id);
	console.log(currentUser);
	const restaurant = await Restaurant.findById(currentUser.restaurantInfo._id);
	const review = new RestaurantReview({
		user: currentUser._id,
		restaurant: restaurant._id,
		service: req.body.service,
		speed: req.body.speed,
		review: req.body.review,
	});
	await review.save();

	restaurant.reviews.push(review._id);
	currentUser.restaurantReviews.push(review._id);

	await restaurant.save();
	await currentUser.save();
	res.status(201).json({
		status: "success",
		data: {
			review,
		},
	});
};