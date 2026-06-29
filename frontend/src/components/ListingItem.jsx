import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaBalanceScale, FaHeart } from "react-icons/fa";
import { updateUserFavorites } from "../redux/user/userSlice";
import {
  isListingCompared,
  toggleCompareListing,
} from "../utils/compareListings";

const FALLBACK_IMAGE =
  "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg";

function ListingItem({
  listing,
  onFavoriteChange,
}) {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const { currentUser } =
    useSelector(
      (state) => state.user
    );

  const listingPath = `/listing/${listing._id}`;
  const coverImage = listing.imageUrls?.[0] || FALLBACK_IMAGE;
  const displayPrice = (
    listing.offer
      ? listing.discountPrice
      : listing.regularPrice
  )?.toLocaleString("en-IN");
  const [
    compared,
    setCompared,
  ] = useState(false);
  const [
    compareMessage,
    setCompareMessage,
  ] = useState("");
  const authUser =
    currentUser?.user ||
    currentUser;

  const favoriteIds =
    authUser?.favorites?.map(
      (favorite) =>
        favorite?._id ||
        favorite?.toString()
    ) || [];

  const isSaved =
    favoriteIds.includes(
      listing._id
    );

  useEffect(() => {
    setCompared(
      isListingCompared(
        listing._id
      )
    );
  }, [listing._id]);

  const handleFavoriteClick =
    async () => {
      if (!authUser) {
        navigate("/sign-in");
        return;
      }

      try {
        const res =
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/user/favorites/${listing._id}`,
            {
              method:
                "POST",
              credentials:
                "include",
            }
          );

        const data =
          await res.json();

        if (
          data.success ===
          false
        ) {
          return;
        }

        dispatch(
          updateUserFavorites(
            data.favorites
          )
        );

        onFavoriteChange?.(
          data
        );
      } catch (error) {
        console.log(
          error.message
        );
      }
    };

  const handleCompareClick = () => {
    const result =
      toggleCompareListing(
        listing
      );

    if (result.limitReached) {
      setCompareMessage(
        "Max 3 properties"
      );
      window.setTimeout(
        () => setCompareMessage(""),
        1800
      );
      return;
    }

    setCompared(result.added);
    setCompareMessage(
      result.added
        ? "Added to compare"
        : "Removed"
    );

    window.setTimeout(
      () => setCompareMessage(""),
      1400
    );
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 font-sans shadow-[0_18px_45px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1.5 hover:border-yellow-500/45 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:shadow-[0_24px_70px_rgba(0,0,0,0.48)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-yellow-500/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        to={listingPath}
        aria-label={`View ${listing.name}`}
        className="block no-underline"
      >
        <div className="relative h-[230px] overflow-hidden">
          <img
            src={coverImage}
            alt="listing cover"
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.07]"
            loading="lazy"
            decoding="async"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <span className="absolute left-3 top-3 z-20 rounded-full border border-blue-400/30 bg-blue-500/90 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </span>

          {listing.offer && (
            <span className="absolute right-3 top-3 z-20 rounded-full bg-yellow-500 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.1em] text-black shadow-[0_10px_25px_rgba(234,179,8,0.25)]">
              Offer
            </span>
          )}
        </div>
      </Link>

      <div className="relative z-20 flex flex-col gap-3 px-5 pb-5 pt-5">
        <Link to={listingPath} className="block no-underline">
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap font-serif text-[1.15rem] font-bold leading-tight text-gray-900 dark:text-white">
            {listing.name}
          </h2>

          <div className="mt-3 flex items-center gap-1.5 text-[0.82rem] text-gray-600 dark:text-zinc-400">
            <MdLocationOn className="shrink-0 text-base text-emerald-400" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {listing.address}
            </p>
          </div>

          <p className="mt-3 overflow-hidden text-[0.83rem] leading-[1.6] text-gray-600 dark:text-zinc-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {listing.description}
          </p>
        </Link>

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 dark:border-white/10 pt-3">
          <Link to={listingPath} className="block no-underline">
            <div>
              <p className="font-serif text-2xl font-black leading-none text-yellow-500">
                Rs {displayPrice || "0"}
              </p>
              {listing.type === "rent" && (
                <p className="mt-1 text-xs font-normal text-zinc-500">
                  per month
                </p>
              )}
            </div>
          </Link>

          <div className="flex gap-2">
            <button
              onClick={
                handleFavoriteClick
              }
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-200 hover:scale-110 hover:border-[#c9a84c] ${
                isSaved
                  ? "border-red-400/60 bg-red-500/20"
                  : "border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-zinc-900 hover:bg-yellow-500/20"
              }`}
              type="button"
              aria-label={
                isSaved
                  ? "Remove saved listing"
                  : "Save listing"
              }
            >
              <FaHeart
                className={`text-[0.85rem] ${
                  isSaved
                    ? "text-red-300"
                    : "text-red-400"
                }`}
              />
            </button>
            <button
              onClick={
                handleCompareClick
              }
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-200 hover:scale-110 hover:border-[#c9a84c] ${
                compared
                  ? "border-yellow-500/70 bg-yellow-500/20"
                  : "border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-zinc-900 hover:bg-yellow-500/20"
              }`}
              type="button"
              aria-label={
                compared
                  ? "Remove from compare"
                  : "Add to compare"
              }
            >
              <FaBalanceScale
                className={`text-[0.85rem] ${
                  compared
                    ? "text-yellow-500"
                    : "text-zinc-400"
                }`}
              />
            </button>
          </div>
        </div>

        {compareMessage && (
          <p className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-yellow-500">
            {compareMessage}
          </p>
        )}

        <Link to={listingPath} className="block no-underline">
          <div className="flex gap-2.5">
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-zinc-900 px-3 py-2 text-[0.8rem] font-semibold text-gray-600 dark:text-zinc-400">
              <FaBed className="text-[0.85rem] text-blue-400" />
              <span>{listing.bedrooms} Beds</span>
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-zinc-900 px-3 py-2 text-[0.8rem] font-semibold text-gray-600 dark:text-zinc-400">
              <FaBath className="text-[0.85rem] text-emerald-400" />
              <span>{listing.bathrooms} Baths</span>
            </div>
          </div>
        </Link>

        <Link
          className="mt-1 block w-full rounded-xl border border-yellow-500/35 bg-transparent p-3 text-center text-[0.82rem] font-bold uppercase tracking-[0.1em] text-yellow-500 no-underline transition duration-200 hover:-translate-y-0.5 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black hover:shadow-[0_14px_30px_rgba(234,179,8,0.18)]"
          to={listingPath}
        >
          View Property
        </Link>
      </div>
    </div>
  );
}

export default memo(ListingItem);
