# 🏠 Real Estate Web App

A modern full-stack real estate platform built with React, Node.js, MongoDB, and Firebase.

## Tech Stack
<p align="left">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,firebase,tailwind" />
</p>


## 🚀 Live Demo

🔗 Live Website: [Visit Here](https://real-estate-project-hazel-tau.vercel.app/)



## 📸 Screenshots
<img width="1920" height="867" alt="image" src="https://github.com/user-attachments/assets/97b322df-70b0-4307-bb27-ab970ae88856" />


## ✨ Features

- 🔐 User Authentication with Firebase
- 🚀 Google Sign-In
- 🏠 Create, Update & Delete Listings
- 🔍 Search & Filter Properties
- 📱 Responsive Design
- 🛡️ Secure Backend APIs
- 🖼️ Image Upload Support


## 🔒 Security Features

- JWT Authentication
- Protected Routes
- Secure API Handling
- User Authorization
- Rate Limiting
- Helmet Security Headers
- Input Validation & Sanitization
- CORS Protection

---

## ⚙️ Quick Setup (5 minutes)

### 1️⃣ Get Credentials
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [Firebase Console](https://console.firebase.google.com/) - Auth & Realtime DB
- Gmail App Password - Email notifications
- [ImageKit](https://imagekit.io/) - Image optimization (optional)

### 2️⃣ Install & Run

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Manual:**
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

### 3️⃣ Configure Environment Files

Update `.env` files with your credentials:
- `backend/.env` - Database, JWT, Email, Firebase, ImageKit
- `frontend/.env.local` - Firebase config, API URL

See [QUICK_START.md](./QUICK_START.md) for detailed credentials guide.

---

## 📂 Project Structure

```
real-estate-project/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API endpoints
│   │   ├── models/            # Mongoose schemas
│   │   ├── middleware/        # Custom middleware
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   ├── db/                # Database connection
│   │   └── app.js             # Express setup
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env.example           # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── redux/             # State management
│   │   ├── context/           # React context
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx            # Main app
│   │   └── main.jsx           # React entry
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example           # Environment template
│
├── QUICK_START.md             # 5-min setup guide
├── SETUP_GUIDE.md             # Detailed setup
└── README.md
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login with email/password
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/signout` - Logout

### Listings
- `GET /api/listing/get` - Get all listings (paginated, cached)
- `GET /api/listing/get/:id` - Get single listing (cached)
- `POST /api/listing/create` - Create listing ⚠️ Protected
- `POST /api/listing/update/:id` - Update listing ⚠️ Protected
- `DELETE /api/listing/delete/:id` - Delete listing ⚠️ Protected

### Users
- `GET /api/user/profile` - Get user profile ⚠️ Protected
- `PUT /api/user/update` - Update profile ⚠️ Protected
- `DELETE /api/user/delete` - Delete account ⚠️ Protected

---

## 🌍 Deployment

### Deploy Backend (Choose one)

**Heroku:**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Railway.app:**
```bash
railway login
railway init
railway up
```

**Render.com:**
- Connect GitHub repo
- Auto-deploy on push

### Deploy Frontend (Vercel)

```bash
npm i -g vercel
vercel --prod
```

Update `VITE_API_URL` in `frontend/.env.production`

---

## 🚧 Future Improvements

- 📍 Interactive maps with property locations
- 🔔 SMS & push notifications
- 🎯 Advanced filtering & recommendations
- 💬 Real-time messaging between buyers/sellers
- ⭐ Reviews & ratings system
- 📊 Analytics dashboard for sellers





