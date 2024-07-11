const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

db.user = require("./auth");
db.token = require("./token");
db.product = require("./product");

module.exports = db;
