
// Middleware factory for role-based access control
// Usage: role('admin', 'manager') to allow only admin and manager roles
module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    // Get user's role from request (set by auth middleware)
    const userRole = req.user?.role;
    // Check if user's role is in the allowedRoles array
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden - insufficient role" });
    }
    // If allowed, proceed to next middleware/route
    next();
  };
};

// This middleware checks if the user's role is allowed to access the route