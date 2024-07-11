const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nikunj.dolphinwebsolution@gmail.com",
        pass: "arry mkfk uhli qssr",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "nikunj.dolphinwebsolution@gmail.com",
      to: email,
      subject: subject,
      html: htmlContent,
    });
    return res
      .status(200)
      .send({ message: "password reset link sent to your email account" });
  } catch (error) {
    return res.status(400).send({ message: "something went wrong" });
  }
};

module.exports = sendEmail;
