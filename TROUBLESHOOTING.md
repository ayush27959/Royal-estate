# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Database Connection Issues

#### Problem: "MongoDB connection failed" or "MongooseError: Cannot connect"

**Solutions:**
1. **Check Connection String**
   ```
   ✅ Format: mongodb+srv://username:password@cluster.mongodb.net/database_name
   ❌ Don't include: <password>, <username> (keep actual values)
   ```

2. **Add IP to MongoDB Atlas Whitelist**
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (development only)
   - Or add your specific IP

3. **Verify Credentials**
   - Check username and password are URL-encoded if they have special characters
   - Special chars in passwords need encoding:
     - `@` → `%40`
     - `#` → `%23`
     - etc.

4. **Test Connection String**
   ```bash
   # Use MongoDB Compass to test
   # Paste connection string directly
   ```

---

### 🔴 Port Already in Use

#### Problem: "Port 5000 already in use" or "Port 5173 already in use"

**Windows Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Same for port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Mac/Linux Solution:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Alternative: Change Port**
```bash
# Backend - Update PORT in .env
PORT=3000

# Frontend - Update in vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:5000' }
    }
  }
})
```

---

### 🔴 Firebase Authentication Issues

#### Problem: "Firebase is not initialized" or "Firebase config undefined"

**Check .env.local:**
```env
# ✅ CORRECT - All fields present
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789...
VITE_FIREBASE_APP_ID=1:123456:web:abc...

# ❌ WRONG - Missing values
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
```

**Solutions:**
1. Restart dev server after updating `.env.local`
2. Hard refresh browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
3. Clear browser cache: DevTools → Application → Clear Storage
4. Verify Firebase Console has Auth enabled:
   - Go to Firebase Console
   - Select your project
   - Go to "Authentication"
   - Enable "Email/Password"
   - Enable "Google"

#### Problem: "Google Sign-In not working"

**Solutions:**
1. Add localhost URLs to Firebase Authorized Domains:
   - Firebase Console → Authentication → Settings
   - Authorized Domains: Add `localhost`
   
2. Ensure Google OAuth is enabled:
   - Firebase Console → Authentication → Sign-in method
   - Enable "Google"
   - Select project support email

3. Configure OAuth Consent Screen:
   - Google Cloud Console → OAuth consent screen
   - Add test users with your email

---

### 🔴 CORS Errors

#### Problem: "Access to XMLHttpRequest blocked by CORS policy"

**Backend Solution:**
Check `backend/src/app.js`:
```javascript
const allowedOrigins = [
  "http://localhost:5173",  // ✅ Frontend URL
  "https://your-production-url.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

**Frontend Solution:**
Ensure `vite.config.js` has correct proxy:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // ✅ Backend URL
        secure: false,
      }
    }
  }
})
```

**Verify Request URL:**
- Open DevTools (F12)
- Go to Network tab
- Make a request
- Check if URL is: `http://localhost:5173/api/...` (proxied)
- NOT: `http://localhost:5000/api/...` (direct call, causes CORS)

---

### 🔴 Email Sending Issues

#### Problem: "Email not sending" or "Gmail authentication failed"

**Solutions:**

1. **Use Gmail App Password (NOT your Gmail password)**
   ```
   ❌ WRONG: EMAIL_PASSWORD=your_actual_gmail_password
   ✅ CORRECT: EMAIL_PASSWORD=xxxx xxxx xxxx xxxx (16 chars)
   ```

2. **Generate Gmail App Password:**
   - Enable 2FA: https://myaccount.google.com/security
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows/Mac/Linux"
   - Google generates a 16-character password
   - Copy to `EMAIL_PASSWORD`

3. **Allow Less Secure Apps (if not using 2FA):**
   - NOT RECOMMENDED for production
   - https://myaccount.google.com/lesssecureapps

4. **Test Email Configuration:**
   ```bash
   # Create test file: test-email.js
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASSWORD
     }
   });
   
   transporter.verify((error, success) => {
     if (error) {
       console.log('Email config error:', error);
     } else {
       console.log('Email config OK');
     }
   });
   
   # Run: node test-email.js
   ```

---

### 🔴 Image Upload Issues

#### Problem: "Image upload failed" or "ImageKit error"

**Solutions:**

1. **Verify ImageKit Credentials:**
   ```env
   # backend/.env
   ✅ Format:
   IMAGEKIT_PUBLIC_KEY=public_xxx
   IMAGEKIT_PRIVATE_KEY=private_yyy
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
   
   # NOT:
   ❌ IMAGEKIT_PRIVATE_KEY=my_secret_key (wrong format)
   ```

2. **Get Correct Credentials:**
   - Go to: https://dashboard.imagekit.io/developer/api-keys
   - Copy Public Key
   - Copy Private Key
   - Copy URL Endpoint

3. **Test Image Upload:**
   - Use Postman or cURL to test `/post` endpoint
   - Ensure file size < 10MB
   - Supported formats: JPG, PNG, GIF, WebP

4. **Backend Image Upload Endpoint:**
   ```bash
   POST http://localhost:5000/post
   Headers: Content-Type: multipart/form-data
   Body: 
     - file: <image file>
   ```

---

### 🔴 Redux State Management Issues

#### Problem: "Redux state not persisting" or "User logged out after refresh"

**Solutions:**

