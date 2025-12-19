const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Create database and collections if they don't exist
    const db = conn.connection.db;
    await db.createCollection('users');
    await db.createCollection('movies');
    await db.createCollection('theatres');
    await db.createCollection('shows');
    await db.createCollection('bookings');
    console.log('📁 Collections created/verified');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;