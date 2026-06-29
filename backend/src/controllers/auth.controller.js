import User from "../Model/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import sendEmail from "../utils/sendEmail.js";

// 🍪 Centralized Cookie Configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// 📧 Safe Email Notification Handler
const notifyAuthEmail = (user, action) => {
  const isSignup = action === "signup";
  const subject = isSignup ? "Welcome to RoyalEstate" : "Thanks for visiting RoyalEstate";

  const message = `Hi ${user.username || "there"},

${isSignup ? "Thank you for signing up with RoyalEstate." : "Thank you for visiting RoyalEstate again."}

We are happy to help you find your next perfect property.

Regards,
RoyalEstate Team`;

  // 🛠️ Crucial Fix: Trap background errors so SMTP issues can't crash your server execution context
  sendEmail(user.email, subject, message).catch((err) => {
    console.error(`Background worker failed to send ${action} email to ${user.email}:`, err.message);
  });
};

// 📝 SIGN UP
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: "/default_profile.png",
    });

    // Safely remove password fields from JSON response output
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    notifyAuthEmail(newUser, "signup");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// 🔑 SIGN IN
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: _, ...userWithoutPassword } = validUser.toObject();

    notifyAuthEmail(validUser, "signin");

    return res
      .status(200)
      .cookie("access_token", token, COOKIE_OPTIONS)
      .json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

// 🌐 GOOGLE AUTH
export const google = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      // Securely construct a temporary backup password string
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const uniqueUsername = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);

      user = new User({
        username: uniqueUsername,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await user.save();
      notifyAuthEmail(user, "signup");
    } else {
      notifyAuthEmail(user, "signin");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res
      .status(200)
      .cookie("access_token", token, COOKIE_OPTIONS)
      .json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

// 🚪 SIGN OUT
export const signOut = async (req, res, next) => {
  try {
    // Explicitly forward details to ensure accurate tracking drop constraints on all browsers
    const { maxAge, ...clearOptions } = COOKIE_OPTIONS;
    res.clearCookie("access_token", clearOptions);

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};