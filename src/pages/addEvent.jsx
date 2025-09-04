import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://rbfbackend-c00fb.sevalla.app/events",
        formData
      );

      setSuccessMessage("Event added successfully! 🎉");
      window.location.href = "/admin/events"
      setFormData({ title: "", location: "", date: "", description: "" });
      console.log("Server response:", response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Something went wrong. ❌"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300">
          {/* Back to Home */}
          <div className="mb-6">
            <Link
              to="/admin/home"
              className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
              Back to Home
            </Link>
          </div>

          <h2 className="text-4xl font-extrabold mb-4 text-sky-400">
            Add New Event
          </h2>

          {/* Success/Error messages */}
          {successMessage && (
            <p className="mb-4 p-3 bg-green-600 text-white rounded">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mb-4 p-3 bg-red-600 text-white rounded">{errorMessage}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter event title..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter event location..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Write a brief description..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800"
              }`}
            >
              {loading ? "Adding Event..." : "Create Event"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEvent;
