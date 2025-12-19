@echo off
echo 🎬 Starting CineBook Application...
echo.

echo 📦 Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed!
    pause
    exit /b 1
)

echo.
echo 📦 Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo 🌱 Seeding Database...
cd ..\backend
call npm run seed
if %errorlevel% neq 0 (
    echo ⚠️ Database seeding failed, but continuing...
)

echo.
echo 🚀 Starting Backend Server...
start "CineBook Backend" cmd /k "cd /d %cd% && npm run dev"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo 🎨 Starting Frontend Application...
cd ..\frontend
start "CineBook Frontend" cmd /k "cd /d %cd% && npm start"

echo.
echo ✅ CineBook is starting up!
echo 🌐 Backend: http://localhost:5000
echo 🎬 Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul