const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

db.user = require("./auth");
db.token = require("./token");
db.product = require("./product");
db.favorite = require("./favorite");
db.cartData = require("./cartData");

module.exports = db;
