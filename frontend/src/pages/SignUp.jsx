import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import OAuth from "../components/OAuth";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { validateEmail, validatePassword, validateUsername } from "../utils/formValidation";
import { FaCheck, FaTimes } from "react-icons/fa";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Real-time validation
    if (id === "password" && value) {
      const passwordError = validatePassword(value);
      if (passwordError) {
        setErrors({ ...errors, password: passwordError });
      } else {
        const newErrors = { ...errors };
        delete newErrors.password;
        setErrors(newErrors);
      }
    }

    if (id === "email" && value) {
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: "Please provide a valid email" });
      } else {
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }
    }

    if (id === "username" && value) {
      const usernameError = validateUsername(value);
      if (usernameError) {
        setErrors({ ...errors, username: usernameError });
      } else {
        const newErrors = { ...errors };
        delete newErrors.username;
        setErrors(newErrors);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username || formData.username.trim() === "") {
      newErrors.username = "Username is required";
    } else {
      const usernameError = validateUsername(formData.username);
      if (usernameError) newErrors.username = usernameError;
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please provide a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showErrorToast("Please fix all errors before signing up");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        showErrorToast(data.message);
        return;
      }

      setLoading(false);
      showSuccessToast("Account created successfully!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message || "Something went wrong!");
    }
  };

  const getPasswordRequirements = () => {
    const password = formData.password || "";
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*#?&]/.test(password),
    };
  };

  const requirements = getPasswordRequirements();
  const isPasswordFocused = formData.password && formData.password.length > 0;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 pb-10 pt-32 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-yellow-500 text-xs font-semibold mb-4">
            Get Started
          </p>

          <h1 className="mb-3 font-serif text-5xl font-black">
            Create <span className="text-yellow-500">Account</span>
          </h1>

          <p className="text-zinc-500">Join RoyalEstate today</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username (3-30 characters)"
              id="username"
              value={formData.username || ""}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 ${
                errors.username ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-2">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 ${
                errors.email ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password (strong password required)"
              id="password"
              value={formData.password || ""}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-black/35 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 ${
                errors.password ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-2">{errors.password}</p>
            )}

            {/* Password Requirements Checklist */}
            {isPasswordFocused && (
              <div className="mt-3 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <p className="text-xs font-semibold text-zinc-400 mb-2">
                  Password must contain:
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    {requirements.minLength ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span className={requirements.minLength ? "text-green-400" : "text-zinc-500"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {requirements.hasUppercase ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span className={requirements.hasUppercase ? "text-green-400" : "text-zinc-500"}>
                      One uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {requirements.hasLowercase ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span className={requirements.hasLowercase ? "text-green-400" : "text-zinc-500"}>
                      One lowercase letter (a-z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {requirements.hasNumber ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span className={requirements.hasNumber ? "text-green-400" : "text-zinc-500"}>
                      One number (0-9)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {requirements.hasSpecial ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                    <span className={requirements.hasSpecial ? "text-green-400" : "text-zinc-500"}>
                      One special character (@$!%*#?&)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            disabled={loading || Object.keys(errors).length > 0}
            className="rounded-xl bg-yellow-500 p-4 font-bold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-zinc-800"></div>

            <span className="text-zinc-500 text-xs uppercase tracking-widest">
              OR
            </span>

            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          <OAuth />
        </form>

        <div className="flex justify-center gap-2 mt-8 text-sm">
          <span className="text-zinc-500">Already have an account?</span>

          <Link
            to="/sign-in"
            className="text-yellow-500 hover:text-yellow-400 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

  