const express = require("express");
const {
  checkDuplicateUsernameOrEmail,
} = require("../middlewares/verifySignUp");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controller/authentication");
const { getAllUsers, deleteUser, updateUser } = require("../controller/user");
const {
  addProduct,
  getAllProducts,
  upload,
  deleteProduct,
} = require("../controller/product");
const {
  isAuthenticated,
  restrictTo,
} = require("../middlewares/isAuthenticated");

const router = express.Router();

//auth routes
router.post("/register", checkDuplicateUsernameOrEmail, signup);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:userId/:token", resetPassword);
router.post("/change-password", isAuthenticated, changePassword);

//user routes
router.get("/allUsers/:id", isAuthenticated, restrictTo, getAllUsers);
router.post("/updateUser/:id", isAuthenticated, restrictTo, updateUser);
router.delete(
  "/deleteUser/:id/:deleteId",
  isAuthenticated,
  restrictTo,
  deleteUser
);

//product routes
router.post(
  "/addProduct/:id",
  isAuthenticated,
  restrictTo,
  upload.single("imageFile"),
  addProduct
);
router.get("/getAllProducts", getAllProducts);
router.delete(
  "/deleteProduct/:id/:deleteId",
  isAuthenticated,
  restrictTo,
  deleteProduct
);

module.exports = router;
