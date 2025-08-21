module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden - insufficient role" });
    }
    next(); //  Move inside the function
  };
};

// This middleware checks if the user's role is allowed to access the route