const COMPARE_LISTINGS_KEY =
  "royalestate_compare_listings";

export const MAX_COMPARE_LISTINGS = 3;

export const getCompareListings = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const listings =
      JSON.parse(
        window.localStorage.getItem(
          COMPARE_LISTINGS_KEY
        )
      ) || [];

    return Array.isArray(listings)
      ? listings
      : [];
  } catch {
    return [];
  }
};

export const saveCompareListings = (listings) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    COMPARE_LISTINGS_KEY,
    JSON.stringify(listings)
  );
};

export const isListingCompared = (listingId) =>
  getCompareListings().some(
    (listing) =>
      listing._id === listingId
  );

export const toggleCompareListing = (listing) => {
  if (!listing?._id) {
    return {
      listings: getCompareListings(),
      added: false,
      limitReached: false,
    };
  }

  const currentListings =
    getCompareListings();

  const exists =
    currentListings.some(
      (item) =>
        item._id === listing._id
    );

  if (exists) {
    const listings =
      currentListings.filter(
        (item) =>
          item._id !== listing._id
      );

    saveCompareListings(listings);

    return {
      listings,
      added: false,
      limitReached: false,
    };
  }

  if (
    currentListings.length >=
    MAX_COMPARE_LISTINGS
  ) {
    return {
      listings: currentListings,
      added: false,
      limitReached: true,
    };
  }

  const compareListing = {
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
    contactEmail: listing.contactEmail,
    contactNumber: listing.contactNumber,
  };

  const listings = [
    ...currentListings,
    compareListing,
  ];

  saveCompareListings(listings);

  return {
    listings,
    added: true,
    limitReached: false,
  };
};
