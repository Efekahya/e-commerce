const Product = require("../models/product");
const Restaurant = require("../models/restaurant");
const ProductReview = require("../models/productReview");

exports.getAllProducts = async (req, res, next) => {
  const params = req.body.params;
  const products = await Product.find(params);

  if (!products) {
    return res.status(404).json({
      status: "error",
      message: "Products not found",
    });
  }

  res.status(200).json(products);
};

exports.addProduct = async (req, res, next) => {
  const bodyproducts = req.body.products;
  const restaurant = await Restaurant.findOne({ owner: req.session.user.id });

  bodyproducts.forEach(async (product) => {
    const newProduct = new Product(product);
    newProduct.restaurant = restaurant._id;
    restaurant.products.push({
      product: newProduct._id,
      price: newProduct.price,
    });
    await newProduct.save();
  });
  await restaurant.save();
  res.status(201).json({
    status: "success products added",
    data: bodyproducts,
  });
};

exports.getOneProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json(product);
};

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "product updated",
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  let restaurant = await Restaurant.findOne({ _id: product.restaurant });

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  restaurant.products = restaurant.products.filter((item) => {
    return item.product.toString() !== product._id.toString();
  });

  await restaurant.save();
  await product.remove();
  res.status(200).json({
    status: "success product deleted",
    data: {
      product,
    },
  });
};

exports.addReview = async (req, res, next) => {
  const product = await Product.findById(req.params.product);
  const user = await User.findById(req.session.user.id);
  if (!product) {
		return res.status(404).json({
			status: "fail",
			message: "Product not found",
		});
  }
  const review = new ProductReview({
		user: req.session.user.id,
		product: product._id,
		portion: req.body.portion,
		taste: req.body.taste,
		price: req.body.price,
		review: req.body.review,
  });
  await review.save();
  product.productReviews.push(review._id);
  user.productReviews.push(review._id);
  await product.save();
  await user.save();
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
};