const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
  },
});

module.exports = mongoose.model("favorite", favoriteSchema);
