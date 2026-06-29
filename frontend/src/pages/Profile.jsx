import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

import axios from "axios";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import RecentlyViewed from "../components/RecentlyViewed";

const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const fileRef = useRef(null);

  const { currentUser, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [showFavoritesError, setShowFavoritesError] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const userId =
    currentUser?._id ||
    currentUser?.id ||
    currentUser?.user?._id;

  /* IMAGE UPLOAD */
  const handleFileUpload = async (file) => {
    try {
      setFileUploadError(false);
      setFilePerc(20);

      const imageData = new FormData();
      imageData.append("image", file);

      const res = await axios.post(
        `${API_URL}/post`,
        imageData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setFilePerc(100);

      setFormData((prev) => ({
        ...prev,
        avatar: res.data.imageUrl,
      }));
    } catch (error) {
      setFileUploadError(true);
      setFilePerc(0);
      console.log(error);
    }
  };

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.value,
    });
  };

  /* UPDATE USER */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(
        `${API_URL}/api/user/update/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(
          updateUserFailure(
            data.message
          )
        );
        return;
      }

      dispatch(
        updateUserSuccess(data)
      );

      setUpdateSuccess(true);
    } catch (error) {
      dispatch(
        updateUserFailure(
          error.message
        )
      );
    }
  };

  /* DELETE USER */
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `${API_URL}/api/user/delete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(
          deleteUserFailure(
            data.message
          )
        );
        return;
      }

      dispatch(
        deleteUserSuccess(data)
      );
    } catch (error) {
      dispatch(
        deleteUserFailure(
          error.message
        )
      );
    }
  };

  /* SIGN OUT */
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch(
        `${API_URL}/api/auth/signout`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(
          signOutUserFailure(
            data.message
          )
        );
        return;
      }

      dispatch(
        signOutUserSuccess(data)
      );
    } catch (error) {
      dispatch(
        signOutUserFailure(
          error.message
        )
      );
    }
  };

  /* SHOW LISTINGS */
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);

      const res = await fetch(
        `${API_URL}/api/user/listings/${userId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch {
      setShowListingsError(true);
    }
  };

  /* DELETE LISTING */
  const handleListingDelete = async (
    listingId
  ) => {
    try {
      const res = await fetch(
        `${API_URL}/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false)
        return;

      setUserListings((prev) =>
        prev.filter(
          (listing) =>
            listing._id !==
            listingId
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  /* SHOW FAVORITES */
  const handleShowFavorites = async () => {
    try {
      setFavoritesLoading(true);
      setShowFavoritesError(false);

      const res = await fetch(
        `${API_URL}/api/user/favorites`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        setShowFavoritesError(true);
        return;
      }

      setFavoriteListings(
        Array.isArray(data)
          ? data
          : []
      );
    } catch {
      setShowFavoritesError(true);
    } finally {
      setFavoritesLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black px-4 pb-12 pt-32 text-white">

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8 md:p-10">

        {/* HEADING */}
        <h1 className="mb-10 text-center font-serif text-3xl font-black sm:text-5xl">
          My Profile
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <input
            onChange={(e) =>
              handleFileUpload(
                e.target.files[0]
              )
            }
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <img
              onClick={() =>
                fileRef.current.click()
              }
              src={
                formData.avatar ||
                currentUser?.avatar ||
                "/profile.png"
              }
              alt="profile"
              className="h-32 w-32 cursor-pointer rounded-full border-4 border-yellow-400 object-cover shadow-[0_18px_45px_rgba(234,179,8,0.18)] transition duration-300 hover:scale-105 sm:h-36 sm:w-36"
            />
          </div>

          {/* IMAGE STATUS */}
          <p className="text-center text-sm break-words">
            {fileUploadError ? (
              <span className="text-red-500">
                Error uploading image
              </span>
            ) : filePerc > 0 &&
              filePerc < 100 ? (
              <span className="text-yellow-400">
                Uploading {filePerc}%
              </span>
            ) : filePerc === 100 ? (
              <span className="text-green-500">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>

          {/* INPUTS */}
          <input
            type="text"
            placeholder="Username"
            defaultValue={
              currentUser?.username
            }
            id="username"
            className="w-full rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={
              currentUser?.email
            }
            className="w-full rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="New Password"
            id="password"
            className="w-full rounded-xl border border-white/10 bg-black/35 p-4 outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
            onChange={handleChange}
          />

          {/* UPDATE BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 p-4 font-black uppercase tracking-wider text-black transition-all duration-300 hover:bg-yellow-400"
          >
            {loading
              ? "Loading..."
              : "Update Profile"}
          </button>

          {/* CREATE LISTING */}
          <Link to={"/create-listing"}>
            <button
              type="button"
              className="w-full rounded-xl bg-emerald-600 p-4 font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-emerald-500"
            >
              Create Listing
            </button>
          </Link>
        </form>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-sm">
          <span
            onClick={handleDeleteUser}
            className="text-red-500 cursor-pointer hover:underline"
          >
            Delete Account
          </span>

          <span
            onClick={handleSignOut}
            className="text-red-400 cursor-pointer hover:underline"
          >
            Sign Out
          </span>
        </div>

        {/* SUCCESS */}
        {updateSuccess && (
          <p className="text-green-500 mt-5 text-center break-words">
            Profile updated successfully!
          </p>
        )}

        {/* BUTTONS */}
        <button
          onClick={handleShowListings}
          className="mt-8 w-full rounded-xl bg-blue-600 p-4 font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-500"
        >
          Show Listings
        </button>

        <button
          onClick={handleShowFavorites}
          className="mt-4 w-full rounded-xl bg-pink-600 p-4 font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-pink-500"
        >
          {favoritesLoading
            ? "Loading Favorites..."
            : "My Favorites"}
        </button>

        {/* ERRORS */}
        {showListingsError && (
          <p className="text-red-500 mt-4 text-center">
            Error showing listings
          </p>
        )}

        {showFavoritesError && (
          <p className="text-red-500 mt-4 text-center">
            Error showing favorites
          </p>
        )}

        {/* RECENTLY VIEWED */}
        <RecentlyViewed
          title="Recently Viewed"
          description="Properties you checked recently"
          className="mt-10"
          gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
        />

        {/* FAVORITES */}
        {favoriteListings &&
          favoriteListings.length >
            0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-black text-center mb-6 break-words">
                My Favorites
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteListings.map(
                  (listing) => (
                    <ListingItem
                      key={listing._id}
                      listing={listing}
                      onFavoriteChange={(
                        data
                      ) => {
                        if (
                          data.isFavorite
                        )
                          return;

                        setFavoriteListings(
                          (prev) =>
                            prev.filter(
                              (fav) =>
                                fav._id !==
                                listing._id
                            )
                        );
                      }}
                    />
                  )
                )}
              </div>
            </div>
          )}

        {/* USER LISTINGS */}
        {userListings &&
          userListings.length >
            0 && (
            <div className="mt-10 flex flex-col gap-5">

              <h2 className="text-3xl font-black text-center break-words">
                Your Listings
              </h2>

              {userListings.map(
                (listing) => (
                  <div
                    key={
                      listing._id
                    }
                    className="flex w-full flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-4 transition-all hover:border-yellow-400 sm:flex-row sm:items-center sm:justify-between"
                  >

                    {/* LEFT */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full overflow-hidden">

                      {/* IMAGE */}
                      <Link
                        to={`/listing/${listing._id}`}
                        className="w-full sm:w-auto shrink-0"
                      >
                        <img
                          src={
                            listing
                              ?.imageUrls?.[0]
                          }
                          alt="listing"
                          className="h-40 w-full rounded-xl object-cover sm:h-24 sm:w-24"
                        />
                      </Link>

                      {/* TITLE */}
                      <Link
                        to={`/listing/${listing._id}`}
                        className="flex-1 w-full overflow-hidden text-center sm:text-left"
                      >
                        <p className="text-lg sm:text-xl font-bold hover:text-yellow-400 transition-all break-words leading-relaxed">
                          {
                            listing.name
                          }
                        </p>
                      </Link>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col gap-3 w-full sm:w-auto">

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleListingDelete(
                            listing._id
                          )
                        }
                        className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-bold uppercase transition-all duration-300 hover:bg-red-500 sm:min-w-[120px]"
                      >
                        Delete
                      </button>

                      {/* EDIT */}
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="w-full"
                      >
                        <button className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-bold uppercase transition-all duration-300 hover:bg-green-500 sm:min-w-[120px]">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}
