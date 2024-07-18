const db = require("../model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Product = db.product;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const deleteImage = async (filename) => {
  const correctedPath = filename.replace("/controller", "");
  const filePath = path.join(__dirname, "../uploads", correctedPath);
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        resolve(true);
      } else {
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  });
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const file = req.file;
    const obj = {
      product_sku: product.product_sku,
      product_title: product.product_title,
      product_Brand: product.product_Brand,
      purchase_price: product.purchase_price,
      retail_price: product.retail_price,
      category: product.category,
      quanitity: product.quanitity,
      description: product.description,
      imageFile: file || "",
    };
    await Product.create(obj)
      .then((response) => {
        res.send({ message: "Product added successfully!" });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message || error });
      });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const getAllProducts = async (req, res) => {
  const limitValue = req.query.limit || 10;
  const skipValue = req.query.offset * limitValue || 0;
  try {
    const totalCount = await Product.countDocuments();
    await Product.find()
      .limit(limitValue)
      .skip(skipValue - limitValue)
      .then((response) => {
        if (response) {
          const data = response.map((item) => {
            const imageUrl = item?.imageFile?.filename
              ? `${req.protocol}://${req.get("host")}/uploads/${
                  item?.imageFile?.filename
                }`
              : "";
            const obj = {
              id: item?._id,
              product_sku: item.product_sku,
              product_title: item.product_title,
              product_Brand: item.product_Brand,
              purchase_price: item.purchase_price,
              retail_price: item.retail_price,
              category: item.category,
              quanitity: item.quanitity,
              description: item.description,
              imageUrl: imageUrl,
            };
            return obj;
          });
          return res.status(200).send({
            data: data,
            totalCount: totalCount,
            message: "All Products Fetched successfully",
          });
        }
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  await Product.findById({
    _id: productId,
  })
    .then((response) => {
      if (response) {
        const imageUrl = response?.imageFile?.filename
          ? `${req.protocol}://${req.get("host")}/uploads/${
              response?.imageFile?.filename
            }`
          : "";
        const obj = {
          id: response?._id,
          product_sku: response.product_sku,
          product_title: response.product_title,
          product_Brand: response.product_Brand,
          purchase_price: response.purchase_price,
          retail_price: response.retail_price,
          category: response.category,
          quanitity: response.quanitity,
          description: response.description,
          imageUrl: imageUrl,
        };
        return res.status(200).send({
          data: obj,
          message: "Product Fetched successfully",
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error.message });
    });
};

const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    const file = req.file;
    const obj = {};
    if (product) {
      const properties = [
        "product_sku",
        "product_title",
        "product_Brand",
        "purchase_price",
        "retail_price",
        "category",
        "quantity",
        "description",
      ];
      if (file) {
        const imgArr = product.imagePreview.split("/");
        const isDelete = await deleteImage(imgArr[imgArr.length - 1]);
        if (!isDelete) {
          return res.status(500).send({ message: "Something went wrong" });
        }
        obj.imageFile = file || "";
      }
      properties.forEach((prop) => {
        if (product[prop]) {
          obj[prop] = product[prop];
        }
      });
    }
    await Product.findByIdAndUpdate(req.params.productId, obj, {
      new: true,
    }).then((response) => {
      console.log("__response", response);
      if (response) {
        return res
          .status(200)
          .send({ data: response, message: `Product ${response.product_sku} updated successfully` });
      } else {
        return res.status(404).send({ message: "Product not found" });
      }
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({
      _id: req.params.deleteId,
    }).then((response) => {
      if (response?.deletedCount === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      return res.status(200).send({ message: "Product deleted successfully" });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  upload,
  deleteProduct,
  getProduct,
  updateProduct,
};
