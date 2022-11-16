const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

// router
const productRoute = require("./routes/product.route");

app.get("/", (req, res) => {
  res.send("Get Router is working perfectly");
});
// posting to database
app.use("/product", productRoute);

module.exports = app;
