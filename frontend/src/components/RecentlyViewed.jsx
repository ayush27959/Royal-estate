import { useEffect, useState } from "react";
import ListingItem from "./ListingItem";
import { getRecentlyViewedListings } from "../utils/recentlyViewed";

const RecentlyViewed = ({
  title = "Recently Viewed",
  description = "Properties you opened recently",
  className = "",
  gridClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
  limit,
}) => {
  const [
    listings,
    setListings,
  ] = useState([]);

  useEffect(() => {
    const recentListings =
      getRecentlyViewedListings();

    setListings(
      typeof limit === "number"
        ? recentListings.slice(0, limit)
        : recentListings
    );
  }, [limit]);

  if (listings.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="mb-4 h-1 w-12 rounded bg-[#c9a84c]" />
        <h2 className="font-serif text-4xl font-bold text-[#f0ece4]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          {description}
        </p>
      </div>

      <div className={gridClassName}>
        {listings.map((listing) => (
          <ListingItem
            key={listing._id}
            listing={listing}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
