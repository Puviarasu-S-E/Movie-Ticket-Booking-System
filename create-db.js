const { MongoClient } = require('mongodb');

async function createDatabase() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('cinebook');
    
    // Create collections
    await db.createCollection('users');
    await db.createCollection('movies');
    await db.createCollection('theatres');
    await db.createCollection('shows');
    await db.createCollection('bookings');
    
    console.log('✅ Database "cinebook" created successfully!');
    console.log('✅ Collections created: users, movies, theatres, shows, bookings');
    
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await client.close();
  }
}

createDatabase();