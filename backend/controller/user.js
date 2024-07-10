const db = require("../model");
const User = db.user;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username email role");
    return res
      .status(200)
      .send({ data: users, message: "data fetch successfully" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const data = req.body;
  console.log("__data", data);
  return await User.findByIdAndUpdate(
    data._id,
    {
      username: data?.username,
      email: data?.email,
      role: data?.role,
    },
    { new: true }
  )
    .then((response) => {
      if (response) {
        return res.status(200).send({
          data: response.data,
          message: "User data updated successfully",
        });
      }
      return res.status(500).send({
        message: "Something wend wrong",
      });
    })
    .catch((error) => {
      return res.status(400).send({ message: error.message });
    });
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.deleteId,
    }).then((response) => {
      if (response?.deletedCount === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({ message: "User deleted successfully" });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || "Something went wrong" });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
