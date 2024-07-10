const bcrypt = require("bcryptjs");
const db = require("../model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { GenerateRandomToken } = require("../utils/utils");
const sendEmail = require("../utils/sendEmail");

const User = db.user;
const Token = db.token;

const signup = async (req, res) => {
  const userData = req.body;
  if (
    !userData.username ||
    !userData.email ||
    !userData.password ||
    !userData.confirm_password
  ) {
    res.status(400).send({ message: "Please fill the all required fields" });
    return;
  } else if (req.body.password !== req.body.confirm_password) {
    res
      .status(400)
      .send({ message: "Confirm Password should be match with password" });
    return;
  }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role || "0",
  });
  try {
    await user.save();
    res.send({ message: "User was registered successfully!" });
    return;
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

const login = async (req, res) => {
  const userData = req.body;
  if (!userData.email || !userData.password) {
    res.status(400).send({ message: "Please fill the all required fields" });
    return;
  }
  await User.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (user) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res
            .status(401)
            .send({ message: "Invalid Password or email!" });
        }

        const token = jwt.sign({ id: user.id }, secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 3600, // 86400 24 hours
        });
        return await User.findByIdAndUpdate(
          user.id,
          {
            token,
          },
          { new: true }
        )
          .then((response) => {
            if (response) {
              return res.status(200).send({
                token: response?.token,
                user: {
                  id: response?._id,
                  email: response?.email,
                  role: response?.role,
                },
                message: "Login Successful",
              });
            }
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
      return res.status(404).send({ message: "User Not found." });
    })
    .catch((error) => {
      return res.status(500).send({ message: error });
    });
};

const logout = async (req, res) => {
  const userData = req.userData;
  console.log("__userData", userData);
  return await User.findByIdAndUpdate(
    userData.id,
    {
      token: "",
    },
    { new: true }
  )
    .then((response) => {
      if (response) {
        return res.status(200).send({
          message: "Logout Successful",
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error });
    });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: GenerateRandomToken(),
        }).save();
      }
      const link = `${process.env.BASE_URL}reset-password/${user._id}/${token.token}`;
      const emailBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Click the button below to reset your password. <b>This password reset is only valid for the next 24 hours.</b></p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <br />
          <p>If the button do not work follow the link to reset your password <a href="${link}">Click Here</a></p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thanks,</p>
          <p>Demo Test</p>
        </div>
      `;
      return await sendEmail(user.email, "Password reset", emailBody, res);
    }
    return res
      .status(400)
      .send({ message: "user with given email doesn't exist" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { userId, token: tokenParam } = req.params;
  const { password, confirm_password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).send({ message: "invalid link or expired" });

    const token = await Token.findOne({
      userId,
      token: tokenParam,
    });
    if (!token)
      return res.status(400).send({ message: "invalid link or expired" });
    if (password !== confirm_password) {
      return res
        .status(400)
        .send("Confirm Password should be match with password");
    }
    user.password = bcrypt.hashSync(password, 8);
    await user.save();
    await token.deleteOne();
    return res.status(200).send({ message: "password updated successfully" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  const userData = req.userData;
  const { current_password, new_password, confirm_password } = req.body;
  if (!current_password || !new_password || !confirm_password) {
    return res
      .status(400)
      .send({ message: "Please fill the all required fields" });
  }
  if (new_password !== confirm_password) {
    return res
      .status(400)
      .send({ message: "New Password Should be match with Confirm Password" });
  }
  if (userData.password) {
    var passwordIsValid = bcrypt.compareSync(
      current_password,
      userData.password
    );
    if (!passwordIsValid) {
      return res.status(400).send({
        message: "Invalid current password",
      });
    }
    const user = await User.findByIdAndUpdate(
      { _id: userData._id },
      {
        password: bcrypt.hashSync(new_password, 8),
      }
    );
    await user.save();
    return res.status(200).send({
      message: "Password changed successfully",
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
};
