import {
  useEffect,
  useState,
} from "react";

const API_URL =
  import.meta.env
    .VITE_API_URL;

import axios from "axios";

import {
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const UpdateListing = () => {

  const { listingId } =
    useParams();

  const navigate =
    useNavigate();

  const { currentUser } =
    useSelector(
      (state) => state.user
    );

  const [
    files,
    setFiles,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    imageUploadError,
    setImageUploadError,
  ] = useState("");

  const [
    formData,
    setFormData,
  ] = useState({

    imageUrls: [],

    name: "",

    description: "",

    address: "",

    type: "rent",

    bedrooms: 1,

    bathrooms: 1,

    regularPrice: 0,

    discountPrice: 0,

    offer: false,

    parking: false,

    furnished: false,

  });

  useEffect(() => {

    const fetchListing =
      async () => {

        try {

          const res =
            await fetch(

              `${API_URL}/api/listing/get/${listingId}`

            );

          const data =
            await res.json();

          if (
            data.success ===
            false
          ) {

            setError(
              data.message
            );

            return;

          }

          setFormData(
            data
          );

        } catch {

          setError(
            "Failed to fetch listing"
          );

        }

      };

    if (
      listingId
    ) {

      fetchListing();

    }

  }, [listingId]);

  const handleChange = (
    e
  ) => {

    if (

      [
        "sale",
        "rent",
      ].includes(
        e.target.id
      )

    ) {

      return setFormData(
        (prev) => ({

          ...prev,

          type:
            e.target.id,

        })
      );

    }

    if (

      [
        "parking",
        "furnished",
        "offer",
      ].includes(
        e.target.id
      )

    ) {

      return setFormData(
        (prev) => ({

          ...prev,

          [e.target.id]:
            e.target.checked,

        })
      );

    }

    setFormData(
      (prev) => ({

        ...prev,

        [e.target.id]:

          e.target.type ===
          "number"

            ? Number(
                e.target.value
              )

            : e.target.value,

      })
    );

  };

  const handleImageSubmit =
    async () => {

      if (
        files.length ===
        0
      ) {

        return setImageUploadError(
          "Select images first"
        );

      }

      if (

        files.length +
          formData.imageUrls
            .length >
        6

      ) {

        return setImageUploadError(
          "Maximum 6 images allowed"
        );

      }

      try {

        setUploading(
          true
        );

        setImageUploadError(
          ""
        );

        const urls =
          [];

        for (
          let i = 0;
          i < files.length;
          i++
        ) {

          const imageData =
            new FormData();

          imageData.append(
            "image",
            files[i]
          );

          const res =
            await axios.post(

              `${API_URL}/post`,

              imageData,

              {

                headers: {

                  "Content-Type":
                    "multipart/form-data",

                },

              }

            );

          urls.push(
            res.data.imageUrl
          );

        }

        setFormData(
          (prev) => ({

            ...prev,

            imageUrls: [

              ...prev.imageUrls,

              ...urls,

            ],

          })
        );

        setUploading(
          false
        );

      } catch {

        setUploading(
          false
        );

        setImageUploadError(
          "Image upload failed"
        );

      }

    };

  const handleRemoveImage =
    (index) => {

      setFormData(
        (prev) => ({

          ...prev,

          imageUrls:
            prev.imageUrls.filter(

              (_, i) =>
                i !== index

            ),

        })
      );

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (

        formData.imageUrls
          .length < 1

      ) {

        return setError(
          "Upload at least one image"
        );

      }

      if (

        formData.offer &&

        formData.discountPrice >=
          formData.regularPrice

      ) {

        return setError(

          "Discount price must be less than regular price"

        );

      }

      try {

        setLoading(
          true
        );

        setError("");

        const res =
          await fetch(

            `${API_URL}/api/listing/update/${listingId}`,

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              credentials:
                "include",

              body:
                JSON.stringify({

                  ...formData,

                  userRef:
                    currentUser.id,

                }),

            }

          );

        const data =
          await res.json();

        setLoading(
          false
        );

        if (
          data.success ===
          false
        ) {

          return setError(
            data.message
          );

        }

        navigate(
          `/listing/${data._id}`
        );

      } catch {

        setLoading(
          false
        );

        setError(
          "Something went wrong"
        );

      }

    };

  return (

    <main className="min-h-screen bg-black px-4 pb-12 pt-32 text-white">

      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-10">

        <div className="mb-10 text-center">

          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">

            Edit Property

          </p>

          <h1 className="mb-3 font-serif text-5xl font-black">

            Update{" "}

            <span className="text-yellow-500">

              Listing

            </span>

          </h1>

          <p className="text-zinc-500">

            Update your property information

          </p>

        </div>

        <form

          onSubmit={
            handleSubmit
          }

          className="grid lg:grid-cols-2 gap-10"

        >

          <div className="flex flex-col gap-5">

            <input
              type="text"
              id="name"
              placeholder="Property Name"
              required
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
            />

            <textarea
              id="description"
              placeholder="Description"
              required
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="min-h-[140px] rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
            />

            <input
              type="text"
              id="address"
              placeholder="Address"
              required
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              className="rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                id="bedrooms"
                placeholder="Bedrooms"
                value={
                  formData.bedrooms
                }
                onChange={
                  handleChange
                }
                className="rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
              />

              <input
                type="number"
                id="bathrooms"
                placeholder="Bathrooms"
                value={
                  formData.bathrooms
                }
                onChange={
                  handleChange
                }
                className="rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                id="regularPrice"
                placeholder="Regular Price"
                value={
                  formData.regularPrice
                }
                onChange={
                  handleChange
                }
                className="rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
              />

              {formData.offer && (

                <input
                  type="number"
                  id="discountPrice"
                  placeholder="Discount Price"
                  value={
                    formData.discountPrice
                  }
                  onChange={
                    handleChange
                  }
                  className="rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"
                />

              )}

            </div>

          </div>

          <div className="flex flex-col gap-6">

            <div className="flex gap-4">

              {[
                "sale",
                "rent",
              ].map((type) => (

                <button

                  key={type}

                  type="button"

                  onClick={() =>

                    setFormData({
                      ...formData,
                      type,
                    })

                  }

                  className={`flex-1 rounded-xl border p-4 font-semibold uppercase transition ${
                    formData.type ===
                    type

                      ? "bg-yellow-500 text-black border-yellow-500"

                      : "border-white/10 bg-black/35"

                  }`}

                >

                  {type}

                </button>

              ))}

            </div>

            <div className="flex flex-wrap gap-4">

              {[
                "offer",
                "parking",
                "furnished",
              ].map((item) => (

                <label

                  key={item}

                  className={`cursor-pointer rounded-xl border px-5 py-3 capitalize transition ${
                    formData[item]

                      ? "bg-yellow-500 text-black border-yellow-500"

                      : "border-white/10 bg-black/35"

                  }`}

                >

                  <input
                    type="checkbox"
                    id={item}
                    checked={
                      formData[item]
                    }
                    onChange={
                      handleChange
                    }
                    className="hidden"
                  />

                  {item}

                </label>

              ))}

            </div>

            <div className="rounded-2xl border border-dashed border-white/15 bg-black/30 p-8 text-center">

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>

                  setFiles(
                    Array.from(
                      e.target.files
                    )
                  )

                }

                className="w-full"

              />

              <p className="text-zinc-500 mt-4">

                Upload up to 6 images

              </p>

            </div>

            <button

              type="button"

              onClick={
                handleImageSubmit
              }

              disabled={
                uploading
              }

              className="rounded-xl bg-blue-600 p-4 font-bold transition hover:bg-blue-500"

            >

              {uploading

                ? "Uploading..."

                : "Upload Images"}

            </button>

            <div className="flex flex-col gap-4">

              {formData.imageUrls?.map(

                (
                  url,
                  index
                ) => (

                  <div

                    key={index}

                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 p-4"

                  >

                    <img
                      src={url}
                      alt="listing"
                      className="h-24 w-24 rounded-xl object-cover"
                    />

                    <button

                      type="button"

                      onClick={() =>

                        handleRemoveImage(
                          index
                        )

                      }

                      className="rounded-xl bg-red-600 px-4 py-2 transition hover:bg-red-500"

                    >

                      Remove

                    </button>

                  </div>

                )

              )}

            </div>

            {imageUploadError && (

              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">

                {
                  imageUploadError
                }

              </div>

            )}

            {error && (

              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">

                {error}

              </div>

            )}

            <button

              disabled={
                loading ||
                uploading
              }

              className="rounded-xl bg-yellow-500 p-5 font-bold uppercase tracking-[0.2em] text-black transition hover:bg-yellow-400"

            >

              {loading

                ? "Updating..."

                : "Update Listing"}

            </button>

          </div>

        </form>

      </div>

    </main>

  );

};

export default UpdateListing;
