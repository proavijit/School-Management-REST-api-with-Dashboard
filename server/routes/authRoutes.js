const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// Get user details (protected route)
router.get('/me', authMiddleware, authController.getUserDetails);

module.exports = router;
