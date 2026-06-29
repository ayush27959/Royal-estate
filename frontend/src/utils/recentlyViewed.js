const RECENTLY_VIEWED_KEY =
  "royalestate_recently_viewed";

const MAX_RECENT_LISTINGS = 6;

export const getRecentlyViewedListings = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const listings =
      JSON.parse(
        window.localStorage.getItem(
          RECENTLY_VIEWED_KEY
        )
      ) || [];

    return Array.isArray(listings)
      ? listings
      : [];
  } catch {
    return [];
  }
};

export const saveRecentlyViewedListing = (listing) => {
  if (
    typeof window === "undefined" ||
    !listing?._id
  ) {
    return;
  }

  const currentListings =
    getRecentlyViewedListings();

  const recentListing = {
    _id: listing._id,
    name: listing.name,
    address: listing.address,
    description: listing.description,
    imageUrls: listing.imageUrls,
    type: listing.type,
    offer: listing.offer,
    regularPrice: listing.regularPrice,
    discountPrice: listing.discountPrice,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    parking: listing.parking,
    furnished: listing.furnished,
  };

  const updatedListings = [
    recentListing,
    ...currentListings.filter(
      (item) =>
        item._id !== listing._id
    ),
  ].slice(0, MAX_RECENT_LISTINGS);

  window.localStorage.setItem(
    RECENTLY_VIEWED_KEY,
    JSON.stringify(updatedListings)
  );
};
