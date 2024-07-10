const db = require("../model");
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  await User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! email is already in use!" });
        return;
      }
      next();
    })
    .catch((error) => {
      res.status(500).send({ message: error });
      return;
    });
};

module.exports = { checkDuplicateUsernameOrEmail };
