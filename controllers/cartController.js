exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  console.log(req.body.productId);
  res.render("shop/cart", {
    path: "/cart",
  });
};
