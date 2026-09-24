const User = require('../models/User');
const { verifyToken } = require('../services/jwtService');

/**
 * Protect routes: verifies JWT token and attaches authenticated DB user to req.user
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Token missing from authorization header.',
        });
      }

      // Verify JWT signature
      const decoded = verifyToken(token);

      // Fetch user from DB (excluding password hash) to ensure account exists and role is current
      const user = await User.findById(decoded.id).select('-passwordHash');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User session invalid. Account no longer exists.',
        });
      }

      // Attach authoritative user object to request
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authorization token.',
        error: error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token',
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Access denied. No Bearer token provided in Authorization header.',
  });
};

/**
 * Role-based authorization middleware
 * SECURITY ENFORCEMENT: Checks the authoritative role from the database attached by `protect`
 * Never trusts any role header, cookie, or body parameter from the frontend.
 * @param  {...string} roles - Permitted roles (e.g., 'citizen', 'employee', 'admin')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Authentication required before role check.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' is not authorized to access this resource.`,
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
