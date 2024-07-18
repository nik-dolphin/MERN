const ExcelJS = require("exceljs");
const db = require("../model");
const { downloadResource } = require("../utils/utils");
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

const userDownload = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "Index", key: "index", width: 10 },
      { header: "Username", key: "username", width: 10 },
      { header: "Email Address", key: "email", width: 40 },
      { header: "Role", key: "role", width: 10 },
    ];
    let counter = 1;
    const users = await User.find({}, "username email role");
    users.forEach((user) => {
      user.role = user.role === "1" ? "admin" : "user";
      user.index = counter;
      worksheet.addRow(user);
      counter++;
    });
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    worksheet.getColumn(1).eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    worksheet.getColumn(4).eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="users.xlsx"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser, userDownload };
