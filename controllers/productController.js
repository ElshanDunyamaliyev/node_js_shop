const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  res.render("admin/products", {
    path: "/admin/products",
  });
};

exports.getMain = (req, res, next) => {
  res.render("shop/index", {
    path: "/products",
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  let product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    console.log(product);
    res.render("shop/product-list", {
      products: product,
      path: "/",
    });
  });
};

exports.getProductById = (req, res, next) => {
  Product.findById(req.params.productId, (product) => {
    res.render("shop/product-detail", {
      product,
      path: `/product/${product.id}`,
    });
  });
};
