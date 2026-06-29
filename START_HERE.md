# 🚀 Real Estate App - Start Here!

## 📋 Your Setup Checklist

### Phase 1: Get Credentials (15 minutes)

#### 1. MongoDB Database
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Sign up / Login
- [ ] Create a free cluster
- [ ] Click "Connect" → "Drivers"
- [ ] Copy connection string
- [ ] In "Network Access", add your IP
- [ ] **Paste in:** `backend/.env` → `MONGO_URI=`

#### 2. Firebase Authentication
- [ ] Go to https://console.firebase.google.com/
- [ ] Create new project
- [ ] Go to "Authentication" tab
  - [ ] Enable "Email/Password"
  - [ ] Enable "Google Sign-in"
- [ ] Click gear icon → "Project Settings"
- [ ] Click "Web" app, copy config
- [ ] **Paste in:** `frontend/.env.local` → `VITE_FIREBASE_*` (all 6 values)

#### 3. Gmail App Password (for email notifications)
- [ ] Go to https://myaccount.google.com/security
- [ ] Enable "2-Step Verification"
- [ ] Go to https://myaccount.google.com/apppasswords
- [ ] Select "Mail" and "Windows/Mac/Linux"
- [ ] Google gives you password like: `xxxx xxxx xxxx xxxx`
- [ ] **Paste in:** `backend/.env` → `EMAIL_USER=` and `EMAIL_PASSWORD=`

#### 4. ImageKit (Optional - for image uploads)
- [ ] Go to https://imagekit.io/
- [ ] Sign up free
- [ ] Go to Dashboard → Settings → API keys
- [ ] Copy the 3 keys
- [ ] **Paste in:** `backend/.env` → `IMAGEKIT_*` fields

---

### Phase 2: Update Environment Files (5 minutes)

#### Backend Configuration
1. Open `backend/.env`
2. Fill in values from Phase 1:
   - `MONGO_URI` (from MongoDB)
   - `JWT_SECRET` (any random string 32+ chars)
   - `EMAIL_USER` and `EMAIL_PASSWORD` (from Gmail)
   - `FIREBASE_*` (from Firebase)
   - `IMAGEKIT_*` (from ImageKit - optional)

#### Frontend Configuration
1. Open `frontend/.env.local`
2. Fill in values from Phase 1:
   - `VITE_FIREBASE_*` (from Firebase - all 6 values)
   - `VITE_API_URL=http://localhost:5000` (leave as-is for local)
   - `VITE_IMAGEKIT_*` (optional)

**💡 Tip:** See `.env.example` files for what each variable means

---

### Phase 3: Start the Application (2 minutes)

#### Option A: Windows Users (Easiest)
```bash
# Double-click this file:
start-dev.bat
```

#### Option B: Mac/Linux Users
```bash
# Run these commands:
chmod +x start-dev.sh
./start-dev.sh
```

#### Option C: Manual Start (All Platforms)
```bash
# Terminal 1 - Start Backend
cd backend
npm install
npm run dev

# Terminal 2 - Start Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

### Phase 4: Verify It's Working (2 minutes)

1. **Open Browser:** http://localhost:5173
2. **Test:**
   - [ ] Homepage loads (shows listings)
   - [ ] Header is visible
   - [ ] Sign Up button works
   - [ ] Sign In button works
   - [ ] Google Sign-In button appears

**✅ If all checked - You're done!**

---

## 🐛 Something Not Working?

1. **Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
   - MongoDB connection issues
   - Port already in use
   - Firebase errors
   - CORS errors
   - And more...

2. **Review Logs:**
   - **Backend logs** - Check terminal running `npm run dev` (backend)
   - **Frontend logs** - Check browser Console (F12)

3. **Verify .env Files:**
   ```
   backend/.env - exists and filled
   frontend/.env.local - exists and filled
   ```

---

## 📚 Documentation

| Document | Read When |
|----------|-----------|
| **QUICK_START.md** | Want 5-min overview |
| **SETUP_GUIDE.md** | Need detailed instructions |
| **TROUBLESHOOTING.md** | Something isn't working |
| **GETTING_STARTED.md** | Want full checklist |

---

## 🎯 Common Issues (Quick Fixes)

### "Database connection failed"
```
✅ Solution: Add your IP to MongoDB Atlas Network Access
✅ Go to: MongoDB Atlas → Network Access → Add IP Address
```

### "Port 5000 already in use"
```bash
# Windows: Kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux: Kill the process
lsof -ti:5000 | xargs kill -9
```

### "Firebase not working"
```
✅ Solution: 
   1. Restart dev server (stop, then npm run dev)
   2. Hard refresh browser (Ctrl+Shift+R)
   3. Check .env.local has all 6 Firebase values
```

### "CORS error in browser console"
```
✅ Solution: This is normal during development
   Make sure frontend proxy is set to: http://localhost:5000
   Check: frontend/vite.config.js has correct proxy target
```

---

## ✨ Once It's Running

You'll be able to:

- ✅ Sign up with email/password
- ✅ Sign in with Google
- ✅ Create property listings
- ✅ Edit your listings
- ✅ Delete listings
- ✅ Search & filter properties
- ✅ View seller profiles
- ✅ Save favorites
- ✅ Upload property images

---

## 📞 Need More Help?

1. **Read**: [QUICK_START.md](./QUICK_START.md) - Quick overview
2. **Learn**: [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed steps
3. **Debug**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Fix issues
4. **Reference**: [GETTING_STARTED.md](./GETTING_STARTED.md) - Full checklist

---

## 🎉 You're Ready!

Your real estate web application is fully configured and ready to run.

**Next Step:** Complete the checklist above, then start the app.

Happy coding! 🚀
