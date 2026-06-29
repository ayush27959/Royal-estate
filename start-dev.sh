#!/bin/bash

# Real Estate App - Quick Start Script for Linux/Mac

echo ""
echo "========================================"
echo "  Real Estate App - Quick Start"
echo "========================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install from https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js is installed: $(node --version)"
echo ""

# Check .env files
echo "Checking environment files..."
if [ ! -f "backend/.env" ]; then
    echo "[WARNING] backend/.env not found"
    echo "[INFO] Creating from example..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
    fi
    echo "[INFO] Please update backend/.env with your credentials"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "[WARNING] frontend/.env.local not found"
    echo "[INFO] Creating from example..."
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env.local
    fi
    echo "[INFO] Please update frontend/.env.local with your credentials"
fi

echo ""
echo "Installing dependencies..."
echo ""

# Install backend dependencies
cd backend
echo "[1/2] Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install backend dependencies"
    cd ..
    exit 1
fi
cd ..

# Install frontend dependencies
cd frontend
echo "[2/2] Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install frontend dependencies"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:5000"
echo ""
echo "Make sure you've updated .env files with your credentials!"
echo ""
