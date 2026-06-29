import bcrypt from "bcryptjs";
import User from "../Model/user.Model.js";
import Listing from "../Model/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("Test route being called!!!");
};

export const updateUser = async (
  req,
  res,
  next
) => {
  if (
    req.user.id !==
    req.params.id
  ) {
    return next(
      errorHandler(
        401,
        "You can only update your own account!"
      )
    );
  }

  try {
    if (req.body.password) {
      req.body.password =
        bcrypt.hashSync(
          req.body.password,
          10
        );
    }

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username:
              req.body.username,

            email:
              req.body.email,

            password:
              req.body.password,

            avatar:
              req.body.avatar,
          },
        },
        { new: true }
      );

    const {
      password,
      ...rest
    } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req,
  res,
  next
) => {
  if (
    req.user.id !==
    req.params.id
  ) {
    return next(
      errorHandler(
        401,
        "You can only delete your own account!"
      )
    );
  }

  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.clearCookie(
      "access_token"
    );

    res.status(200).json(
      "User has been deleted..."
    );
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (
  req,
  res,
  next
) => {
  if (
    req.user.id !==
    req.params.id
  ) {
    return next(
      errorHandler(
        401,
        "You can only view your own listings!"
      )
    );
  }

  try {
    const listings =
      await Listing.find({
        userRef:
          req.params.id,
      });

    res.status(200).json(
      listings
    );
  } catch (error) {
    next(error);
  }
};

export const toggleFavoriteListing = async (
  req,
  res,
  next
) => {
  try {
    const listing =
      await Listing.findById(
        req.params.listingId
      );

    if (!listing) {
      return next(
        errorHandler(
          404,
          "Listing not found!"
        )
      );
    }

    const user =
      await User.findById(
        req.user.id
      );

    const isFavorite =
      user.favorites.some(
        (favoriteId) =>
          favoriteId.toString() ===
          req.params.listingId
      );

    const updatedUser =
      await User.findByIdAndUpdate(
        req.user.id,
        isFavorite
          ? {
              $pull: {
                favorites:
                  req.params
                    .listingId,
              },
            }
          : {
              $addToSet: {
                favorites:
                  req.params
                    .listingId,
              },
            },
        { new: true }
      ).select("-password");

    res.status(200).json({
      success: true,
      isFavorite:
        !isFavorite,
      favorites:
        updatedUser.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const getFavoriteListings = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).populate("favorites");

    if (!user) {
      return next(
        errorHandler(
          404,
          "User not found!"
        )
      );
    }

    res.status(200).json(
      user.favorites.filter(Boolean)
    );
  } catch (error) {
    next(error);
  }
};

export const getPublicSeller = async (
  req,
  res,
  next
) => {
  try {
    const seller =
      await User.findById(
        req.params.id
      ).select(
        "username email avatar createdAt"
      );

    if (!seller) {
      return next(
        errorHandler(
          404,
          "Seller not found!"
        )
      );
    }

    const listingCount =
      await Listing.countDocuments({
        userRef:
          req.params.id,
      });

    res.status(200).json({
      ...seller._doc,
      listingCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return next(
        errorHandler(
          404,
          "User not found!"
        )
      );
    }

    const {
      password: pass,
      ...rest
    } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
