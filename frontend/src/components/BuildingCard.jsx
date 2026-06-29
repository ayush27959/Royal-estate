import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMapMarkerAlt,
  FaStar,
  FaHardHat,
  FaCheckCircle,
  FaTag,
  FaUsers,
} from "react-icons/fa";

const BuildingCard = ({ building }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const statusColors = {
    planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    foundation:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    structure:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    finishing: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    ready:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <Link to={`/building/${building._id}`}>
      <div className="group overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          {building.images && building.images.length > 0 ? (
            <img
              src={building.images[0].url}
              alt={building.title}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800">
              <FaHardHat className="text-4xl text-zinc-600 dark:text-zinc-400" />
            </div>
          )}

          {/* Badge Overlay */}
          <div className="absolute top-3 left-3 right-3 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                statusColors[building.constructionStatus]
              }`}
            >
              {building.constructionStatus.charAt(0).toUpperCase() +
                building.constructionStatus.slice(1)}
            </span>
            {building.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Rating */}
          {building.rating > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 dark:bg-zinc-950/95 backdrop-blur px-3 py-2 rounded-full">
              <FaStar className="text-yellow-500 text-sm" />
              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                {building.rating}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title & Type */}
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {building.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-yellow-500 flex-shrink-0" />
              {building.city}
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-zinc-100 dark:bg-white/5 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-300">
                <FaBed className="text-sm" />
                <span className="font-semibold">{building.bedrooms}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Beds</p>
            </div>
            <div className="bg-zinc-100 dark:bg-white/5 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-300">
                <FaBath className="text-sm" />
                <span className="font-semibold">{building.bathrooms}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Baths</p>
            </div>
            <div className="bg-zinc-100 dark:bg-white/5 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-600 dark:text-zinc-300">
                <FaRuler className="text-sm" />
                <span className="font-semibold">{(building.area / 1000).toFixed(1)}k</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Sq.ft</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 py-2 border-y border-zinc-200 dark:border-white/10">
            <div className="flex items-center gap-1">
              <FaUsers className="text-yellow-500" />
              <span>
                {building.availableUnits}/{building.totalUnits} Units
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckCircle className="text-green-500" />
              <span>
                {new Date(building.completionDate).getFullYear()}
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Starting Price
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                ${(building.pricePerSqft).toFixed(0)}/sqft
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                ${(building.price / 1000000).toFixed(1)}M
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Return: {building.investmentReturn}%
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full mt-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
            View Details & Invest
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BuildingCard;
