const { upload } = require("../controller/product");

const conditionalUpload = (req, res, next) => {
  upload.single("imageFile")(req, res, next);
  next();
};

module.exports = { conditionalUpload };
