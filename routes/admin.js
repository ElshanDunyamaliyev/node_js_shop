const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);

router.get("/add-product", productController.getAddProduct);

router.post("/add-product", productController.postAddProduct);

router.get("/edit-product/:productId", productController.getEditProduct);

router.post("/edit-product", productController.postEditProduct);

router.get("/delete-product/:productId", productController.getDeleteProduct);

module.exports = router;
