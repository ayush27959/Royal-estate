import express from "express";
import multer from "multer";
import {
  test,
  updateUser,
  deleteUser,
  getUser,
  getUserListings,
  toggleFavoriteListing,
  getFavoriteListings,
  getPublicSeller,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { validateUpdateUser } from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, validateUpdateUser, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.post("/favorites/:listingId", verifyToken, toggleFavoriteListing);
router.get("/favorites", verifyToken, getFavoriteListings);
router.get("/seller/:id", getPublicSeller);
router.get("/:id", verifyToken, getUser);

export default router;
