@echo off
echo 🎬 Starting CineBook with Local MongoDB...
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
echo 🌱 Seeding Database with Enhanced Movies...
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
echo 📦 Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo 🎨 Starting Frontend Application...
start "CineBook Frontend" cmd /k "cd /d %cd% && npm run dev"

echo.
echo ✅ CineBook is starting up!
echo 🌐 Backend: http://localhost:5000
echo 🎬 Frontend: http://localhost:5173
echo.
echo 🎭 Features Available:
echo - Enhanced Movie Details with Trailers
echo - Real Movie Posters and Backdrops
echo - Cast and Crew Information
echo - BookMyShow-like UI/UX
echo.
echo 🔐 Test Credentials:
echo Admin: admin@cinebook.com / admin123
echo.
echo Press any key to close this window...
pause > nul