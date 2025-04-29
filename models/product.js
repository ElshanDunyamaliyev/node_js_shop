const fs = require("fs");

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    const productData = JSON.stringify(this);
    fs.appendFile("output.txt", productData + "\n", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  static fetchAll(cb) {
    fs.readFile("output.txt", "utf-8", (err, data) => {
      if (err || !data.trim()) {
        cb([]);
      } else {
        const productLines = data.trim().split("\n");
        const products = productLines.map((line) => {
          const parsedProduct = JSON.parse(line);
          const product = new Product(
            parsedProduct.title,
            parsedProduct.imageUrl,
            parsedProduct.price,
            parsedProduct.description
          );
          product.id = parsedProduct.id;
          return product;
        });
        cb(products);
      }
    });
  }

  static findById(id, cb) {
    Product.fetchAll((products) => {
      let foundedProduct = products.filter((product) => product.id == id);
      cb(foundedProduct[0]);
    });
  }
};
