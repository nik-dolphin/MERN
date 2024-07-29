const db = require("../model");
const { getProductData } = require("../utils/utils");

const Product = db.product;
const Favorite = db.favorite;

const isFavorite = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const { isFavorite } = req.body;
    const data = await Favorite.find({
      userId: id,
      productId: productId,
    });
    if (isFavorite) {
      const obj = {
        userId: id,
        productId,
        isFavorite,
      };
      if (data.length) {
        if (data?._id) {
          return await Favorite.findByIdAndUpdate(
            {
              id: data?._id,
            },
            obj
          )
            .then((response) => {
              return res.status(200).send({ data: response?.data });
            })
            .catch((error) => {
              return res.status(400).send({
                message: `${error.message}` || "Something went wrong",
              });
            });
        } else {
          return res.status(400).send({ message: "Something went wrong" });
        }
      } else {
        const product = await Product.find({ id: productId });
        console.log("product", product);
        return await Favorite.create(obj)
          .then((response) => {
            res.send({
              message: "Product added to favorite list successfully!",
            });
          })
          .catch((error) => {
            res.status(400).send({ message: error.message || error });
          });
      }
    } else {
      if (data.length) {
        const result = await Favorite.deleteOne({
          userId: id,
          productId: productId,
        });
        if (result.deletedCount > 0) {
          return res.status(200).send({
            data: result?.data,
          });
        } else {
          return res.status(400).send({ message: "Something went wrong" });
        }
      }
    }
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong123" });
  }
};

const getFavoriteList = async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.find({
      userId: id,
    }).then((response) => {
      return res.status(200).send({
        data: response,
      });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

const getFavoriteProductList = async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.find({
      userId: id,
    }).then(async (response) => {
      const products = await Promise.all(
        response.map(async (item) => {
          const product = await Product.findById({
            _id: item?.productId,
          });
          const obj = getProductData(req, product);
          return {
            _id: item?._id,
            userId: item?.userId,
            isFavorite: item?.isFavorite,
            productData: obj,
          };
        })
      );
      return res.status(200).send({
        data: products,
      });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

module.exports = {
  isFavorite,
  getFavoriteList,
  getFavoriteProductList,
};
