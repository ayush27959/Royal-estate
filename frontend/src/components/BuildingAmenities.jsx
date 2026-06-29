import React, { useState } from "react";
import {
  FaWindowClose,
  FaWifi,
  FaShieldAlt,
  FaSwimmingPool,
  FaCar,
  FaBolt,
  FaLeaf,
  FaCamera,
} from "react-icons/fa";

const amenityIcons = {
  parking: FaCar,
  gym: FaBolt,
  pool: FaSwimmingPool,
  garden: FaLeaf,
  security: FaShieldAlt,
  intercom: FaWindowClose,
  backup_power: FaBolt,
  water_tank: FaWindowClose,
  balcony: FaWindowClose,
  terrace: FaLeaf,
  lift: FaBolt,
  clubhouse: FaCamera,
  playground: FaLeaf,
  library: FaCamera,
};

const BuildingAmenities = ({ amenities }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedAmenities = isExpanded ? amenities : amenities.slice(0, 6);

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
        Premium Amenities
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedAmenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || FaShieldAlt;

          return (
            <div
              key={amenity}
              className="group relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-xl border border-yellow-100 dark:border-yellow-900/30 hover:border-yellow-400 dark:hover:border-yellow-600 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-3xl text-yellow-600 dark:text-yellow-400 mb-2 group-hover:scale-125 transition-transform duration-300">
                <Icon />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white text-center capitalize">
                {amenity.replace(/_/g, " ")}
              </p>
            </div>
          );
        })}
      </div>

      {amenities.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 w-full px-4 py-2 rounded-lg border border-yellow-500 text-yellow-600 dark:text-yellow-400 font-bold hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors"
        >
          {isExpanded
            ? "Show Less"
            : `View All ${amenities.length} Amenities`}
        </button>
      )}
    </div>
  );
};

export default BuildingAmenities;
