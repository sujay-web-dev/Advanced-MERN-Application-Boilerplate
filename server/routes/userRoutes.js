// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Dashboard
router.get('/dashboard', auth, getDashboard);

// Admin Only Route
router.get('/admin', auth, role(['admin']), (req, res) => {
  res.json({ message: 'Admin content' });
});

module.exports = router;
