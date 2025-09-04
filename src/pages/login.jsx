import React, { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const API_URL = "https://rbfbackend-c00fb.sevalla.app/admin"; // Backend admin URL

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      // Store JWT token in localStorage (or sessionStorage if not "remember me")
      if (remember) {
        localStorage.setItem("adminToken", res.data.token);
      } else {
        sessionStorage.setItem("adminToken", res.data.token);
      }

      // Navigate to admin dashboard
      navigate("/admin/home");
    } catch (err) {
      if (err.response) {
        setServerError(err.response.data.message || err.response.data.error);
      } else {
        setServerError("Server not reachable. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-sky-400 mb-6 text-center">Admin Login</h2>
        {serverError && <p className="text-red-500 mb-4 text-center">{serverError}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className={`w-full p-3 rounded-xl bg-gray-700 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500`}
            />
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-300 font-semibold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full p-3 rounded-xl bg-gray-700 border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 pr-12`}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-sky-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500"
              />
              Remember Me
            </label>
            <a href="#" className="text-sm text-sky-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading && <Loader className="animate-spin" size={20} />}
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          © 2025 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
