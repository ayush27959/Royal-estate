import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Building title is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    area: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    constructionStatus: {
      type: String,
      enum: ["planning", "foundation", "structure", "finishing", "ready"],
      default: "planning",
    },

    completionDate: {
      type: Date,
      required: true,
    },

    amenities: [
      {
        type: String,
        enum: [
          "parking",
          "gym",
          "pool",
          "garden",
          "security",
          "intercom",
          "backup_power",
          "water_tank",
          "balcony",
          "terrace",
          "lift",
          "clubhouse",
          "playground",
          "library",
        ],
      },
    ],

    images: [
      {
        url: String,
        caption: String,
      },
    ],

    floorPlans: [
      {
        url: String,
        description: String,
      },
    ],

    buildingType: {
      type: String,
      enum: ["residential", "commercial", "mixed-use", "luxury"],
      default: "residential",
    },

    totalUnits: {
      type: Number,
      required: true,
      min: 1,
    },

    availableUnits: {
      type: Number,
      required: true,
      min: 0,
    },

    developer: {
      name: String,
      email: String,
      phone: String,
    },

    specifications: {
      flooring: String,
      wallPaint: String,
      kitchenType: String,
      plumbing: String,
      electrical: String,
    },

    pricePerSqft: {
      type: Number,
      required: true,
    },

    paymentPlan: [
      {
        stage: String,
        percentage: Number,
      },
    ],

    investmentReturn: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        text: String,
        rating: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Building = mongoose.model("Building", buildingSchema);

export default Building;
