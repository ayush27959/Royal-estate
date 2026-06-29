import mongoose from "mongoose";

const listingSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      contactNumber: {
        type: String,
        required: true,
      },

      contactEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      regularPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      discountPrice: {
        type: Number,
        default: 0,
        min: 0,
      },

      bedrooms: {
        type: Number,
        required: true,
        min: 1,
      },

      bathrooms: {
        type: Number,
        required: true,
        min: 1,
      },

      furnished: {
        type: Boolean,
        default: false,
      },

      parking: {
        type: Boolean,
        default: false,
      },

      type: {
        type: String,
        enum: ["rent", "sale"],
        required: true,
      },

      offer: {
        type: Boolean,
        default: false,
      },

      imageUrls: {
        type: [String],
        required: true,
      },

      userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

const Listing = mongoose.model(
  "Listing",
  listingSchema
);

export default Listing;