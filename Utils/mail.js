const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: "smtp.gmail.com",
    auth: {
      user: "31carcity@gmail.com",
      pass: "5*)UBy!e(,tZysf5",
    },
  });
  const message = {
    from: "31carcity@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
