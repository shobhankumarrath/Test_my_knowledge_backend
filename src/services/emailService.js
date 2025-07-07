const nodemailer = require("nodemailer");

const sendEmail = async (
  { name, email, score, subject },
  emailUser,
  emailPass
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOption = {
    from: `"Quiz App" <${emailUser}>`,
    to: email,
    subject: `Your Quiz Score, ${name}`,
    text: `Hello ${name}, your ${subject} quiz score is ${score}/100.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>Hello ${name},</h2>
        <p>Thank you for participating in the <strong>${subject.toUpperCase()}</strong> quiz.</p>
        <p><strong>Your Score:</strong> ${score}/100</p>
        <hr />
        <p>Want to improve? You can retake the quiz anytime!</p>
        <p style="color: gray;">This is an auto-generated email from Test My Knowledge Application. <br /> We do not save your data</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOption);
};

module.exports = { sendEmail };
