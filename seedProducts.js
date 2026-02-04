const mongoose = require("mongoose");
const Product = require("./models/Products");

mongoose.connect("mongodb://127.0.0.1:27017/askartDB");

const products = [
  {
    name: "Wireless Headphones",
    price: 1999,
    category: "electronics",
    image: "images/electronics/wireless.jpg"
  },
  {
    name: "Smart Watch",
    price: 2999,
    category: "wearables",
    image: "images/wearables/watch.jpg"
  },
  {
    name: "Bluetooth Speaker",
    price: 1499,
    category: "electronics",
    image: "images/electronics/speaker.jpg"
  }
];

const seed = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Products inserted ✅");
  process.exit();
};

seed();
