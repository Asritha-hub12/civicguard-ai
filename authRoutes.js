const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public Authentication Endpoints
router.post('/register', register);
router.post('/login', login);

// Protected Endpoints
router.get('/me', protect, getMe);

// Role-Based Authorization Test Endpoints
router.get('/test/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authorized: Welcome to City Administrator Command Center',
    user: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

router.get('/test/employee', protect, authorizeRoles('employee', 'admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authorized: Welcome to Municipal Field Personnel Portal',
    user: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

router.get('/test/citizen', protect, authorizeRoles('citizen', 'admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authorized: Welcome to Citizen Grievance Portal',
    user: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
    },
  });
});

module.exports = router;
