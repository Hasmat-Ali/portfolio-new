const { isAuthenticated } = require('../googleDrive');

const authMiddleware = (req, res, next) => {
  if (!isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: 'Google Drive not authenticated. Visit /auth/login to authenticate first.',
    });
  }
  next();
};

module.exports = authMiddleware;
