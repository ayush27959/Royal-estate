import Building from "../Model/building.model.js";
import { errorHandler } from "../utils/error.js";

export const createBuilding = async (req, res, next) => {
  try {
    const building = await Building.create({
      ...req.body,
      userRef: req.user.id,
    });

    return res.status(201).json(building);
  } catch (error) {
    next(error);
  }
};

export const deleteBuilding = async (req, res, next) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      return next(errorHandler(404, "Building not found"));
    }

    if (req.user.id !== building.userRef.toString()) {
      return next(errorHandler(401, "You can only delete your own building"));
    }

    await Building.findByIdAndDelete(req.params.id);

    res.status(200).json("Building deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateBuilding = async (req, res, next) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      return next(errorHandler(404, "Building not found"));
    }

    if (req.user.id !== building.userRef.toString()) {
      return next(errorHandler(401, "You can only update your own building"));
    }

    const updatedBuilding = await Building.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBuilding);
  } catch (error) {
    next(error);
  }
};

export const getBuilding = async (req, res, next) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      return next(errorHandler(404, "Building not found"));
    }

    res.status(200).json(building);
  } catch (error) {
    next(error);
  }
};

export const getBuildings = async (req, res, next) => {
  try {
    const limit = Math.min(
      parseInt(req.query.limit) || req.pagination?.limit || 9,
      100
    );

    const page = parseInt(req.query.page) || req.pagination?.page || 1;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { description: { $regex: req.query.searchTerm, $options: "i" } },
        { city: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    if (req.query.constructionStatus) {
      query.constructionStatus = req.query.constructionStatus;
    }

    if (req.query.buildingType) {
      query.buildingType = req.query.buildingType;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
    }

    if (req.query.city) {
      query.city = { $regex: req.query.city, $options: "i" };
    }

    let sortBy = {};
    if (req.query.sort) {
      const sortOrder = req.query.order === "asc" ? 1 : -1;
      sortBy[req.query.sort] = sortOrder;
    } else {
      sortBy.createdAt = -1;
    }

    const total = await Building.countDocuments(query);
    const buildings = await Building.find(query)
      .sort(sortBy)
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      buildings,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedBuildings = async (req, res, next) => {
  try {
    const buildings = await Building.find({ featured: true, verified: true })
      .limit(6)
      .sort({ rating: -1 });

    res.status(200).json(buildings);
  } catch (error) {
    next(error);
  }
};

export const addBuildingReview = async (req, res, next) => {
  try {
    const { text, rating } = req.body;
    const building = await Building.findById(req.params.id);

    if (!building) {
      return next(errorHandler(404, "Building not found"));
    }

    const review = {
      userId: req.user.id,
      username: req.user.username,
      text,
      rating: parseInt(rating),
      createdAt: new Date(),
    };

    building.reviews.push(review);

    // Update average rating
    const avgRating =
      building.reviews.reduce((sum, r) => sum + r.rating, 0) /
      building.reviews.length;
    building.rating = Math.round(avgRating * 10) / 10;

    await building.save();

    res.status(201).json(building);
  } catch (error) {
    next(error);
  }
};
