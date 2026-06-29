import express from "express";

import { verifyToken } from "../utils/verifyUser.js";

import {
  createlisting,
  getListing,
  getListings,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.js";

import { validateCreateListing } from "../middleware/validation.middleware.js";
import { getPaginationParams } from "../middleware/pagination.middleware.js";
import { cacheMiddleware, invalidateCache } from "../utils/cache.js";

const router = express.Router();

/* CREATE LISTING */
router.post(
  "/create",
  verifyToken,
  validateCreateListing,
  (req, res, next) => {
    // Invalidate cache after creating listing
    invalidateCache("/get");
    next();
  },
  createlisting,
);


router.get(
  "/get",
  getPaginationParams,
 cacheMiddleware(3600), // Cache for 1 hour
  getListings,
);


// router.get("/get", getListings);
/* GET SINGLE LISTING - with caching */
router.get(
  "/get/:id",
  cacheMiddleware(7200), // Cache for 2 hours
  getListing,
);

/* UPDATE LISTING */
router.post(
  "/update/:id",
  verifyToken,
  validateCreateListing,
  (req, res, next) => {
    // Invalidate cache after updating
    invalidateCache("/get");
    next();
  },
  updateListing,
);

/* DELETE LISTING */
router.delete(
  "/delete/:id",
  verifyToken,
  (req, res, next) => {
    // Invalidate cache after deleting
    invalidateCache("/get");
    next();
  },
  deleteListing,
);

export default router;
