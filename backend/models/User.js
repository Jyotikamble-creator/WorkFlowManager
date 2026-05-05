
// Import mongoose for schema and model creation
const mongoose = require('mongoose');


// Define schema for users
const userSchema = new mongoose.Schema({
  name: String, // User's name
  email: String, // User's email (should be unique)
  password: String, // Hashed password
  role: String, // User's role (admin, manager, employee, etc.)
});


// Export User model (avoid recompiling in dev environments)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
