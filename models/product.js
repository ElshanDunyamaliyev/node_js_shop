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
    Product.fetchAll((products) => {
      products.push(this);
      fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile("products.json", "utf-8", (err, data) => {
      if (err || !data.trim()) {
        cb([]);
      } else {
        cb(JSON.parse(data));
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
