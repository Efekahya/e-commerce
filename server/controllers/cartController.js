const mongoose = require("mongoose");
const Product = require("../models/product");
const Cart = require("../models/cart");
const e = require("express");

exports.currentCart = async (req, res) => {
	const cart = await Cart.findById(req.session.user.cart);
	if (!cart) {
		return res.status(404).json({
			status: "fail",
			message: "Cart not found (this should never happen)",
		});
	}

	cart.products.forEach(async (item) => {
		const product = await Product.findById(item.product);
		item.price = Number(product.price) * Number(item.quantity);
	});

	await cart.save();

	res.status(200).json(cart);
};

//! BUGGED
exports.addProductsToCart = async (req, res) => {
	const cart = await Cart.findById(req.session.user.cart);
	if (!cart) {
		return res.status(404).json({
			status: "fail",
			message: "Cart not found (this should never happen)",
		});
	}

	const bodyproducts = req.body.products;
	for (const item of bodyproducts) {
		const product = await Product.findById(item.product);

		if (!product) {
			return res.status(404).json({
				status: "fail",
				message: "Product not found",
			});
		}

		let productExists = false;

		cart.products.forEach((cartProduct) => {
			if (cartProduct.product.toString() === item.product) {
				productExists = true;
			}
		});
		if (productExists) {
			cart.products.forEach(async (cartItem) => {
				if (cartItem.product.toString() === item.product) {
					cartItem.quantity += Number(item.quantity);
					cartItem.price = Number(product.price) * Number(cartItem.quantity);
				}
			});
		} else {
			cart.products.push({
				product: item.product,
				quantity: item.quantity,
				price: product.price * item.quantity,
			});
		}
	}
	await cart.save();
	if (cart.products) {
		res.status(200).json({
			status: "success product(s) added",
		});
	}
};

exports.updateCart = async (req, res) => {
	const cart = await Cart.findById(req.session.user.cart);
	if (!cart) {
		return res.status(404).json({
			status: "fail",
			message: "Cart not found (this should never happen)",
		});
	}
	cart.products = [];
	await cart.save();

	await this.addProductsToCart(req, res);
};
	