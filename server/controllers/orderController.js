const Cart = require("../models/cart");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  const user = await User.findById(req.session.user.id);

  const cart = await Cart.findById(req.session.user.cart);
  if (cart.products.length === 0) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }
  const product = await Product.findOne({ _id: cart.products[0].product });
  let orderItems = [];
  let bigOrderItems = [];
  let orderTotal = 0;

  cart.products.forEach((product) => {
    orderItems.push({
      product: product.product,
      quantity: product.quantity,
      price: product.price,
    });
    orderTotal += product.price;
  });

  const littleOrder = new OrderItem({
    orderItems: orderItems,
    orderItemStatus: "Awaiting Confirmation",
    paid: false,
  });
  await littleOrder.save();
  bigOrderItems.push(littleOrder);
  if (user.latestOrders.length === 0) {
    const order = new Order({
      orderNumber: new Date().getTime(),
      orderDate: new Date(),
      orderStatus: "Awaiting Confirmation",
      orderTotal: orderTotal,
      orderItems: bigOrderItems,
      user: cart.user,
      restaurant: product.restaurant,
    });
    await order.save();

    user.latestOrders.push(order._id);
    await user.save();
    const restaurant = await Restaurant.findById(product.restaurant);
    restaurant.orders.push(order._id);
    await restaurant.save();
  } else {
    const status = await Order.findById(user.latestOrders.at(-1)._id);
    if (status.orderStatus != "Done") {
      const order = await Order.findById(user.latestOrders[0]._id);
      order.orderItems.push(littleOrder);
      order.orderTotal += orderTotal;
      await order.save();
    } else {
      const order = new Order({
        orderNumber: new Date().getTime(),
        orderDate: new Date(),
        orderStatus: "Awaiting Confirmation",
        orderTotal: orderTotal,
        orderItems: bigOrderItems,
        user: cart.user,
        restaurant: product.restaurant,
      });
      await order.save();
      user.latestOrders.push(order._id);
      await user.save();
      const restaurant = await Restaurant.findById(product.restaurant);
      restaurant.orders.push(order._id);
      await restaurant.save();
    }
  }

  cart.products = [];
  cart.price = 0;
  await cart.save();

  res.status(200).json({ message: "Order created" });
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (req.body.orderStatus === "Done") {
    order.orderItems.forEach(async (orderItem) => {
      let nOrderItem = await OrderItem.findById(orderItem);
      nOrderItem.orderItemStatus = "Done";
      nOrderItem.paid = true;
      nOrderItem.save();
    });
  }

  order.orderStatus = req.body.orderStatus;
  await order.save();
  res.status(200).send(order);
};
exports.updateOrderItem = async (req, res) => {
  const orderItem = await OrderItem.findById(req.params.orderItemId);
  const order = await Order.findById(req.params.orderId);
  orderItem.orderItemStatus = req.body.orderItemStatus;
  orderItem.paid = req.body.paid;
  await orderItem.save();
  await order.save();

  res.status(200).send(order);
};

exports.UserGetOrders = async (req, res) => {
  const user = await User.findOne({ email: req.session.user.email });
  const orders = await Order.find({ user: user._id }).populate("orderItems");
  res.status(200).send(orders);
};
exports.RestaurantGetOrders = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId);
  const orders = await Order.find({ restaurant: restaurant._id }).populate(
    "orderItems"
  );
  res.status(200).send(orders);
};
