# MongoDB Connection Fix

## Error: connect ETIMEDOUT
This means MongoDB is not accessible.

## Quick Solutions:

### Option 1: Use MongoDB Atlas (Cloud) - EASIEST
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Replace MONGODB_URI in backend/.env

### Option 2: Install MongoDB Locally
**Windows:**
```bash
# Download MongoDB Community Server
# https://www.mongodb.com/try/download/community
# Install and start MongoDB service
```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

### Option 3: Use Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Test Connection:
```bash
cd backend
npm run dev
```

If still failing, use the Atlas connection string provided in .env file.