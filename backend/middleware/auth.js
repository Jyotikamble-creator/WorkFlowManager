
// Import jsonwebtoken for verifying JWT tokens
const jwt = require("jsonwebtoken");


// Authentication middleware to verify JWT token
const auth = async (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded user info to request object
    req.user = decoded;
    next(); // Proceed to next middleware/route
  } catch (err) {
    // If token is invalid, return 401
    return res.status(401).json({ message: "Invalid token" });
  }
};


// Export the authentication middleware
module.exports = auth;
// This middleware checks for a valid JWT token in the request headers.