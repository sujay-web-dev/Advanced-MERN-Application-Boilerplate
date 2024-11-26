// server/controllers/authController.js
const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { validationResult } = require('express-validator');

// Register User
exports.register = async (req, res) => {
  // Validation
  // ...

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Generate Email Verification Token
    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    });
    await token.save();

    // Send Verification Email
    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, 'Verify Email', `Click here to verify: ${url}`);

    res.status(201).json({ message: 'User registered, please verify your email' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: 'Invalid link' });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: 'Invalid link' });

    user.isVerified = true;
    await user.save();
    await token.remove();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login User
exports.login = async (req, res) => {
  // Validation
  // ...

  const { email, password, token } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    if (!user.isVerified)
      return res.status(400).json({ message: 'Email not verified' });

    // Two-Factor Authentication
    if (user.twoFactorEnabled) {
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
      });
      if (!verified)
        return res.status(400).json({ message: 'Invalid 2FA token' });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token: jwtToken, user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Enable Two-Factor Authentication
exports.enable2FA = async (req, res) => {
  try {
    const { tempSecret } = req.body;

    const verified = speakeasy.totp.verify({
      secret: tempSecret,
      encoding: 'base32',
      token: req.body.token,
    });

    if (verified) {
      req.user.twoFactorEnabled = true;
      req.user.twoFactorSecret = tempSecret;
      await req.user.save();

      res.json({ message: 'Two-factor authentication enabled' });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Generate QR Code for 2FA
exports.generate2FA = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret();
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      res.json({ qrCode: data_url, secret: secret.base32 });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  // Validation
  // ...

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: 'User with given email does not exist' });

    const token = await Token.findOne({ userId: user._id });
    if (token) await token.remove();

    const resetToken = crypto.randomBytes(32).toString('hex');
    await new Token({
      userId: user._id,
      token: resetToken,
    }).save();

    const url = `${process.env.BASE_URL}/password-reset/${user._id}/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Click here to reset: ${url}`);

    res.json({ message: 'Password reset link sent to your email account' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  // Validation
  // ...

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: 'Invalid link' });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: 'Invalid link' });

    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    await token.remove();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
