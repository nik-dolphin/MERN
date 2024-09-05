const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
var bodyParser = require("body-parser");
require("./config/config");
const PORT = process.env.PORT;
const routes = require("./routes/routes");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  res.set("Document-Policy", "js-profiling");
  next();
});
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
