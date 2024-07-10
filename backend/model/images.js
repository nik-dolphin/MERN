const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  contentType: String,
  data: Buffer,
  fileName: String,
});

module.exports = mongoose.model("Images", imageSchema);
