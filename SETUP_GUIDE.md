# 🏠 Real Estate Web App - Setup Guide

Complete guide to get your real estate platform running locally and in production.

## 📋 Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v18+ recommended) - [Download](https://nodejs.org/)
- **MongoDB** account or local MongoDB - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Firebase** account - [Firebase Console](https://console.firebase.google.com/)
- **ImageKit** account for image optimization - [ImageKit](https://imagekit.io/)
- **Git** - [Download](https://git-scm.com/)

---

## 🔧 Step 1: Environment Configuration

### Backend Setup (.env)

1. Navigate to the `backend` folder
2. Update `backend/.env` with your credentials:

```env
# MongoDB Atlas Connection String
# Get from: MongoDB Atlas → Connect → Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development

# JWT Secret (Generate a random string)
JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters

# Firebase Configuration
# Get from: Firebase Console → Project Settings → Service Account
FIREBASE_API_KEY=AIza...
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id

# ImageKit (for image optimization)
# Get from: ImageKit Dashboard → Settings
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Email Configuration (Gmail SMTP)
# Generate App Password: https://myaccount.google.com/apppasswords
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# CORS & Frontend URL
FRONTEND_URL=http://localhost:5173
PRODUCTION_URL=https://your-production-url.vercel.app

# Cache & Rate Limiting
CACHE_EXPIRY=3600
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Setup (.env.local)

1. Navigate to the `frontend` folder
2. Update `frontend/.env.local`:

```env
# Firebase (same as backend)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456:web:abc123...

# Backend API
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000

# ImageKit
VITE_IMAGEKIT_PUBLIC_KEY=your_public_key
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

---

## 📦 Step 2: Install Dependencies

### Backend Installation

```bash
cd backend
npm install
```

### Frontend Installation

```bash
cd frontend
npm install
```

---

## 🚀 Step 3: Run Development Servers

### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
database connected
server started
```

Backend will run on: `http://localhost:5000`

### Terminal 2 - Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

Expected output will show the Vite dev server URL (typically `http://localhost:5173`)

---

## ✅ Step 4: Verify Everything Works

1. Open `http://localhost:5173` in your browser
2. Test features:
   - ✅ Homepage loads
   - ✅ Sign up / Sign in (email + password)
   - ✅ Google Sign-in
   - ✅ Create a new listing
   - ✅ Search/Filter properties
   - ✅ View seller profiles

---

## 🔑 Getting API Credentials

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a project and cluster (free tier available)
3. Get connection string: `Cluster → Connect → Drivers`
4. Add your IP to whitelist

### Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication: Email/Password + Google
4. Get credentials: Project Settings → Web App → Copy config
5. Enable Firestore Database (read/write rules for testing)

### ImageKit

1. Go to [ImageKit Dashboard](https://dashboard.imagekit.io/)
2. Create API credentials
3. Copy Public Key, Private Key, and URL Endpoint

### Gmail App Password

1. Enable 2FA on Gmail
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate app-specific password for "Mail" on "Windows/Mac/Linux"

---

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── controllers/        # Request handlers
│   ├── routes/             # API endpoints
│   ├── models/             # Mongoose schemas
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   └── db/                 # Database connection
├── server.js               # Entry point
└── package.json

frontend/
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── redux/              # State management
│   ├── context/            # React context
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main app
│   └── main.jsx            # React entry
├── package.json
└── vite.config.js
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/signout` - Logout

### Listings
- `GET /api/listing` - Get all listings
- `GET /api/listing/:id` - Get single listing
- `POST /api/listing/create` - Create listing (protected)
- `PUT /api/listing/update/:id` - Update listing (protected)
- `DELETE /api/listing/delete/:id` - Delete listing (protected)

### Users
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/update` - Update profile (protected)
- `DELETE /api/user/delete` - Delete account (protected)

---

## 🚀 Deployment

### Deploy Backend (Heroku/Railway/Render)

```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Update `VITE_API_URL` in frontend `.env.production` to point to deployed backend.

---

## 🐛 Troubleshooting

### "MongoDB connection failed"
- ✅ Check connection string in .env
- ✅ Verify IP whitelist in MongoDB Atlas
- ✅ Ensure MongoDB_URI credentials are correct

### "Firebase not initialized"
- ✅ Check VITE_FIREBASE_* variables in frontend
- ✅ Verify Firebase project exists
- ✅ Check authentication methods are enabled

### "ImageKit not working"
- ✅ Verify keys in backend .env
- ✅ Test upload endpoint: `POST /post`

### "Port already in use"
```bash
# Kill process on port 5000 (backend)
npx lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
npx lsof -ti:5173 | xargs kill -9
```

---

## 📞 Support

For issues:
1. Check terminal logs
2. Review browser console (F12)
3. Verify .env variables
4. Check GitHub issues

---

## ✨ Features Included

- ✅ User Authentication (Email + Google)
- ✅ JWT Token Management
- ✅ CRUD Operations for Listings
- ✅ Advanced Search & Filtering
- ✅ Image Upload & Optimization
- ✅ User Profiles & Favorites
- ✅ Email Notifications
- ✅ Rate Limiting & Security Headers
- ✅ Responsive Design (Tailwind CSS)
- ✅ Redux State Management
- ✅ Error Handling & Validation

---

Happy coding! 🎉
