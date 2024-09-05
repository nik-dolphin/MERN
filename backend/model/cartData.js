const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartDataSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  cartProductList: {
    type: Array,
  },
});

module.exports = mongoose.model("cartList", CartDataSchema);
