const db = require("../model");
const multer = require("multer");

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
  const limitValue = req.query.limit || 8;
  const skipValue = req.query.offset || 1;
  try {
    await Product.find()
      .limit(limitValue)
      .skip(skipValue)
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

module.exports = { addProduct, getAllProducts, upload, deleteProduct };
