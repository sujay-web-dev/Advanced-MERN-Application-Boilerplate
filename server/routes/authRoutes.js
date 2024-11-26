// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  generate2FA,
  enable2FA,
} = require('../controllers/authController');
const { body } = require('express-validator');
const auth = require('../middleware/auth');

// Register
router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  register
);

// Verify Email
router.get('/verify/:id/:token', verifyEmail);

// Login
router.post('/login', login);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:id/:token', resetPassword);

// Generate 2FA QR Code
router.get('/2fa/generate', auth, generate2FA);

// Enable 2FA
router.post('/2fa/enable', auth, enable2FA);

module.exports = router;
