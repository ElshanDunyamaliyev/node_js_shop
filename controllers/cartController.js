const Cart = require("../models/cart");

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const { productId, productPrice } = req.body;
  Cart.addProduct(productId, +productPrice);
  res.render("shop/cart", {
    path: "/cart",
  });
};
