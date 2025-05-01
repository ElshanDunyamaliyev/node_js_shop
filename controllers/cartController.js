const Cart = require("../models/cart");
const Product = require("../models/product");
const fs = require("fs");

exports.getCart = (req, res, next) => {
  fs.readFile("cart.json", "utf-8", (err, data) => {
    const parsedData = JSON.parse(data);
    const { products, totalPrice } = parsedData;
    const productsId = products.map((product) => product.id);
    const cartInProducts = [];
    let length = 0;
    if (productsId.length == 0) {
      return res.render("shop/cart", {
        path: "/cart",
        products: [],
        totalPrice: 0,
      });
    }
    productsId.forEach((id) => {
      Product.findById(id, (prod) => {
        cartInProducts.push(prod);
        length++;
        if (length == productsId.length) {
          res.render("shop/cart", {
            path: "/cart",
            products: cartInProducts,
            totalPrice,
          });
        }
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId, productPrice } = req.body;
  Cart.addProduct(productId, +productPrice);
  res.redirect("/");
};
