const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Order model
const orderSchema = new mongoose.Schema({
  email: String,
  products: Array,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

// PLACE ORDER API (LOCALSTORAGE CART BASED)
router.post("/place-order", async (req, res) => {
  try {
    const { email, cart, totalAmount } = req.body;

    console.log("➡️ Order request from:", email);
    console.log("🛒 Cart received:", cart);

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const order = new Order({
      email,
      products: cart,
      totalAmount
    });

    await order.save();
    console.log("✅ Order saved in DB");

    res.status(200).json({ message: "Order placed successfully" });

  } catch (error) {
    console.error("❌ ORDER ERROR:", error);
    res.status(500).json({ message: "Order failed" });
  }
});

module.exports = router;
