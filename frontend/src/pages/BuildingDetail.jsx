import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaBed,
  FaBath,
  FaRuler,
  FaMapMarkerAlt,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaCheckCircle,
  FaHardHat,
  FaCoins,
  FaChartLine,
  FaUsers,
  FaChevronRight,
  FaFileDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BuildingTimeline from "../components/BuildingTimeline";
import BuildingAmenities from "../components/BuildingAmenities";
import InvestmentCalculator from "../components/InvestmentCalculator";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "";

const BuildingDetail = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/building/get/${buildingId}`);
        if (!response.ok) throw new Error("Building not found");
        const data = await response.json();
        setBuilding(data);
      } catch (error) {
        toast.error(error.message);
        navigate("/buildings");
      } finally {
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [buildingId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Building not found</p>
      </div>
    );
  }

  const statusColors = {
    planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    foundation:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    structure:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    finishing: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    ready:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        {building.images && building.images.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="h-96 md:h-[500px]"
          >
            {building.images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={image.url}
                  alt={image.caption || `Project ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-96 md:h-[500px] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <FaHardHat className="text-6xl text-zinc-700" />
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/70 hover:bg-black text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Status Badge */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          <span
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
              statusColors[building.constructionStatus]
            }`}
          >
            {building.constructionStatus.charAt(0).toUpperCase() +
              building.constructionStatus.slice(1)}
          </span>
          {building.featured && (
            <span className="px-4 py-2 rounded-lg text-sm font-bold bg-yellow-500 text-black">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Title & Quick Info */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            {building.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Price Per Sqft
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">
                ${building.pricePerSqft}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Investment Return
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">
                {building.investmentReturn}%
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-900/30">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Units Available
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">
                {building.availableUnits}/{building.totalUnits}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-900/30">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Completion
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">
                {new Date(building.completionDate).getFullYear()}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-white/5 rounded-lg">
              <FaBed className="text-yellow-500 text-xl" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Bedrooms
                </p>
                <p className="font-bold text-zinc-900 dark:text-white">
                  {building.bedrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-white/5 rounded-lg">
              <FaBath className="text-blue-500 text-xl" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Bathrooms
                </p>
                <p className="font-bold text-zinc-900 dark:text-white">
                  {building.bathrooms}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-white/5 rounded-lg">
              <FaRuler className="text-green-500 text-xl" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Area
                </p>
                <p className="font-bold text-zinc-900 dark:text-white">
                  {(building.area / 1000).toFixed(1)}k sqft
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-white/5 rounded-lg">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  City
                </p>
                <p className="font-bold text-zinc-900 dark:text-white">
                  {building.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-white/5 rounded-lg">
              <FaStar className="text-yellow-500 text-xl" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Rating
                </p>
                <p className="font-bold text-zinc-900 dark:text-white">
                  {building.rating}/5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-white/10">
              {["overview", "timeline", "amenities", "payment", "contact"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? "text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-500"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Tab Content */}
            <div>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  About This Project
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                  {building.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-3">
                      Building Specifications
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {building.specifications &&
                        Object.entries(building.specifications).map(
                          ([key, value]) => (
                            <li
                              key={key}
                              className="flex items-start justify-between"
                            >
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, " $1")}:
                              </span>
                              <span className="font-semibold text-zinc-900 dark:text-white">
                                {value}
                              </span>
                            </li>
                          )
                        )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-3">
                      Building Information
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start justify-between">
                        <span>Building Type:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white capitalize">
                          {building.buildingType}
                        </span>
                      </li>
                      <li className="flex items-start justify-between">
                        <span>Total Units:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {building.totalUnits}
                        </span>
                      </li>
                      <li className="flex items-start justify-between">
                        <span>Available Units:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {building.availableUnits}
                        </span>
                      </li>
                      <li className="flex items-start justify-between">
                        <span>Total Area:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {(building.area / 1000).toFixed(1)}k sqft
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <BuildingTimeline
              constructionStatus={building.constructionStatus}
              completionDate={building.completionDate}
            />
          )}

          {/* Amenities Tab */}
          {activeTab === "amenities" && building.amenities && (
            <BuildingAmenities amenities={building.amenities} />
          )}

          {/* Payment Plan Tab */}
          {activeTab === "payment" && (
            <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Payment Plan
              </h3>
              {building.paymentPlan && building.paymentPlan.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {building.paymentPlan.map((stage, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-lg border border-yellow-200 dark:border-yellow-900/30"
                    >
                      <h4 className="font-bold text-zinc-900 dark:text-white mb-2">
                        {stage.stage}
                      </h4>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {stage.percentage}%
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        ${((building.price * stage.percentage) / 100).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400">
                  Payment plan details coming soon
                </p>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Contact Developer
              </h3>
              {building.developer ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-yellow-500 text-xl" />
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Developer
                      </p>
                      <p className="font-bold text-zinc-900 dark:text-white">
                        {building.developer.name}
                      </p>
                    </div>
                  </div>
                  {building.developer.email && (
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-500 text-xl" />
                      <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Email
                        </p>
                        <a
                          href={`mailto:${building.developer.email}`}
                          className="font-bold text-zinc-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400"
                        >
                          {building.developer.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {building.developer.phone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-green-500 text-xl" />
                      <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Phone
                        </p>
                        <a
                          href={`tel:${building.developer.phone}`}
                          className="font-bold text-zinc-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400"
                        >
                          {building.developer.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400">
                  Contact information not available
                </p>
              )}
            </div>
          </div>

          {/* Right Sidebar - Investment Calculator */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <InvestmentCalculator building={building} />
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="max-w-7xl mx-auto px-4 flex gap-4 mt-12 pt-8 pb-12 border-t border-zinc-200 dark:border-white/10">
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Express Interest
        </button>
        <button className="flex-1 px-6 py-3 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 font-bold rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors">
          Schedule Tour
        </button>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuildingDetail;
