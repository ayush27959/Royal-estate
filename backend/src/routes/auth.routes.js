import express from "express";
import {
  signin,
  signup,
  google,
  signOut,
} from "../controllers/auth.controller.js";
import {
  validateSignup,
  validateSignin,
} from "../middleware/validation.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
  skipSuccessfulRequests: true,
});

router.post("/signup", validateSignup, signup);
router.post("/signin", authLimiter, validateSignin, signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
