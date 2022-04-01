const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");
module.exports.isLoggedIn = (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.status(401).json({ message: "User not logged in" });
	}
};

module.exports.isLoggedInValidated = (req, res, next) => {
	if (req.session.user && req.session.user.validated) {
		next();
	} else {
		res.status(401).json({ message: "User not logged in or not validated" });
	}
};

module.exports.isOwner = async (req, res, next) => {
	//TODO: RIGHT NOW SYSTEM ASSUMES EVERY OWNER HAS 1 RESTAURANT. CHANGE IT

	const currentUser = await User.findOne({ email: req.session.user.email });
	const restaurant = await Restaurant.findOne({ owner: currentUser._id });

	if (!restaurant) {
		res.status(403).json({ message: "User doesn't have a restaurant" });
		return;
	}
	next();
};
module.exports.isAdmin = async (req, res, next) => {
	const currentUser = await User.findOne({ email: req.session.user.email });

	if (currentUser.role !== "admin") {
		res.status(403).json({ message: "This user is not an admin" });
		return;
	}
	next();
};

module.exports.doesPersonalContactExist = async (req, res, next) => {
	const currentUser = await User.findOne({ email: req.session.user.email });
	if (!currentUser.contactInfo) {
		next();
	} else {
		res.status(403).json({ message: "User already has a contact info" });
	}
};

module.exports.canAddReviewToRestaurant = async (req, res, next) => {
	//! UNTESTED
	// TODO: TEST THIS FUNCTION AND MAKE SURE IT WORKS

	const currentUser = await User.findOne({ email: req.session.user.email });

	for (let i = 0; i < currentUser.latestOrders.length; i++) {
		const orderId = currentUser.latestOrders[i];
		const order = await Order.findById(orderId);
		if (!order) {
			res.status(404).json({ message: "There are no orders" });
			return;
		}
		if (order.orderStatus != "Done") {
			res.status(403).json({ message: "Order hasn't been completed" });
			return;
		}

		for (let i = 0; i < order.orderItems.length; i++) {
			const orderItemId = order.orderItems[i];
			const orderItem = await OrderItem.findById(orderItemId);
			for (let i = 0; i < orderItem.orderItems.length; i++) {
				const productId = orderItem.orderItems[i];
				const product = await Product.findById(productId.product);

				if (product.restaurant.toString() !== req.params.restaurant) {
					res.status(403).json({
						message: "User hasn't bought any product from this restaurant within 1.5 hours",
					});
					return;
				}
			}
		}
	}
	next();
};
module.exports.canAddReviewToProduct = async (req, res, next) => {
	//! UNTESTED
	// TODO: TEST THIS FUNCTION AND MAKE SURE IT WORKS

	const currentUser = await User.findOne({ email: req.session.user.email });

	for (let i = 0; i < currentUser.latestOrders.length; i++) {
		const orderId = currentUser.latestOrders[i];
		const order = await Order.findById(orderId);
		if (!order) {
			res.status(404).json({ message: "There are no orders" });
			return;
		}
		if (order.orderStatus != "Done") {
			res.status(403).json({ message: "Order hasn't been completed" });
			return;
		}

		for (let i = 0; i < order.orderItems.length; i++) {
			const orderItemId = order.orderItems[i];
			const orderItem = await OrderItem.findById(orderItemId);
			for (let i = 0; i < orderItem.orderItems.length; i++) {
				const productId = orderItem.orderItems[i];
				const product = await Product.findById(productId.product);
				if (!product) {
					res.status(403).json({
						message: "User hasn't bought this product within 1.5 hours",
					});
					return;
				}
			}
		}
	}
	next();
};