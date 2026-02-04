const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
connectDB();

// static files
app.use(express.static(path.join(__dirname, "public")));

// test api
app.get("/api/test", (req, res) => {
  res.json({ message: "ASKART API running 🚀" });
});

// home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ASKART running at http://localhost:${PORT}`);
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/", orderRoutes);

