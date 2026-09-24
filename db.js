const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose
 * Uses connection string from environment variables (MONGODB_URI)
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // In production/runtime, we report the error clearly.
    // If running in development without a live MongoDB, let the server stay alive for diagnostics
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
