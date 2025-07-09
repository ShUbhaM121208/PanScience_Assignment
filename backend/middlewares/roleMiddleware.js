// middlewares/roleMiddleware.js

/**
 * Middleware to restrict access to users with specific roles.
 * Usage: roleMiddleware('admin'), roleMiddleware('admin', 'manager'), etc.
 */
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Forbidden: Requires role(s) [${allowedRoles.join(', ')}]` });
    }
    next();
  };
};

module.exports = roleMiddleware;
