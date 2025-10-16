const express = require("express");
const { signup, login, forgotPassword, resetPassword, verifyOtp } = require("../controllers/authController");
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);   // ✅ Now it’s defined
router.post("/verify-otp", verifyOtp);             // if implemented
router.post("/reset-password", resetPassword);  

module.exports = router;
