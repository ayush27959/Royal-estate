import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaTag,
  FaUserTie,
} from "react-icons/fa";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { saveRecentlyViewedListing } from "../utils/recentlyViewed";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/listing/get/${params.listingId}`
        );
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          return;
        }

        setListing(data);
        saveRecentlyViewedListing(data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-black transition-colors duration-300">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-yellow-500/20 border-t-yellow-500" />
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 transition-colors duration-300">
            Loading Property...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-4 transition-colors duration-300">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-600 dark:text-red-300 transition-colors duration-300">
          Something went wrong
        </div>
      </main>
    );
  }

  const price = (
    listing?.offer ? listing?.discountPrice : listing?.regularPrice
  ) || 0;

  const featureItems = [
    {
      icon: <FaBed />,
      value: listing?.bedrooms,
      label: "Bedrooms",
      color: "text-yellow-600 dark:text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      icon: <FaBath />,
      value: listing?.bathrooms,
      label: "Bathrooms",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: <FaParking />,
      value: listing?.parking ? "Yes" : "No",
      label: "Parking",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      icon: <FaChair />,
      value: listing?.furnished ? "Yes" : "No",
      label: "Furnished",
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-20 text-zinc-900 dark:text-white transition-colors duration-300">
      {listing && (
        <>
          <section className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={800}
            >
              {listing.imageUrls?.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[560px] overflow-hidden sm:h-[640px] lg:h-[700px]">
                    <img
                      src={url}
                      alt={`${listing.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="fixed right-5 top-24 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/30 bg-white dark:bg-zinc-950 text-yellow-600 dark:text-yellow-500 shadow-[0_18px_45px_rgba(0,0,0,0.1)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black dark:hover:text-black"
              aria-label="Share listing"
            >
              <FaShare />
            </button>

            {copied && (
              <div className="fixed right-5 top-40 z-50 rounded-xl border border-yellow-500/30 bg-white dark:bg-zinc-950 px-4 py-2 text-sm text-yellow-600 dark:text-yellow-500 shadow-md transition-colors duration-300">
                Link copied
              </div>
            )}
          </section>

          <section className="relative z-10 mx-auto -mt-24 max-w-5xl px-4">
            <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-950 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-8 md:p-12 transition-colors duration-300">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 dark:text-yellow-500 transition-colors duration-300">
                Property Details
              </p>

              <h1 className="mb-8 font-serif text-4xl font-black leading-tight text-zinc-900 dark:text-white md:text-6xl transition-colors duration-300">
                {listing.name}
              </h1>

              <div className="mb-6 flex flex-wrap gap-4">
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-6 py-4 text-2xl font-bold text-yellow-600 dark:text-yellow-400 transition-colors duration-300">
                  Rs {price.toLocaleString("en-IN")}
                  {listing.type === "rent" && (
                    <span className="ml-2 text-sm opacity-70 text-zinc-600 dark:text-zinc-400">/ month</span>
                  )}
                </div>

                {listing.offer && (
                  <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-4 font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">
                    <FaTag />
                    Rs{" "}
                    {(
                      (+listing.regularPrice || 0) -
                      (+listing.discountPrice || 0)
                    ).toLocaleString("en-IN")}{" "}
                    OFF
                  </div>
                )}
              </div>

              <div className="mb-6 flex flex-wrap gap-3">
                <span
                  className={`rounded-xl px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    listing.type === "rent"
                      ? "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </span>

                {listing.furnished && (
                  <span className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 transition-colors duration-300">
                    Furnished
                  </span>
                )}
              </div>

              <div className="mb-10 flex items-center gap-3 text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                <FaMapMarkerAlt className="shrink-0 text-yellow-600 dark:text-yellow-500 transition-colors duration-300" />
                <p>{listing.address}</p>
              </div>

              {listing.userRef && (
                <Link
                  to={`/seller/${listing.userRef}`}
                  className="mb-10 flex flex-col gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 transition-all duration-300 hover:border-yellow-500/50 hover:bg-yellow-500/15 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                      <FaUserTie />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-500 transition-colors duration-300">
                        Listed By
                      </p>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                        View Seller Profile
                      </h2>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500 transition-colors duration-300">
                    View All Listings
                  </span>
                </Link>
              )}

              <div className="my-10 border-t border-zinc-200 dark:border-white/10 transition-colors duration-300" />

              <div className="mb-10">
                <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Description</h2>
                <p className="leading-8 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">{listing.description}</p>
              </div>

              <div className="my-10 border-t border-zinc-200 dark:border-white/10 transition-colors duration-300" />

              <div className="mb-10">
                <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Property Features</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {featureItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 p-5 text-center transition-all duration-300 hover:border-yellow-500/25 dark:hover:border-yellow-500/25"
                    >
                      <div
                        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-colors duration-300 ${item.bg} ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">{item.value}</h3>
                      <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 transition-colors duration-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {!contact ? (
                <button
                  type="button"
                  onClick={() => setContact(true)}
                  className="w-full rounded-xl bg-yellow-500 py-5 font-bold uppercase tracking-[0.2em] text-black transition-all duration-150 hover:bg-yellow-400 active:scale-[0.99]"
                >
                  Contact Owner
                </button>
              ) : (
                <Contact listing={listing} />
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
};

export default Listing;