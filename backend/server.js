// Import core dependencies
const express = require("express"); // Express framework for building APIs
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // Loads environment variables from .env file

// Load environment variables from .env file before anything else
dotenv.config({ path: './.env' });


// Import database connection function
const connectDB = require("./config/db");


// Initialize Express app
const app = express();


// Connect to MongoDB using the function from db.js
connectDB();


// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests


// API route handlers
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/users', require('./routes/users')); // User management routes
app.use('/api/tasks', require('./routes/tasks')); // Task management routes
app.use('/api/comments', require('./routes/comments')); // Comment routes


// Global Error Handler (catches errors from all routes/middleware)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace
    res.status(500).json({ message: "Something broke on the server!" });
});


// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
