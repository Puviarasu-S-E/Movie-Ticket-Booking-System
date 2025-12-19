# 🍃 MongoDB Setup Guide

## Quick Setup Options

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster (free tier)
4. Get connection string
5. Update backend/.env:
```
MONGODB_URI=your_atlas_connection_string_here
```

### Option 2: Local MongoDB
**Windows:**
```bash
# Run the installer
install-mongodb.bat

# Or manual install:
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

### Option 3: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Test Connection
```bash
cd backend
npm run seed
```

## 🎬 Movies Added (10 Total)

### Action/Adventure
- **Avengers: Endgame** (English, Hindi, Tamil) - 8.4⭐
- **RRR** (Telugu, Hindi, Tamil, Malayalam, English) - 8.8⭐
- **Baahubali 2** (Telugu, Tamil, Hindi, Malayalam) - 8.7⭐

### Horror/Thriller
- **The Conjuring 4** (English, Hindi) - 7.8⭐
- **Inception** (English, Hindi, Tamil) - 8.8⭐

### Comedy/Romance
- **Deadpool 3** (English, Hindi, Tamil) - 8.1⭐
- **La La Land** (English, Hindi) - 8.0⭐
- **The Grand Budapest Hotel** (English, Hindi) - 8.1⭐

### Drama/Biography
- **Dangal** (Hindi, English) - 8.4⭐
- **Zindagi Na Milegi Dobara** (Hindi, English) - 8.2⭐

## Features Added
✅ Multiple genres: Action, Horror, Romance, Comedy, Drama, Sci-Fi, Thriller
✅ Multiple languages: English, Hindi, Tamil, Telugu, Malayalam
✅ Different formats: 2D, 3D, IMAX
✅ Show timings across 3 days
✅ Realistic ratings and cast information
✅ High-quality movie posters and backdrops