# 🚀 Quick Start Guide - Real Estate Web App

## ⚡ 5-Minute Quick Start

### Prerequisites
- ✅ Node.js v18+ installed
- ✅ MongoDB account (free tier on MongoDB Atlas)
- ✅ Firebase account 
- ✅ ImageKit account (optional, for image optimization)

---

## 📋 Step 1: Get Your Credentials (15 mins)

### 1️⃣ MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Drivers" 
5. Copy connection string and update `backend/.env`
   ```
   MONGO_URI=mongodb+srv://username:password@cluster...
   ```
6. **⚠️ Important:** Add your IP to whitelist in "Network Access"

### 2️⃣ Firebase Setup
1. Go to https://console.firebase.google.com
2. Create new project
3. Go to "Authentication" tab
   - Enable "Email/Password"
   - Enable "Google" sign-in
4. Go to "Project Settings" (gear icon)
5. Select "Web" app, copy config
6. Update `frontend/.env.local`:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=760...
   VITE_FIREBASE_APP_ID=1:760:web:3c0...
   ```

### 3️⃣ Gmail App Password (for emails)
1. Enable 2FA: https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows/Mac/Linux"
4. Google will generate a password like: `xxxx xxxx xxxx xxxx`
5. Update `backend/.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### 4️⃣ ImageKit (Optional - for image uploads)
1. Sign up at https://imagekit.io
2. Get API credentials from Dashboard
3. Update `backend/.env`:
   ```
   IMAGEKIT_PUBLIC_KEY=xxx
   IMAGEKIT_PRIVATE_KEY=yyy
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
   ```

---

## 💻 Step 2: Install & Run (2 mins)

### Windows Users
```bash
# Double-click start-dev.bat
start-dev.bat
```

### Mac/Linux Users
```bash
# Make script executable
chmod +x start-dev.sh

# Run it
./start-dev.sh
```

### Manual Installation
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## ✅ Verify It's Working

1. **Open** http://localhost:5173 in your browser
2. **Test** these features:
   - ✅ Homepage loads
   - ✅ Sign Up with email
   - ✅ Sign In
   - ✅ Google Sign-in button visible
   - ✅ Create Listing (if logged in)
   - ✅ Search properties

---

## 🔧 Environment Files Quick Reference

### backend/.env
```env
# Required
MONGO_URI=mongodb+srv://...
PORT=5000
JWT_SECRET=your_secret_key_min_32_chars

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# Firebase
FIREBASE_API_KEY=AIza...
FIREBASE_AUTH_DOMAIN=...firebaseapp.com
FIREBASE_PROJECT_ID=...

# ImageKit (Optional)
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/...

# Defaults
FRONTEND_URL=http://localhost:5173
CACHE_EXPIRY=3600
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### frontend/.env.local
```env
# Firebase (must match backend)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=...firebaseapp.com
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=....appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=1:...:web:...

# Backend
VITE_API_URL=http://localhost:5000

# ImageKit (Optional)
VITE_IMAGEKIT_PUBLIC_KEY=...
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/...
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "MongoDB connection failed" | ✅ Check connection string in .env<br>✅ Add your IP to MongoDB Atlas whitelist<br>✅ Ensure MongoDB_URI is correct |
| "Port 5000 already in use" | Kill process: `netstat -ano \| findstr :5000` then `taskkill /PID <PID> /F` |
| "Firebase not working" | ✅ Verify VITE_FIREBASE_* in frontend/.env.local<br>✅ Check credentials in Firebase Console |
| "Email not sending" | ✅ Enable 2FA on Gmail<br>✅ Use App Password (not regular password)<br>✅ Check EMAIL_USER and EMAIL_PASSWORD |
| "CORS error" | ✅ Ensure frontend/.env.local has correct `VITE_API_URL`<br>✅ Backend CORS is configured for `http://localhost:5173` |

---

## 📚 Available Commands

### Backend
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🌐 API Endpoints

### Auth
- `POST /api/auth/signup` - Register
- `POST /api/auth/signin` - Login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/signout` - Logout

### Listings
- `GET /api/listing/get` - Get all listings (paginated)
- `GET /api/listing/get/:id` - Get single listing
- `POST /api/listing/create` - Create listing (protected)
- `POST /api/listing/update/:id` - Update listing (protected)
- `DELETE /api/listing/delete/:id` - Delete listing (protected)

### Users
- `GET /api/user/profile` - Get profile (protected)
- `PUT /api/user/update` - Update profile (protected)
- `DELETE /api/user/delete` - Delete account (protected)

---

## 📱 Features Checklist

- ✅ User registration & login
- ✅ Google OAuth sign-in
- ✅ Create/Read/Update/Delete listings
- ✅ Search & filter properties
- ✅ Add to favorites
- ✅ User profiles
- ✅ Image upload & optimization
- ✅ Email notifications
- ✅ Rate limiting & security
- ✅ Responsive design
- ✅ Redux state management
- ✅ Caching

---

## 🚀 Next Steps

1. **Test locally** - Verify all features work
2. **Customize** - Update branding, colors, copy
3. **Deploy Backend** - Use Heroku, Railway, or Render
4. **Deploy Frontend** - Use Vercel or Netlify
5. **Update Production URLs** - Point frontend to deployed backend

---

## 📞 Need Help?

1. Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. Review browser console (F12) for errors
3. Check backend terminal for API errors
4. Verify all .env variables are filled correctly
5. Ensure MongoDB Atlas IP whitelist includes your machine

---

**Happy coding!** 🎉
