@echo off
REM Real Estate App - Quick Start Script for Windows

echo.
echo ========================================
echo   Real Estate App - Quick Start
echo ========================================
echo.

REM Check if node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Check .env files
echo Checking environment files...
if not exist "backend\.env" (
    echo [WARNING] backend\.env not found. Creating template...
    copy "backend\.env.example" "backend\.env" 2>nul
    echo [INFO] Please update backend\.env with your credentials
)

if not exist "frontend\.env.local" (
    echo [WARNING] frontend\.env.local not found. Creating template...
    copy "frontend\.env.example" "frontend\.env.local" 2>nul
    echo [INFO] Please update frontend\.env.local with your credentials
)

echo.
echo Installing dependencies...
echo.

REM Install backend dependencies
cd backend
echo [1/2] Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

REM Install frontend dependencies
cd frontend
echo [2/2] Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:5000
echo.
echo Make sure you've updated .env files with your credentials!
echo.
pause
