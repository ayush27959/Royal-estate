import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.route.js";
import buildingRouter from "./routes/building.route.js";

import uploadFile from "./services/storage.service.js";
import {
  errorHandlerMiddleware,
  notFoundHandler,
} from "./middleware/errorHandler.middleware.js";
import {
  compressionMiddleware,
  setCacheHeaders,
  etagMiddleware,
} from "./middleware/compression.middleware.js";
import { getPaginationParams } from "./middleware/pagination.middleware.js";
import { cacheMiddleware } from "./utils/cache.js";

const app = express();

// 1. 🔒 Security Headers (MUST BE FIRST)
app.use(helmet()); 

// 2. 🌐 CORS Configurations (MUST RUN BEFORE RATE LIMITERS & ROUTERS)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // Fixed: Added port 5174
  "https://real-estate-project-hazel-tau.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// 3. 📦 Compression Middleware
app.use(compressionMiddleware);

// 4. 🚦 Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: "Too many uploads, please try again later",
});

app.use(limiter);

// 5. 💾 Cache Headers & ETags
app.use(etagMiddleware);
app.use(setCacheHeaders(3600)); 

// 6. 🔌 Body Parsers & Parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

const upload = multer({
  storage: multer.memoryStorage(),
});

// IMAGE UPLOAD ROUTE
app.post(
  "/post",
  uploadLimiter,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const result = await uploadFile(req.file.buffer);

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        imageUrl: result.url,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

// 7. 🛫 Application Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/building", buildingRouter);

// 8. 🛑 Error Catching Fallbacks (MUST BE AT THE VERY BOTTOM)
app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

export default app;