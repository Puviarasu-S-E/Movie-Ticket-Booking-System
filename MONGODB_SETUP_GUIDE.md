# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes):

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/atlas
- Sign up for free account
- Create new project

### 2. Create Cluster
- Click "Build a Database"
- Choose "FREE" tier (M0 Sandbox)
- Select cloud provider and region
- Cluster name: `MovieBookingCluster`

### 3. Create Database User
- Username: `moviebooking`
- Password: `moviebooking123`
- Database User Privileges: Read and write to any database

### 4. Network Access
- Click "Network Access"
- Add IP Address: `0.0.0.0/0` (Allow access from anywhere)

### 5. Get Connection String
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy connection string
- Replace `<password>` with `moviebooking123`

### 6. Update Backend .env
```
MONGODB_URI=mongodb+srv://moviebooking:moviebooking123@moviebookingcluster.xxxxx.mongodb.net/cinebook?retryWrites=true&w=majority
```

Replace `xxxxx` with your actual cluster ID from Atlas.

## Alternative: Use Local MongoDB
If you prefer local setup:
```
MONGODB_URI=mongodb://localhost:27017/cinebook
```

Then install MongoDB locally and start the service.