const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/belmond-tea-db';
    console.log(`Attempting database connection to: ${uri}`);
    
    // Set a short connection timeout so it fails quickly if Mongo is not running
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    isMongoConnected = true;
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.warn('WARNING: MongoDB is not running on localhost:27017.');
    console.warn('FALLBACK ACTIVATED: Server will run using the local JSON File Database.');
    isMongoConnected = false;
  }
};

const getMongoStatus = () => isMongoConnected;

module.exports = {
  connectDB,
  getMongoStatus
};
