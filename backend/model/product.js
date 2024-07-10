const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_sku: {
    type: String,
    required: true,
  },
  product_title: {
    type: String,
    required: true,
  },
  product_Brand: {
    type: String,
    required: true,
  },
  purchase_price: {
    type: String,
    required: true,
  },
  retail_price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quanitity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageFile: {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
