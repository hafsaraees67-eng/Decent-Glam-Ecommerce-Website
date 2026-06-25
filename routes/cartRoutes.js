const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

/* ADD TO CART */
router.post("/add-to-cart", async (req, res) => {
  if (!req.session.userId) return res.send("Please login first");

  let cart = await Cart.findOne({ userId: req.session.userId });
  if (!cart) cart = new Cart({ userId: req.session.userId, products: [] });

  const item = cart.products.find(
    p => p.productId.toString() === req.body.productId
  );

  if (item) item.quantity++;
  else cart.products.push({ productId: req.body.productId });

  await cart.save();
  res.send("Added to cart");
});

/* CART COUNT */
router.get("/cart-count", async (req, res) => {
  if (!req.session.userId) return res.json({ count: 0 });

  const cart = await Cart.findOne({ userId: req.session.userId });
  if (!cart) return res.json({ count: 0 });

  const count = cart.products.reduce((sum, p) => sum + p.quantity, 0);
  res.json({ count });
});

module.exports = router;
