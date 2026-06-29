import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaArrowRight,
  FaBuilding,
  FaChartLine,
  FaCoins,
  FaCheckCircle,
  FaUsers,
  FaShieldAlt,
  FaSearch,
} from "react-icons/fa";
import ListingItem from "../components/ListingItem";
import BuildingCard from "../components/BuildingCard";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "";

const StatCard = ({ icon: Icon, number, label, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300`}>
    <Icon className="text-4xl mb-4 opacity-80" />
    <h3 className="text-3xl font-bold mb-1">{number}</h3>
    <p className="text-sm opacity-90">{label}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-2xl`}>
      <Icon />
    </div>
    <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
  </div>
);

const Home = () => {
  const [featuredBuildings, setFeaturedBuildings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buildingsRes, listingsRes] = await Promise.all([
          fetch(`${API_URL}/api/building/featured`),
          fetch(`${API_URL}/api/listing/get?limit=6`),
        ]);

        const buildingsData = await buildingsRes.json();
        const listingsData = await listingsRes.json();

        setFeaturedBuildings(Array.isArray(buildingsData) ? buildingsData : []);
        setRecentListings(
          Array.isArray(listingsData) ? listingsData : listingsData?.data || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-yellow-900/20 text-white overflow-hidden flex items-center">
        {/* Animated Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, yellow 0%, transparent 50%), radial-gradient(circle at 80% 80%, yellow 0%, transparent 50%)`,
            backgroundSize: "100% 100%",
          }}
        />

        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-sm font-bold text-yellow-300">
              🚀 Next Generation Real Estate Investment Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-5xl mx-auto">
            Invest in Premium <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">Pre-Construction Properties</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover curated pre-construction buildings with guaranteed ROI, flexible payment plans, and expert support. Build your wealth through strategic real estate investment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/buildings"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Projects <FaArrowRight />
            </Link>
            <Link
              to="/search"
              className="px-8 py-4 border-2 border-yellow-500 text-yellow-400 font-bold rounded-xl hover:bg-yellow-500/10 transition-all duration-300 w-full sm:w-auto"
            >
              Browse Listings
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">500+</h3>
              <p className="text-gray-400 font-semibold">Active Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50K+</h3>
              <p className="text-gray-400 font-semibold">Happy Investors</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">$2B+</h3>
              <p className="text-gray-400 font-semibold">Total Investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              The Future of Real Estate Investment
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={FaChartLine}
              title="Guaranteed Returns"
              description="Pre-construction projects with verified ROI and transparent growth tracking."
              color="bg-gradient-to-br from-blue-400 to-blue-600 text-white"
            />
            <FeatureCard
              icon={FaCoins}
              title="Flexible Payments"
              description="Customizable payment plans starting from low down payments over multiple stages."
              color="bg-gradient-to-br from-green-400 to-green-600 text-white"
            />
            <FeatureCard
              icon={FaShieldAlt}
              title="100% Secure"
              description="Bank-verified developers and complete legal protection for all transactions."
              color="bg-gradient-to-br from-red-400 to-red-600 text-white"
            />
            <FeatureCard
              icon={FaUsers}
              title="Expert Support"
              description="24/7 customer support and expert guidance throughout your investment journey."
              color="bg-gradient-to-br from-purple-400 to-purple-600 text-white"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredBuildings.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white dark:from-black to-zinc-50 dark:to-zinc-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">
                  Premium Opportunities
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                  Featured Projects
                </h2>
              </div>
              <Link
                to="/buildings"
                className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 font-bold rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors"
              >
                View All <FaArrowRight />
              </Link>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : featuredBuildings.length > 0 ? (
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation
                autoplay={{ delay: 8000 }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="pb-12"
              >
                {featuredBuildings.map((building) => (
                  <SwiperSlide key={building._id}>
                    <BuildingCard building={building} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
                No featured projects available yet
              </div>
            )}
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Browse Projects",
                desc: "Explore our curated collection of premium pre-construction buildings",
              },
              {
                step: 2,
                title: "Choose Payment Plan",
                desc: "Select flexible payment stages that work with your budget",
              },
              {
                step: 3,
                title: "Invest & Track",
                desc: "Complete verification and monitor construction progress in real-time",
              },
              {
                step: 4,
                title: "Earn Returns",
                desc: "Receive your guaranteed returns as the project completes",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800/50 p-8 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <FaArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-yellow-500 text-2xl" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      {recentListings.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white dark:from-black to-zinc-50 dark:to-zinc-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">
                  Latest Opportunities
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                  Recent Listings
                </h2>
              </div>
              <Link
                to="/search"
                className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 font-bold rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors"
              >
                Explore All <FaArrowRight />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.slice(0, 6).map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Build Your Wealth?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful investors who are growing their portfolio with premium real estate investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/buildings"
              className="px-8 py-4 bg-black text-yellow-500 font-bold rounded-xl hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105"
            >
              Explore Pre-Construction Projects
            </Link>
            <Link
              to="/sign-up"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;