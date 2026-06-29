import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createBuilding,
  deleteBuilding,
  updateBuilding,
  getBuilding,
  getBuildings,
  getFeaturedBuildings,
  addBuildingReview,
} from "../controllers/building.controller.js";
import { getPaginationParams } from "../middleware/pagination.middleware.js";
import { cacheMiddleware, invalidateCache } from "../utils/cache.js";

const router = express.Router();

// GET featured buildings (cached)
router.get(
  "/featured",
  cacheMiddleware(3600),
  getFeaturedBuildings
);

// CREATE building (protected)
router.post(
  "/create",
  verifyToken,
  (req, res, next) => {
    invalidateCache("/get");
    next();
  },
  createBuilding
);

// GET all buildings (paginated, cached)
router.get(
  "/get",
  getPaginationParams,
  cacheMiddleware(3600),
  getBuildings
);

// GET single building (cached)
router.get(
  "/get/:id",
  cacheMiddleware(7200),
  getBuilding
);

// UPDATE building (protected)
router.post(
  "/update/:id",
  verifyToken,
  (req, res, next) => {
    invalidateCache("/get");
    next();
  },
  updateBuilding
);

// DELETE building (protected)
router.delete(
  "/delete/:id",
  verifyToken,
  (req, res, next) => {
    invalidateCache("/get");
    next();
  },
  deleteBuilding
);

// ADD review to building (protected)
router.post(
  "/review/:id",
  verifyToken,
  addBuildingReview
);

export default router;
