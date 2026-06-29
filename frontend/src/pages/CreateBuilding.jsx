import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "";

const CreateBuilding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([""]);
  const [paymentStages, setPaymentStages] = useState([
    { stage: "Booking", percentage: 10 },
    { stage: "Foundation", percentage: 20 },
    { stage: "Structure", percentage: 30 },
    { stage: "Finishing", percentage: 30 },
    { stage: "Handover", percentage: 10 },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    location: "",
    city: "",
    price: 0,
    constructionStatus: "planning",
    completionDate: "",
    buildingType: "residential",
    totalUnits: 0,
    availableUnits: 0,
    pricePerSqft: 0,
    investmentReturn: 0,
    amenities: [],
    specifications: {
      flooring: "",
      wallPaint: "",
      kitchenType: "",
      plumbing: "",
      electrical: "",
    },
    developer: {
      name: "",
      email: "",
      phone: "",
    },
    featured: false,
  });

  const amenitiesOptions = [
    "parking",
    "gym",
    "pool",
    "garden",
    "security",
    "intercom",
    "backup_power",
    "water_tank",
    "balcony",
    "terrace",
    "lift",
    "clubhouse",
    "playground",
    "library",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("developer.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        developer: { ...prev.developer, [key]: value },
      }));
    } else if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handlePaymentStageChange = (index, key, value) => {
    const newStages = [...paymentStages];
    newStages[index] = { ...newStages[index], [key]: value };
    setPaymentStages(newStages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.city || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const images = imageUrls
        .filter((url) => url.trim())
        .map((url) => ({ url, caption: "" }));

      const buildingData = {
        ...formData,
        images,
        paymentPlan: paymentStages,
      };

      const response = await fetch(`${API_URL}/api/building/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(buildingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create building");
      }

      const data = await response.json();
      toast.success("Building project created successfully!");
      navigate(`/building/${data._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold mb-6 hover:opacity-80"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          List Your Project
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Create a new pre-construction project listing
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Luxury Heights Apartment Complex"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your project..."
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Specific area/address"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City name"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Building Details */}
          <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Building Details
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Building Type
                </label>
                <select
                  name="buildingType"
                  value={formData.buildingType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed-use">Mixed-Use</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Construction Status
                </label>
                <select
                  name="constructionStatus"
                  value={formData.constructionStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="planning">Planning</option>
                  <option value="foundation">Foundation</option>
                  <option value="structure">Structure</option>
                  <option value="finishing">Finishing</option>
                  <option value="ready">Ready</option>
                </select>
              </div>
            </div>
          </section>

          {/* Pricing & Investment */}
          <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Pricing & Investment
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Total Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Price Per Sqft
                </label>
                <input
                  type="number"
                  name="pricePerSqft"
                  value={formData.pricePerSqft}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Investment Return (%)
                </label>
                <input
                  type="number"
                  name="investmentReturn"
                  value={formData.investmentReturn}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Total Units
                </label>
                <input
                  type="number"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Available Units
                </label>
                <input
                  type="number"
                  name="availableUnits"
                  value={formData.availableUnits}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Completion Date
              </label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </section>

          {/* Amenities */}
          <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="w-4 h-4 text-yellow-500 rounded"
                  />
                  <span className="text-sm text-zinc-900 dark:text-white capitalize">
                    {amenity.replace(/_/g, " ")}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Developer Information */}
          <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Developer Information
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Developer Name
                </label>
                <input
                  type="text"
                  name="developer.name"
                  value={formData.developer.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="developer.email"
                  value={formData.developer.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="developer.phone"
                  value={formData.developer.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Project Listing"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBuilding;
