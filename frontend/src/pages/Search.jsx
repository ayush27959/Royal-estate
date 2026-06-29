import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const newSidebarData = {
      searchTerm: urlParams.get("searchTerm") || "",
      type: urlParams.get("type") || "all",
      parking: urlParams.get("parking") === "true",
      furnished: urlParams.get("furnished") === "true",
      offer: urlParams.get("offer") === "true",
      sort: urlParams.get("sort") || "createdAt",
      order: urlParams.get("order") || "desc",
    };

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);

        const searchQuery = urlParams.toString();
        const res = await fetch(`${API_URL}/api/listing/get?${searchQuery}`);

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const resData = await res.json();

        // 🌟 Fix: बैकएंड से आने वाले नए ऑब्जेक्ट रिस्पॉन्स स्ट्रक्चर (resData.data) को ग्रैब करें
        const fetchedListings = resData.data || resData.listings || (Array.isArray(resData) ? resData : []);
        setListings(fetchedListings);

        // 🌟 Fix: पेजिनेशन फ़ील्ड 'hasMore' के आधार पर Show More बटन दिखाएं
        if (resData.pagination) {
          setShowMore(resData.pagination.hasMore);
        } else {
          setShowMore(fetchedListings.length >= 9);
        }

        setSidebarData(newSidebarData);
      } catch (error) {
        console.log(error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (["all", "rent", "sale"].includes(e.target.id)) {
      setSidebarData((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    }

    if (e.target.id === "searchTerm") {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: e.target.value,
      }));
    }

    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setSidebarData((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    }

    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebarData((prev) => ({
        ...prev,
        sort: sort || "createdAt",
        order: order || "desc",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    try {
      const urlParams = new URLSearchParams(location.search);
      
      // बैकएंड पेजिनेशन के लिए करंट पेज नंबर को इंक्रीमेंट करें
      const currentPage = parseInt(urlParams.get("page")) || 1;
      urlParams.set("page", currentPage + 1);

      const res = await fetch(`${API_URL}/api/listing/get?${urlParams.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to load more listings");
      }

      const resData = await res.json();
      const nextListings = resData.data || resData.listings || (Array.isArray(resData) ? resData : []);

      setListings((prev) => [...prev, ...nextListings]);

      if (resData.pagination) {
        setShowMore(resData.pagination.hasMore);
      } else {
        setShowMore(nextListings.length >= 9);
      }

      // यूआरएल को अपडेट करें ताकि पेज स्टेट बना रहे
      navigate(`/search?${urlParams.toString()}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* MAIN */}
      <main className="min-h-screen overflow-x-hidden bg-black pt-24 text-white lg:flex">
        {/* SIDEBAR */}
        <aside className="w-full border-b border-white/10 bg-zinc-950 p-5 sm:p-7 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-[360px] lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="mb-10">
            <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">
              Advanced Search
            </p>
            <h1 className="font-serif text-3xl font-black leading-tight sm:text-4xl">
              Find Your
              <br />
              Dream Home
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            {/* SEARCH */}
            <div>
              <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-3">
                Search
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search properties..."
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
              />
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-4">
                Property Type
              </label>
              <div className="flex flex-col gap-4">
                {["all", "rent", "sale"].map((item) => (
                  <label
                    key={item}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      sidebarData.type === item
                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                        : "border-white/10 bg-black/35 text-zinc-300 hover:border-yellow-500/30"
                    }`}
                  >
                    <span className="capitalize">
                      {item === "all" ? "Rent & Sale" : item}
                    </span>
                    <input
                      type="checkbox"
                      id={item}
                      checked={sidebarData.type === item}
                      onChange={handleChange}
                      className="accent-yellow-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* AMENITIES */}
            <div>
              <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-4">
                Amenities
              </label>
              <div className="flex flex-col gap-4">
                {["parking", "furnished", "offer"].map((item) => (
                  <label
                    key={item}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      sidebarData[item]
                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                        : "border-white/10 bg-black/35 text-zinc-300 hover:border-yellow-500/30"
                    }`}
                  >
                    <span className="capitalize">{item}</span>
                    <input
                      type="checkbox"
                      id={item}
                      checked={sidebarData[item]}
                      onChange={handleChange}
                      className="accent-yellow-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* SORT */}
            <div>
              <label className="block text-sm uppercase tracking-wider text-zinc-400 mb-3">
                Sort By
              </label>
              <select
                id="sort_order"
                value={`${sidebarData.sort}_${sidebarData.order}`}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/35 p-4 text-white outline-none transition focus:border-yellow-500"
              >
                <option value="regularPrice_desc">Price High to Low</option>
                <option value="regularPrice_asc">Price Low to High</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>

            {/* BUTTON */}
            <button className="rounded-xl bg-yellow-500 p-4 font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:bg-yellow-400">
              Search
            </button>
          </form>
        </aside>

        {/* RESULTS */}
        <section className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-10">
          <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">
                Properties
              </p>
              <h2 className="font-serif text-3xl font-black leading-tight sm:text-5xl">
                Search Results
              </h2>
            </div>
            <p className="rounded-full border border-white/10 bg-zinc-950 px-4 py-2 text-sm text-zinc-500 sm:text-base">
              {listings.length} Listings Found
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* EMPTY */}
          {!loading && listings.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
              <h3 className="text-3xl font-bold mb-4">No Listings Found</h3>
              <p className="text-zinc-500">Try changing your filters</p>
            </div>
          )}

          {/* LISTINGS */}
          {!loading && listings.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          )}

          {/* SHOW MORE */}
          {showMore && (
            <div className="flex justify-center mt-14">
              <button
                onClick={onShowMoreClick}
                className="rounded-xl border border-yellow-500 px-8 py-4 font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
              >
                Show More
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}