@echo off
echo 🍃 Installing MongoDB locally...
echo.

echo Downloading MongoDB Community Server...
powershell -Command "& {Invoke-WebRequest -Uri 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.4-signed.msi' -OutFile 'mongodb-installer.msi'}"

echo Installing MongoDB...
msiexec /i mongodb-installer.msi /quiet

echo Creating MongoDB data directory...
mkdir C:\data\db 2>nul

echo Starting MongoDB service...
net start MongoDB

echo ✅ MongoDB installation complete!
echo 🚀 You can now run: npm run seed
pause