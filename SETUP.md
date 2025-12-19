# Movie Ticket Booking System - Setup Guide

## Quick Start Guide

### 1. Prerequisites Installation

#### Install Node.js
- Download and install Node.js from [nodejs.org](https://nodejs.org/)
- Verify installation: `node --version` and `npm --version`

#### Install MongoDB
**Option A: Local MongoDB**
- Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
- Follow installation instructions for your OS
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get connection string

### 2. Project Setup

#### Clone/Download Project
```bash
# If using Git
git clone <repository-url>
cd "MTB System"

# Or download and extract ZIP file
```

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux

# Edit .env file with your settings:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/movie-booking
# JWT_SECRET=your_very_long_and_secure_secret_key_here
# JWT_EXPIRE=7d
# NODE_ENV=development
```

#### Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 3. Database Setup

#### Seed Sample Data
```bash
# In backend directory
npm run seed
```

This creates:
- Sample movies (Avengers: Endgame, Spider-Man: No Way Home)
- Sample theatres (PVR Cinemas, INOX Multiplex)
- Sample shows with different timings
- Admin user (admin@moviebooking.com / admin123)

### 4. Running the Application

#### Start Backend Server
```bash
# In backend directory
npm run dev
```
Server will start on http://localhost:5000

#### Start Frontend Application
```bash
# In frontend directory (new terminal)
npm start
```
Application will open on http://localhost:3000

### 5. Testing the Application

#### Test User Registration
1. Go to http://localhost:3000
2. Click "Register" 
3. Create a new account
4. Login with your credentials

#### Test Admin Features
- Email: admin@moviebooking.com
- Password: admin123

#### Test Booking Flow
1. Browse movies on home page
2. Click on a movie
3. Select "Book Tickets"
4. Choose theatre and show time
5. Select seats
6. Complete payment (simulated)
7. View booking confirmation

### 6. Common Issues & Solutions

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
- Windows: Start MongoDB service from Services
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

#### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change port in backend/.env file or kill process using port 5000

#### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure backend server is running and CORS is configured (already done in code)

#### Module Not Found
```
Error: Cannot find module 'xyz'
```
**Solution**: Run `npm install` in the respective directory

### 7. Development Tips

#### Backend Development
- Use `npm run dev` for auto-restart on file changes
- Check API endpoints at http://localhost:5000/api/health
- Use MongoDB Compass for database visualization

#### Frontend Development
- React DevTools browser extension for debugging
- Use browser's Network tab to monitor API calls
- Check console for any JavaScript errors

### 8. Project Structure Overview

```
MTB System/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # State management
│   │   └── services/      # API calls
│   └── package.json
└── README.md
```

### 9. API Testing

#### Using Browser
- GET requests: Visit URLs directly
- Example: http://localhost:5000/api/movies

#### Using Postman/Thunder Client
- Import API collection (if available)
- Test all endpoints with sample data

### 10. Deployment Preparation

#### Environment Variables
- Never commit .env files
- Use different values for production
- Set strong JWT secrets

#### Database
- Use MongoDB Atlas for production
- Set up proper indexes
- Configure backup strategies

#### Security
- Enable HTTPS in production
- Set proper CORS origins
- Use environment-specific configurations

### 11. Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check running processes
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# MongoDB status
mongod --version              # Check MongoDB installation
mongo                        # Connect to MongoDB shell
```

### 12. Next Steps

After successful setup:
1. Explore the codebase
2. Customize movie data
3. Add new features
4. Deploy to cloud platforms
5. Add real payment integration

### Support

If you encounter issues:
1. Check this setup guide
2. Review error messages carefully
3. Ensure all prerequisites are installed
4. Verify environment variables
5. Check if all services are running

---

**Happy Coding! 🎬🍿**