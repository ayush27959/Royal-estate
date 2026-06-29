import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

import { app } from "../firebase.js";

import { useDispatch } from "react-redux";

import { signInSuccess } from "../redux/user/userSlice.js";

import { useNavigate } from "react-router-dom";

const OAuth = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const handleGoogleClick =
    async () => {

      try {

        const provider =
          new GoogleAuthProvider();

        const auth =
          getAuth(app);

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const res =
          await fetch(

            `${import.meta.env.VITE_API_URL}/api/auth/google`,

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

                  name:
                    result.user
                      .displayName,

                  email:
                    result.user
                      .email,

                  photo:
                    result.user
                      .photoURL,

                }),

            }

          );

        const data =
          await res.json();

        dispatch(
          signInSuccess(data)
        );

        navigate("/");

      } catch (error) {

        console.log(
          "Google sign in failed",
          error
        );

      }

    };

  return (

    <button

      onClick={
        handleGoogleClick
      }

      type="button"

      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4 font-semibold uppercase tracking-wider text-white transition duration-300 hover:border-yellow-500/50 hover:bg-zinc-900"

    >

      <svg

        className="w-5 h-5"

        viewBox="0 0 48 48"

        xmlns="http://www.w3.org/2000/svg"

      >

        <path
          fill="#EA4335"
          d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.46 3.05 29.53 1 24 1 14.82 1 7.07 6.48 3.64 14.24l7.1 5.52C12.4 13.67 17.73 9.5 24 9.5z"
        />

        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.58C43.43 37.27 46.5 31.32 46.5 24.5z"
        />

        <path
          fill="#FBBC05"
          d="M10.74 28.24A14.54 14.54 0 0 1 9.5 24c0-1.47.25-2.89.7-4.22l-7.1-5.52A23.94 23.94 0 0 0 .5 24c0 3.87.92 7.53 2.56 10.76l7.68-6.52z"
        />

        <path
          fill="#34A853"
          d="M24 47c5.53 0 10.17-1.83 13.56-4.97l-7.18-5.58c-1.88 1.27-4.3 2.05-6.38 2.05-6.27 0-11.6-4.17-13.26-9.76l-7.68 6.52C7.07 41.52 14.82 47 24 47z"
        />

      </svg>

      Continue with Google

    </button>

  );

};

export default OAuth;
