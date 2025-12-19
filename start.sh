#!/bin/bash

echo "🎬 Starting CineBook Application..."
echo

echo "📦 Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed!"
    exit 1
fi

echo
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed!"
    exit 1
fi

echo
echo "🌱 Seeding Database..."
cd ../backend
npm run seed
if [ $? -ne 0 ]; then
    echo "⚠️ Database seeding failed, but continuing..."
fi

echo
echo "🚀 Starting Backend Server..."
gnome-terminal --title="CineBook Backend" -- bash -c "cd $(pwd) && npm run dev; exec bash" 2>/dev/null || \
xterm -title "CineBook Backend" -e "cd $(pwd) && npm run dev; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm run dev"' 2>/dev/null &

echo
echo "⏳ Waiting for backend to start..."
sleep 5

echo
echo "🎨 Starting Frontend Application..."
cd ../frontend
gnome-terminal --title="CineBook Frontend" -- bash -c "cd $(pwd) && npm start; exec bash" 2>/dev/null || \
xterm -title "CineBook Frontend" -e "cd $(pwd) && npm start; bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm start"' 2>/dev/null &

echo
echo "✅ CineBook is starting up!"
echo "🌐 Backend: http://localhost:5000"
echo "🎬 Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop this script..."
sleep infinity