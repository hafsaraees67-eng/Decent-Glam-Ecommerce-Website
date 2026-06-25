const express = require("express");
const router = express.Router();
const Product = require("../models/product");


router.get("/products/:category", async (req, res) => {
  try {
    console.log("CATEGORY FROM URL:", req.params.category);

    const all = await Product.find({});
    console.log("TOTAL PRODUCTS IN DB:", all.length);

    const products = await Product.find({ category: req.params.category });
    console.log("MATCHED PRODUCTS:", products.length);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
