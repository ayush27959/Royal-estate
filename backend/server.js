import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDb from './src/db/database.js';
import morgan from "morgan";

// 📊 Logger wrapper for development requests
app.use(morgan("dev"));

// 🗄️ Connect to MongoDB Atlas
connectDb();

// 🚀 Start the backend execution context
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});