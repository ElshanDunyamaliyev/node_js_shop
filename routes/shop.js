const express = require("express");
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/cart", cartController.getCart);

router.post("/cart", cartController.postCart);

router.get("/products", productController.getMain);

router.get("/products/:productId", productController.getProductById);

module.exports = router;
