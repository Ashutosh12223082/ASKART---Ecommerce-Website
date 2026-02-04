const express = require("express");
const Product = require("../models/Products");
const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
