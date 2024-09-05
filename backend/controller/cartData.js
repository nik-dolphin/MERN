const db = require("../model");

const CartData = db.cartData;

const addCartData = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CartData.find({
      userId: id,
    });
    if (data.length === 0) {
      const obj = {
        userId: id,
        cartProductList: [{ ...req.body, quantity: 1 }],
      };
      await CartData.create(obj)
        .then((response) => {
          res.send({ message: "Product added to the cart successfully!" });
        })
        .catch((error) => {
          res.status(400).send({ message: error.message || error });
        });
    } else {
      const existingProductIndex = data[0].cartProductList.findIndex(
        (item) => item.id === req.body.id
      );
      let updatedCartProductList;
      if (existingProductIndex !== -1) {
        data[0].cartProductList[existingProductIndex].quantity += 1;
        updatedCartProductList = data[0].cartProductList;
      } else {
        updatedCartProductList = [
          ...data[0].cartProductList,
          { ...req.body, quantity: 1 },
        ];
      }
      await CartData.findByIdAndUpdate(
        data[0]._id,
        { cartProductList: updatedCartProductList },
        { new: true }
      )
        .then((response) => {
          res.send({ message: "Product added to the cart successfully!" });
        })
        .catch((error) => {
          res.status(400).send({ message: error.message || error });
        });
    }
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

const getCartData = async (req, res) => {
  const { id } = req.params;
  try {
    await CartData.find({
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

const removeFromCartData = async (req, res) => {
  const { userId, deleteId } = req.params;
  try {
    const cart = await CartData.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    const updatedCartProductList = cart.cartProductList.filter(
      (product) => product.id !== deleteId
    );
    cart.cartProductList = updatedCartProductList;
    await cart.save();
    return res
      .status(200)
      .send({ message: "Product removed from the cart successfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

const emptyCart = async (req, res) => {
  try {
    await CartData.deleteOne({
      _id: req.params.deletId,
    }).then((response) => {
      if (response?.deletedCount === 0) {
        return res.status(404).send({ message: "Cart not found" });
      }
      return res.status(200).send({ message: "Cart empty successfully" });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

module.exports = {
  addCartData,
  getCartData,
  removeFromCartData,
  emptyCart,
};
