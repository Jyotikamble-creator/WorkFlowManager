const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
console.log("Using MONGO_URI:", process.env.MONGO_URI);

module.exports = connectDB;
// Export the connectDB function to be used in server.js