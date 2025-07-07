const { sendEmail } = require("../services/emailService");
const { SUCCESS_MESSAGE, FAILURE_MESSAGE } = require("../utils/constants");
const { validationResult } = require("express-validator");

const sendEmailController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { name, email, score, subject } = req.body;
  try {
    await sendEmail(
      { name, email, score, subject },
      process.env.EMAIL_USER,
      process.env.EMAIL_PASS
    );
    return res.status(200).json({ success: true, message: SUCCESS_MESSAGE });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false, message: FAILURE_MESSAGE });
  }
};

module.exports = { sendEmailController };
