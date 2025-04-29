const Product = require("../models/product");
const fs = require("fs");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      path: "/admin/products",
      products,
    });
  });
};

exports.getMain = (req, res, next) => {
  res.render("shop/index", {
    path: "/products",
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    editing: false,
    product: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  let product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      editing: true,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  Product.fetchAll((products) => {
    let foundedProductIndex = products.findIndex((prod) => prod.id == id);
    const newProduct = new Product(title, imageUrl, price, description);
    newProduct.id = id;
    products[foundedProductIndex] = newProduct;
    fs.writeFile(
      "products.json",
      JSON.stringify(products),
      "utf-8",
      (err) => {}
    );
  });
  res.redirect("/admin/products");
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

exports.getDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchAll((products) => {
    products = products.filter((product) => product.id !== productId);
    fs.writeFile(
      "products.json",
      JSON.stringify(products),
      "utf-8",
      (err) => {}
    );
    res.redirect("/");
  });
};
