import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
  FaTimes,
} from "react-icons/fa";
import Footer from "../components/Footer";
import {
  getCompareListings,
  saveCompareListings,
} from "../utils/compareListings";

const formatPrice = (listing) => {
  const price = listing.offer
    ? listing.discountPrice
    : listing.regularPrice;

  return `Rs ${(price || 0).toLocaleString(
    "en-IN"
  )}${listing.type === "rent" ? " / month" : ""}`;
};

const getBestValueId = (listings) => {
  if (listings.length < 2) return null;

  return listings.reduce(
    (best, listing) => {
      const currentPrice = listing.offer
        ? listing.discountPrice
        : listing.regularPrice;

      const bestPrice = best.offer
        ? best.discountPrice
        : best.regularPrice;

      return (currentPrice || 0) <
        (bestPrice || 0)
        ? listing
        : best;
    },
    listings[0]
  )._id;
};

const CompareRow = ({
  label,
  values,
}) => (
  <div className="grid min-w-[780px] grid-cols-[180px_repeat(var(--compare-count),minmax(190px,1fr))] border-t border-zinc-200 dark:border-white/10">
    <div className="bg-zinc-100 p-4 text-sm font-black uppercase tracking-[0.16em] text-zinc-600 dark:bg-black/35 dark:text-zinc-500">
      {label}
    </div>

    {values.map((value, index) => (
      <div
        key={`${label}-${index}`}
        className="border-l border-zinc-200 p-4 text-sm leading-6 text-zinc-700 dark:border-white/10 dark:text-zinc-300"
      >
        {value}
      </div>
    ))}
  </div>
);

const Compare = () => {
  const [
    listings,
    setListings,
  ] = useState([]);

  useEffect(() => {
    setListings(
      getCompareListings()
    );
  }, []);

  const bestValueId =
    getBestValueId(listings);

  const removeListing = (listingId) => {
    const updatedListings =
      listings.filter(
        (listing) =>
          listing._id !== listingId
      );

    setListings(updatedListings);
    saveCompareListings(
      updatedListings
    );
  };

  const clearCompare = () => {
    setListings([]);
    saveCompareListings([]);
  };

  return (
    <main className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
      
      {/* Hero Section */}
      <section className="border-b border-zinc-200 px-4 pb-14 pt-32 dark:border-yellow-500/10 sm:px-6 lg:pb-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Compare
            </p>

            <h1 className="font-serif text-5xl font-black leading-[0.98] md:text-7xl">
              Compare Properties
            </h1>

            <p className="mt-5 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
              Review price, location, features, and contact details side by side.
            </p>
          </div>

          {listings.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500/15 dark:text-red-400"
            >
              Clear Compare
            </button>
          )}
        </div>
      </section>

      {/* Compare Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-lg dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            
            <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-yellow-500" />

            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
              No properties selected
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
              Add properties from listing cards using the compare button.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:-translate-y-0.5 hover:bg-yellow-400"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            
            <div
              className="grid min-w-[780px] grid-cols-[180px_repeat(var(--compare-count),minmax(190px,1fr))]"
              style={{
                "--compare-count":
                  listings.length,
              }}
            >
              <div className="bg-zinc-100 dark:bg-black/35 p-4" />

              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="relative border-l border-zinc-200 p-4 dark:border-white/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      removeListing(
                        listing._id
                      )
                    }
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 transition hover:bg-red-500 hover:text-white dark:bg-black/75 dark:text-zinc-300"
                  >
                    <FaTimes />
                  </button>

                  <img
                    src={
                      listing.imageUrls?.[0] ||
                      "/bg-img.jpg"
                    }
                    alt={listing.name}
                    className="h-40 w-full rounded-xl object-cover shadow-md dark:shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                  />

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-500 dark:text-blue-300">
                        {listing.type ===
                        "rent"
                          ? "Rent"
                          : "Sale"}
                      </span>

                      {bestValueId ===
                        listing._id && (
                        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                          Best Price
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 text-xl font-black text-zinc-900 dark:text-white">
                      {listing.name}
                    </h2>

                    <Link
                      to={`/listing/${listing._id}`}
                      className="mt-4 inline-block rounded-lg border border-yellow-500/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                "--compare-count":
                  listings.length,
              }}
            >
              <CompareRow
                label="Price"
                values={listings.map(formatPrice)}
              />

              <CompareRow
                label="Location"
                values={listings.map(
                  (listing) =>
                    listing.address
                )}
              />

              <CompareRow
                label="Beds"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaBed className="text-blue-500" />
                      {listing.bedrooms}
                    </span>
                  )
                )}
              />

              <CompareRow
                label="Baths"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaBath className="text-green-500" />
                      {listing.bathrooms}
                    </span>
                  )
                )}
              />

              <CompareRow
                label="Parking"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaParking className="text-orange-500" />
                      {listing.parking
                        ? "Yes"
                        : "No"}
                    </span>
                  )
                )}
              />

              <CompareRow
                label="Furnished"
                values={listings.map(
                  (listing) => (
                    <span className="inline-flex items-center gap-2">
                      <FaChair className="text-violet-500" />
                      {listing.furnished
                        ? "Yes"
                        : "No"}
                    </span>
                  )
                )}
              />

              <CompareRow
                label="Offer"
                values={listings.map(
                  (listing) =>
                    listing.offer
                      ? "Available"
                      : "No"
                )}
              />

              <CompareRow
                label="Contact"
                values={listings.map(
                  (listing) =>
                    listing.contactEmail ||
                    "Open listing"
                )}
              />
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Compare;