
// Import mongoose for MongoDB object modeling
const mongoose = require("mongoose");


// Async function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect using the MONGO_URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log error and exit process if connection fails
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

// Log the MongoDB URI being used (for debugging)
console.log("Using MONGO_URI:", process.env.MONGO_URI);


// Export the connectDB function to be used in server.js
module.exports = connectDB;