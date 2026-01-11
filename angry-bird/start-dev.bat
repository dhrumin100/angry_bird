@echo off
echo Starting KAVAACH System...
echo --------------------------------
echo Starting Backend Server on Port 5000...
start "KAVAACH Backend" /D server npm run dev
echo.
echo Starting Frontend Application...
start "KAVAACH Frontend" npm run dev
echo.
echo --------------------------------
echo System is launching!
echo Admin Login: http://localhost:5173/admin/login
echo Credentials: admin@kavaach.in / password123
echo.
pause
