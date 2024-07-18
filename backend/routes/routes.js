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
const {
  getAllUsers,
  deleteUser,
  updateUser,
  userDownload,
} = require("../controller/user");
const {
  addProduct,
  getAllProducts,
  upload,
  deleteProduct,
  getProduct,
  updateProduct,
} = require("../controller/product");
const {
  isAuthenticated,
  restrictTo,
} = require("../middlewares/isAuthenticated");
const { conditionalUpload } = require("../middlewares/conditionalUpload");

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
router.get("/download/:id", isAuthenticated, userDownload);

//product routes
router.post(
  "/addProduct/:id",
  isAuthenticated,
  restrictTo,
  upload.single("imageFile"),
  addProduct
);
router.post(
  "/updateProduct/:id/:productId",
  isAuthenticated,
  restrictTo,
  upload.single("imageFile"),
  updateProduct
);
router.get("/getProduct/:productId", getProduct);
router.get("/getAllProducts", getAllProducts);
router.delete(
  "/deleteProduct/:id/:deleteId",
  isAuthenticated,
  restrictTo,
  deleteProduct
);

module.exports = router;
