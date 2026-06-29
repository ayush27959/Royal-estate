import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateListing = () => {
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    contactEmail: "",
    contactNumber: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: "",
    discountPrice: "",
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (id === "sale" || id === "rent") {
        setFormData({
          ...formData,
          type: id,
        });
      } else {
        setFormData({
          ...formData,
          [id]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  /* IMAGEKIT / BACKEND IMAGE UPLOAD */
  const handleImageSubmit = async () => {
    if (files.length === 0) {
      return setImageUploadError("Please select images");
    }

    try {
      setUploading(true);
      setImageUploadError("");
      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const imageData = new FormData();
        imageData.append("image", files[i]);

        const res = await axios.post(`${API_URL}/post`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        uploadedUrls.push(res.data.imageUrl);
      }

      setFormData({
        ...formData,
        imageUrls: uploadedUrls,
      });
      setUploading(false);
    } catch {
      setUploading(false);
      setImageUploadError("Image upload failed");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // 🔄 SUBMIT CLEANED DATA TO SERVER WITH DIRECT DOM BACKUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("Upload at least one image");
      }

      if (formData.offer && Number(formData.regularPrice) <= Number(formData.discountPrice)) {
        return setError("Discount price must be lower than regular price");
      }

      setLoading(true);
      setError("");

      const userId = currentUser?._id || currentUser?.id || currentUser?.user?._id || currentUser?.user?.id;

      if (!userId) {
        setLoading(false);
        return setError("You must be logged in to create a listing.");
      }

      // 🌟 Clean up mismatch data directly into the exact required backend keys
      const backendCompatiblePayload = {
        title: formData.name,                
        name: formData.name,                 
        description: formData.description,
        address: formData.address,
        type: formData.type,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        price: Number(formData.regularPrice),   
        regularPrice: Number(formData.regularPrice),
        discountPrice: Number(formData.discountPrice) || 0,
        offer: formData.offer,
        parking: formData.parking,
        furnished: formData.furnished,
        imageUrls: formData.imageUrls,
        userRef: userId,
        area: 1200,                             

        // 🌟 Direct DOM Fallback Fix: स्टेट और इनपुट आईडी के मिसमैच को बाईपास करने का सटीक तरीका
        contactEmail: document.getElementById("contactEmail")?.value || formData.contactEmail || currentUser?.email || "test@gmail.com",
        contactNumber: document.getElementById("contactNumber")?.value || formData.contactNumber || "7079919291",
      };

      const res = await fetch(`${API_URL}/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(backendCompatiblePayload),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        return setError(data.message);
      }
      
      // Navigate to the dynamic parameter path seamlessly
      navigate(`/listing/${data._id || data.listing?._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 pb-12 pt-32 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-950 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-10 transition-colors duration-300">
        <h1 className="mb-10 text-center font-serif text-5xl font-black">
          Create Listing
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Property Name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
            />

            <textarea
              placeholder="Description (Minimum 20 characters)"
              id="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="h-40 w-full resize-none rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
            />

            <input
              type="text"
              placeholder="Address"
              id="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
            />

            <input
              type="email"
              placeholder="Contact Email"
              id="contactEmail"
              required
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              id="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Bedrooms"
                id="bedrooms"
                min="1"
                value={formData.bedrooms}
                onChange={handleChange}
                className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
              />

              <input
                type="number"
                placeholder="Bathrooms"
                id="bathrooms"
                min="1"
                value={formData.bathrooms}
                onChange={handleChange}
                className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Regular Price"
                id="regularPrice"
                required
                value={formData.regularPrice}
                onChange={handleChange}
                className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
              />

              <input
                type="number"
                placeholder="Discount Price"
                id="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/35 px-5 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-yellow-500 dark:focus:border-yellow-400 transition-colors duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                "sale",
                "rent",
                "parking",
                "furnished",
                "offer",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id={item}
                    checked={
                      item === "sale" || item === "rent"
                        ? formData.type === item
                        : formData[item]
                    }
                    onChange={handleChange}
                    className="w-5 h-5 accent-yellow-500 dark:accent-yellow-400 rounded transition-colors duration-300"
                  />
                  <span className="capitalize text-zinc-700 dark:text-zinc-300 font-medium transition-colors duration-300">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-white/15 bg-zinc-50/50 dark:bg-black/30 p-6 transition-colors duration-300">
              <h2 className="mb-6 text-3xl font-black">
                Upload Images
              </h2>

              <div className="flex gap-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setFiles(Array.from(e.target.files))
                  }
                  className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 transition-colors duration-300 text-zinc-500 dark:text-zinc-400 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-700 dark:file:text-zinc-300 hover:file:bg-zinc-200 dark:hover:file:bg-zinc-700"
                />

                <button
                  type="button"
                  onClick={handleImageSubmit}
                  disabled={uploading}
                  className="rounded-xl bg-yellow-500 px-6 font-black text-black hover:bg-yellow-400 active:scale-95 transition-all duration-150 disabled:opacity-50"
                >
                  {uploading ? "..." : "Upload"}
                </button>
              </div>

              {imageUploadError && (
                <p className="text-red-500 dark:text-red-400 mt-3 font-medium">
                  {imageUploadError}
                </p>
              )}

              {/* SHOW ONLY AFTER UPLOAD */}
              {formData.imageUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt="listing"
                        className="h-40 w-full rounded-xl object-cover shadow-sm border border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute right-2 top-2 rounded-lg bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600 shadow-md transition-colors duration-150"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              disabled={loading || uploading}
              className="mt-8 w-full rounded-xl bg-yellow-500 py-5 text-xl font-black text-black hover:bg-yellow-400 active:scale-[0.99] transition-all duration-150 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-500 dark:text-red-400 font-medium transition-colors duration-300">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListing;