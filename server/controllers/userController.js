const mongoose = require("mongoose");
const User = require("../models/user");
const Contact = require("../models/contact");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

//!                                             E-MAIL CONNECTION
//!_____________________________________________________________________________________________________
const nodemailer = require("nodemailer");
const contact = require("../models/contact");

const transporter = nodemailer.createTransport({
	port: 465, // true for 465, false for other ports
	host: "smtp.gmail.com",
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
	secure: true,
});

//!_____________________________________________________________________________________________________

exports.login = async (req, res) => {
	let user = await User.findOne({ email: req.body.email.toLowerCase() });
	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}
	if (user.validated === false) {
		res.status(401).json({ message: "User not verified" });
		return;
	}
	if (!bcrypt.compareSync(req.body.password, user.password)) {
		res.status(401).json({ message: "Wrong password" });
		return;
	}

	req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role,
    validated: user.validated,
    cart: user.cart,
  };
	

	res.status(200).json({ message: "Logged in", user: req.session.user });
};

exports.register = async (req, res) => {
	let code = uuidv4();
	let user = new User({email: req.body.email.toLowerCase(), password: req.body.password});
	user.password = bcrypt.hashSync(user.password, 10);
	req.session.validation = {
		email: user.email,
		validationCode: code,
	};

	await user.save((err, user) => {
		if (err) {
			res.status(500).json({ message: err.message });
			return;
		}
		let cart = new Cart({ user: user._id });
		cart.save((err, cart) => {
			if (err) {
				res.status(500).json({ message: err.message });
				return;
			}
		});
		user.cart = cart._id;
		user.save((err, user) => {
			if (err) {
				res.status(500).json({ message: err.message });
				return;
			}
		});
		const mailData = {
			from: process.env.MAIL_USERNAME, // sender address
			to: req.body.email, // list of receivers
			subject: "Please confirm your email", // Subject line
			text: "",
			html: `<b>Your confirmation code is ${code} </b><br>Please visit our <a href="http://localhost:3000/user/register/verify?code=${code}">verification page</a><br/>`,
		};

		transporter.sendMail(mailData, function (err, info) {
			if (err) console.log(err);
			else console.log(info.response);
		});
		res.status(200).json({ message: user.email + " has been registered" });

	});
};

exports.logout = async (req, res) => {
	req.session.destroy();
	res.status(200).json({ message: "Logged out" });
};

exports.verify = async (req, res) => {
	const { code } = req.query;
	
	let user = await User.findOne({ email: req.session.validation.email });

	if (req.session.validation.validationCode != code) {
		res.status(404).json({ message: "Wrong validation code" });
		return;
	}
	user.validated = true;
	await user.save();
	res.status(200).json({ message: "User has been verified" });
};

exports.registerContact = async (req, res) => {
	let contact = new Contact(req.body);
	let user = await User.findOne({ email:req.session.user.email});
	contact.user = user._id;
	user.contactInfo = contact._id;
	await contact.save()
	await user.save()
	res.status(200).json({ message: "Contact has been registered", contact: contact });
}
exports.getContact = async (req, res) => {
	let user = await User.findOne({ email: req.session.user.email }).populate("contactInfo");
	res.status(200).json({ message: "Contact has been found", contact: user.contactInfo });
}
exports.updateContact = async (req, res) => {
	let user = await User.findOne({ email: req.session.user.email });
	let contact = await Contact.findByIdAndUpdate(user.contactInfo, req.body);
	await contact.save()
	res.status(200).json({ message: "Contact has been updated", contact: contact });
}


// ! -------------------------------------------------------- ADMIN USER CONTROLLER -------------------------------------------------
