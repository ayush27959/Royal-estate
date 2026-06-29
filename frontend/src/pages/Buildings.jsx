import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import BuildingCard from "../components/BuildingCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "";

const Buildings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    city: "",
    constructionStatus: "all",
    buildingType: "all",
    minPrice: 0,
    maxPrice: 50000000,
    sort: "createdAt",
    order: "desc",
  });

  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSidebarData((prev) => ({
      ...prev,
      searchTerm: urlParams.get("searchTerm") || "",
      city: urlParams.get("city") || "",
      constructionStatus: urlParams.get("constructionStatus") || "all",
      buildingType: urlParams.get("buildingType") || "all",
    }));
    setPage(1);
  }, [location.search]);

  useEffect(() => {
    const fetchBuildings = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          searchTerm: sidebarData.searchTerm,
          city: sidebarData.city,
          type: sidebarData.buildingType === "all" ? "" : sidebarData.buildingType,
          minPrice: sidebarData.minPrice,
          maxPrice: sidebarData.maxPrice,
          sort: sidebarData.sort,
          order: sidebarData.order,
          limit: 12,
          page,
        });

        // 🌟 Fix: एंडपॉइंट को बदलकर मुख्य लिस्टिंग API से जोड़ा गया है
        const response = await fetch(
          `${API_URL}/api/listing/get?${params.toString()}`
        );
        const data = await response.json();

        // 🌟 Fix: रिस्पॉन्स के डेटा स्ट्रक्चर को पूरी तरह सुरक्षित (Safe Fallback) बनाया गया
        const fetchedListings = data.listings || data.data || (Array.isArray(data) ? data : []);
        const totalCount = data.total || data.pagination?.total || fetchedListings.length || 0;

        setBuildings(fetchedListings);
        setTotalResults(totalCount);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch buildings");
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, [sidebarData, page]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/buildings?searchTerm=${sidebarData.searchTerm}&city=${sidebarData.city}`
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pre-launch & Under Construction Projects
          </h1>
          <p className="text-lg text-yellow-100 max-w-2xl">
            Discover premium pre-construction buildings with guaranteed ROI and
            flexible payment plans
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-64 ${
              showFilters ? "block" : "hidden lg:block"
            } fixed lg:static inset-0 z-40 lg:z-0 bg-white dark:bg-zinc-950 p-6 lg:p-0 lg:bg-transparent overflow-y-auto`}
          >
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSearch}
              className="space-y-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6 sticky top-6"
            >
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Search Buildings
                </label>
                <input
                  type="text"
                  name="searchTerm"
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                  placeholder="Project name..."
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={sidebarData.city}
                  onChange={handleChange}
                  placeholder="Search by city..."
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Construction Status */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Construction Status
                </label>
                <select
                  name="constructionStatus"
                  value={sidebarData.constructionStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Stages</option>
                  <option value="planning">Planning</option>
                  <option value="foundation">Foundation</option>
                  <option value="structure">Structure</option>
                  <option value="finishing">Finishing</option>
                  <option value="ready">Ready</option>
                </select>
              </div>

              {/* Building Type */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Building Type
                </label>
                <select
                  name="buildingType"
                  value={sidebarData.buildingType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed-use">Mixed-Use</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    name="minPrice"
                    min="0"
                    max="50000000"
                    value={sidebarData.minPrice}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                  ${sidebarData.minPrice.toLocaleString()} -{" "}
                  ${sidebarData.maxPrice.toLocaleString()}
                </p>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Sort By
                </label>
                <select
                  name="sort"
                  value={sidebarData.sort}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="createdAt">Newest</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaSearch /> Search
              </button>
            </form>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {totalResults} Projects Found
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Browse and invest in premium pre-construction projects
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold"
              >
                <FaFilter /> Filters
              </button>
            </div>

            {/* Results Grid */}
            {loading ? (
              <Loader />
            ) : buildings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {buildings.map((building) => (
                    <BuildingCard
                      key={building._id}
                      building={building}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-zinc-900 dark:text-white">
                    Page {page}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-600 dark:text-zinc-400">
                  No projects found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Buildings;