const jwt = require("jsonwebtoken");
const db = require("../model");
const secret = process.env.SECRET;

const User = db.user;

const isAuthenticated = async (req, res, next) => {
  const userData = req.headers.authorization;
  if (!userData) {
    return res.status(400).send({ message: "AuthToken not found." });
  }
  try {
    const token = userData.split(" ")[1];
    if (token) {
      const userData = jwt.verify(token, secret);
      return await User.findById({
        _id: userData.id,
      })
        .then(async (response) => {
          if (response?.token === token) {
            req.userData = response;
            next();
          } else {
            return res
              .status(401)
              .send({ message: "Invalid or expired token" });
          }
        })
        .catch((error) => {
          return res.status(401).send({ message: "Invalid or expired token" });
        });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: error?.message });
    }
    return res.status(400).send({ message: error?.message });
  }
};

const restrictTo = (req, res, next) => {
  const userData = req.userData;
  if (userData.role === "1") {
    next();
  } else {
    return res
      .status(403)
      .send({ message: "You don't have permission to perform this action" });
  }
};

module.exports = { isAuthenticated, restrictTo };