1. **Check Redux Persist:**
   ```javascript
   // frontend/src/redux/store.js
   import createWebStorage from "redux-persist/es/storage/createWebStorage";
   
   const storage = 
     typeof window !== "undefined"
       ? createWebStorage("local")
       : createNoopStorage();
   ```

2. **Clear Redux Persist Storage:**
   ```javascript
   // Browser DevTools Console
   localStorage.removeItem('persist:root');
   location.reload();
   ```

3. **Check Redux DevTools:**
   - Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/)
   - Open DevTools → Redux tab
   - Check if state is updating

---

### 🔴 Build & Compilation Issues

#### Problem: "npm install fails" or "dependency conflicts"

**Solutions:**

1. **Clear npm Cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and lock file:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Use npm ci (Continuous Integration):**
   ```bash
   npm ci
   ```

4. **Check Node Version:**
   ```bash
   node --version  # Should be v18+
   npm --version   # Should be v9+
   ```

#### Problem: "Vite build fails" or "Production build error"

**Solutions:**

1. **Check for TypeScript errors:**
   ```bash
   npm run build -- --debug
   ```

2. **Verify environment variables:**
   - Create `frontend/.env.production`
   - Include all `VITE_*` variables

3. **Check for console errors:**
   ```bash
   npm run build 2>&1 | grep -i error
   ```

---

### 🔴 API Request Issues

#### Problem: "404 Not Found" or "Cannot POST /api/..."

**Check Request Path:**
1. Open DevTools → Network tab
2. Look at failed request
3. Check URL format:
   ```
   ✅ CORRECT: /api/auth/signup
   ❌ WRONG: /auth/signup (missing /api)
   ❌ WRONG: http://localhost:5000/api/... (direct call, should use proxy)
   ```

**Verify Route Setup:**
```javascript
// backend/src/app.js
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.route.js";

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
```

---

### 🔴 Authentication Issues

#### Problem: "JWT token expired" or "Unauthorized 401"

**Solutions:**

1. **Check Token in Browser:**
   ```javascript
   // DevTools Console
   localStorage.getItem('persist:root')
   // Look for user token in the output
   ```

2. **JWT Secret Mismatch:**
   ```env
   # backend/.env - Must be same for signing and verifying
   JWT_SECRET=your_secret_key_min_32_chars
   ```

3. **Token Expiry:**
   ```javascript
   // If token expires too quickly, increase expiry:
   // backend/src/controllers/auth.controller.js
   jwt.sign(userPayload, process.env.JWT_SECRET, {
     expiresIn: '7d'  // Increase from default
   })
   ```

#### Problem: "Cookie not being set" or "credentials not passed"

**Check CORS Credentials:**
```javascript
// backend/src/app.js
app.use(cors({
  origin: allowedOrigins,
  credentials: true,  // ✅ Required for cookies
}));

// frontend - API calls must include credentials:
axios.defaults.withCredentials = true;
```

---

### 🔴 Responsive Design Issues

#### Problem: "Layout broken on mobile" or "CSS not loading"

**Solutions:**

1. **Check Tailwind CSS:**
   ```javascript
   // frontend/vite.config.js
   import tailwindcss from '@tailwindcss/vite';
   
   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

2. **Clear Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - DevTools → Application → Clear Storage

3. **Rebuild CSS:**
   ```bash
   cd frontend
   npm run dev  # Restart dev server
   ```

---

### 🔴 Performance Issues

#### Problem: "App is slow" or "API requests taking too long"

**Solutions:**

1. **Check Caching:**
   ```env
   # backend/.env
   CACHE_EXPIRY=3600  # Cache for 1 hour
   ```

2. **Enable Compression:**
   Already enabled in `backend/src/app.js`
   ```javascript
   app.use(compressionMiddleware);
   ```

3. **Check API Response:**
   - DevTools → Network tab
   - Look at response time
   - If > 3s, check database queries

4. **Optimize Database Queries:**
   - Add indexes to frequently queried fields
   - Use MongoDB indexes: `db.collection.createIndex({ field: 1 })`

---

## 📞 How to Debug

### Step 1: Check Logs
```bash
# Terminal 1 - Backend
cd backend && npm run dev
# Look for error messages

# Terminal 2 - Frontend
cd frontend && npm run dev
# Look for compilation errors
```

### Step 2: Browser DevTools
- **Console**: JavaScript errors
- **Network**: API request errors
- **Application**: LocalStorage, Redux state
- **Elements**: DOM issues

### Step 3: Backend Debugging
```bash
# Add console.log statements
console.log('Debug info:', variable);

# Or use Node debugger
node --inspect server.js
# Then open chrome://inspect
```

### Step 4: Environment Variables
```bash
# Verify .env files are in correct locations
backend/.env
frontend/.env.local

# Check if values are properly loaded
console.log(process.env.MONGO_URI);  // Backend
console.log(import.meta.env.VITE_API_URL);  // Frontend
```

---

## 🆘 Getting Help

1. **Check Existing Issues:** GitHub Issues tab
2. **Read Documentation:** SETUP_GUIDE.md, QUICK_START.md
3. **Search Stack Overflow:** Search error message
4. **Ask for Help:** Include:
   - Error message (full stack trace)
   - Steps to reproduce
   - What you've already tried
   - Environment details (OS, Node version, etc.)

---

**Still stuck?** Check the QUICK_START.md and SETUP_GUIDE.md for more detailed instructions.
