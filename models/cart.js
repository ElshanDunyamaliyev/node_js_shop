const fs = require("fs");

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile("cart.json", "utf-8", (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && data) {
        try {
          cart = JSON.parse(data);
        } catch (e) {
          console.error("Failed to parse cart.json:", e);
        }
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      cart.totalPrice += +price;

      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          console.error("Failed to write cart.json:", err);
        }
      });
    });
  }
};
