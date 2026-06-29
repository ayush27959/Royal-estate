import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaHome,
  FaUserTie,
} from "react-icons/fa";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

const API_URL =
  import.meta.env.VITE_API_URL || "";

const SellerProfile = () => {
  const { sellerId } =
    useParams();

  const [
    seller,
    setSeller,
  ] = useState(null);

  const [
    listings,
    setListings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  useEffect(() => {
    const fetchSellerProfile =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const [
            sellerRes,
            listingsRes,
          ] = await Promise.all([
            fetch(
              `${API_URL}/api/user/seller/${sellerId}`
            ),
            fetch(
              `${API_URL}/api/listing/get?userRef=${sellerId}&limit=20`
            ),
          ]);

          const sellerData =
            await sellerRes.json();
          const listingsData =
            await listingsRes.json();

          if (
            sellerData.success === false ||
            !sellerRes.ok
          ) {
            throw new Error(
              sellerData.message ||
                "Seller not found"
            );
          }

          if (!listingsRes.ok) {
            throw new Error(
              "Unable to load seller listings"
            );
          }

          setSeller(sellerData);
          setListings(
            Array.isArray(listingsData)
              ? listingsData
              : []
          );
        } catch (error) {
          setError(
            error.message ||
              "Unable to load seller profile"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchSellerProfile();
  }, [sellerId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-yellow-500/20 border-t-yellow-500" />
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Loading Seller...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <h1 className="text-3xl font-black">
            Seller Not Available
          </h1>
          <p className="mt-3 text-zinc-400">
            {error}
          </p>
          <Link
            to="/search"
            className="mt-6 inline-block rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            Browse Listings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-yellow-500/10 px-4 pb-16 pt-32 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <img
            src={seller?.avatar || "/profile.png"}
            alt={seller?.username || "seller"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/profile.png";
            }}
            className="h-36 w-36 rounded-full border-4 border-yellow-500 object-cover shadow-[0_18px_45px_rgba(234,179,8,0.18)]"
          />

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
              Seller Profile
            </p>

            <h1 className="font-serif text-5xl font-black leading-tight md:text-7xl">
              {seller?.username}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm font-semibold text-yellow-400">
                <FaHome />
                {seller?.listingCount || 0} Listings
              </span>

              <span className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-300">
                <FaUserTie />
                RoyalEstate Seller
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:flex md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl font-bold">
              Contact Seller
            </h2>
            <p className="mt-2 break-all text-zinc-400">
              {seller?.email}
            </p>
          </div>

          <a
            href={`mailto:${seller?.email}?subject=Property Inquiry on RoyalEstate`}
            className="mt-5 inline-flex items-center gap-3 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 md:mt-0"
          >
            <FaEnvelope />
            Send Email
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="mb-4 h-1 w-12 rounded bg-yellow-500" />
          <h2 className="font-serif text-4xl font-bold">
            Seller Listings
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            All properties listed by this seller
          </p>
        </div>

        {listings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 text-center">
            <h3 className="text-2xl font-bold">
              No active listings
            </h3>
            <p className="mt-3 text-zinc-400">
              This seller has no public properties right now.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default SellerProfile;
