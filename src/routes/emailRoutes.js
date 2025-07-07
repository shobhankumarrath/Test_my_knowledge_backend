const express = require("express");
const { sendEmailController } = require("../controllers/emailController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/send-email",
  [
    check("name").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
    check("score").isInt({ min: 0, max: 100 }),
    check("subject").not().isEmpty().trim().escape(),
  ],
  sendEmailController
);

module.exports = router;
