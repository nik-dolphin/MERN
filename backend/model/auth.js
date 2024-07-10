const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("users", registerSchema);
