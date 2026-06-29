# 🎬 VISUAL QUICK START GUIDE

## What You Need to Do

```
┌─────────────────────────────────────────────────────────┐
│  STEP 1: GET CREDENTIALS (15 MINUTES)                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📦 MongoDB Atlas                                       │
│     → https://www.mongodb.com/cloud/atlas               │
│     → Create free cluster                               │
│     → Copy connection string                            │
│     ✓ Goes in: MONGO_URI                                │
│                                                          │
│  🔥 Firebase Console                                    │
│     → https://console.firebase.google.com/              │
│     → Create project                                    │
│     → Enable Email/Password & Google Auth              │
│     → Copy 6 config values                              │
│     ✓ Goes in: VITE_FIREBASE_* (all 6)                 │
│                                                          │
│  📧 Gmail App Password                                  │
│     → Enable 2FA: https://myaccount.google.com/security │
│     → Get password: https://myaccount.google.com/apppass │
│     → Copy 16-char password                             │
│     ✓ Goes in: EMAIL_PASSWORD                           │
│                                                          │
│  🖼️  ImageKit (OPTIONAL)                                │
│     → https://imagekit.io/                              │
│     → Copy API keys                                     │
│     ✓ Goes in: IMAGEKIT_* fields                       │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  STEP 2: UPDATE ENVIRONMENT FILES (5 MINUTES)           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  backend/.env                                           │
│  ├── MONGO_URI = (from MongoDB Atlas)                   │
│  ├── JWT_SECRET = (any random string, 32+ chars)       │
│  ├── EMAIL_USER = your-email@gmail.com                  │
│  ├── EMAIL_PASSWORD = xxxx xxxx xxxx xxxx               │
│  ├── FIREBASE_* = (from Firebase, 3 values)            │
│  ├── IMAGEKIT_* = (optional, 3 values)                 │
│  └── PORT = 5000                                        │
│                                                          │
│  frontend/.env.local                                    │
│  ├── VITE_FIREBASE_* = (from Firebase, 6 values)       │
│  ├── VITE_API_URL = http://localhost:5000              │
│  └── VITE_IMAGEKIT_* = (optional, 2 values)            │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  STEP 3: START APPLICATION (2 MINUTES)                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  WINDOWS USERS:                                         │
│  └─ Double-click: start-dev.bat                        │
│                                                          │
│  MAC/LINUX USERS:                                       │
│  └─ chmod +x start-dev.sh                              │
│  └─ ./start-dev.sh                                     │
│                                                          │
│  MANUAL:                                                │
│  Terminal 1:                                            │
│  └─ cd backend                                         │
│  └─ npm install                                        │
│  └─ npm run dev                                        │
│                                                          │
│  Terminal 2 (new window):                               │
│  └─ cd frontend                                        │
│  └─ npm install                                        │
│  └─ npm run dev                                        │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  STEP 4: VERIFY IT WORKS (2 MINUTES)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Open Browser: http://localhost:5173                    │
│                                                          │
│  Checklist:                                             │
│  ☐ Homepage loads                                       │
│  ☐ Sign Up button visible                               │
│  ☐ Sign In button visible                               │
│  ☐ Google Sign-In button shows                          │
│  ☐ No errors in browser console (F12)                  │
│                                                          │
│  ✅ ALL CHECKED = SUCCESS!                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## URLs After Running

```
┌──────────────────────────────────────┐
│ Frontend:  http://localhost:5173     │
│ Backend:   http://localhost:5000     │
│ API Base:  /api                      │
└──────────────────────────────────────┘
```

---

## File Locations

```
Your Project Folder
│
├── 📄 START_HERE.md              ← READ THIS FIRST!
├── 📄 QUICK_START.md             ← 5-min overview
├── 📄 SETUP_GUIDE.md             ← Detailed guide
├── 📄 TROUBLESHOOTING.md         ← Problem solving
├── 📄 INDEX.md                   ← Documentation index
│
├── 🚀 start-dev.bat              ← Windows: Double-click
├── 🚀 start-dev.sh               ← Mac/Linux: Run
│
├── 📁 backend/
│   ├── .env                      ← FILL THIS (from template)
│   ├── .env.example              ← Reference template
│   └── server.js
│
└── 📁 frontend/
    ├── .env.local                ← FILL THIS (from template)
    ├── .env.example              ← Reference template
    └── vite.config.js
```

---

## Estimated Timeline

```
Getting Credentials:  ████████░░  15 min
Filling .env files:   ██░░░░░░░░  5 min
Running app:          ██░░░░░░░░  2 min
Testing app:          ██░░░░░░░░  2 min
─────────────────────────────────────────
TOTAL:                ██████████  ~25 minutes
```

---

## Common Files to Check

```
Problem                  Check File/Location
──────────────────────── ─────────────────────────────
Database not connecting  backend/.env → MONGO_URI
Firebase auth failing    frontend/.env.local → VITE_FIREBASE_*
Port already in use      See TROUBLESHOOTING.md
API not responding       Check backend is running on 5000
Image upload broken      backend/.env → IMAGEKIT_*
Email not sending        backend/.env → EMAIL_USER/PASSWORD
CORS errors              frontend/vite.config.js → proxy
```

---

## Feature Checklist (After Setup)

```
Authentication:
☐ Email/Password Sign Up
☐ Email/Password Sign In
☐ Google Sign-In
☐ JWT Token Management

Property Listings:
☐ View all listings
☐ Create new listing
☐ Edit your listing
☐ Delete your listing
☐ Search & filter
☐ View listing details

User Features:
☐ User profile
☐ Update profile
☐ Add to favorites
☐ View favorites

Admin Features:
☐ Pagination
☐ Rate limiting
☐ Caching

Image Features:
☐ Upload images
☐ Optimize images
☐ Display in listings

Email Features:
☐ Send notifications
☐ Confirmation emails
```

---

## Support Resources

```
Question                           Where to Find Answer
─────────────────────────────────  ────────────────────────
How do I get MongoDB?             QUICK_START.md → Step 1
How do I get Firebase?            QUICK_START.md → Step 1
Why can't I connect?              TROUBLESHOOTING.md
Where do I put credentials?       START_HERE.md → Phase 2
Port 5000 already in use?         TROUBLESHOOTING.md
App won't start?                  Terminal error messages
Firebase not working?             TROUBLESHOOTING.md
Email not sending?                TROUBLESHOOTING.md
Image upload broken?              TROUBLESHOOTING.md
```

---

## 🎯 Ready? Let's Go!

```
┌─────────────────────────────────────┐
│  👉 NEXT: Open START_HERE.md       │
│                                     │
│  It has a simple checklist that    │
│  guides you through everything!    │
└─────────────────────────────────────┘
```

---

## Success Indicators

```
✅ App is working when you see:

[Backend]
$ npm run dev
✓ database connected
✓ server started

[Frontend]
$ npm run dev
✓ VITE v8.0.9
✓ Local: http://localhost:5173/

[Browser]
✓ Real Estate App loads
✓ No console errors (F12)
✓ Can see listings
✓ Sign up works
```

---

**Happy coding!** 🚀🏠

Go to [START_HERE.md](./START_HERE.md) now!
