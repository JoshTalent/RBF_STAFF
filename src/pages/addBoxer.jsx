import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import axios from "axios";

const AddBoxer = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
    wins: "",
    losses: "",
    draws: "",
    kaos: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  const API_URL = "https://rbfbackend-c00fb.sevalla.app/boxers"; // backend route

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removePhoto = () => setFormData({ ...formData, photo: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("winningMatches", formData.wins || 0);
      data.append("lostMatches", formData.losses || 0);
      data.append("draw", formData.draws || 0);
      data.append("kaos", formData.kaos || "");
      data.append("instagram", formData.instagram || "");
      data.append("facebook", formData.facebook || "");
      data.append("twitter", formData.twitter || "");
      if (formData.photo) data.append("photo", formData.photo);

      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Boxer added successfully! 🥊");
      console.log("Created Boxer:", res.data.boxer);

      setFormData({
        name: "",
        description: "",
        photo: null,
        wins: "",
        losses: "",
        draws: "",
        kaos: "",
        instagram: "",
        facebook: "",
        twitter: "",
      });
    } catch (error) {
      console.error("Error adding boxer:", error);
      alert("Failed to add boxer.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <h2 className="text-4xl font-extrabold mb-8 text-sky-400">
            Add New Boxer
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* Boxer Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                Boxer Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter boxer's name..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Write a brief description..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              ></textarea>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                Upload Photo
              </label>
              <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 transition-all">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-gray-400 text-center">
                  Drag & drop a photo or click to select
                </p>
                <p className="text-gray-500 text-sm mt-2">Supported: JPG, PNG</p>
              </div>
              {formData.photo && (
                <div className="relative mt-4">
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="preview"
                    className="w-full md:w-64 rounded-2xl border border-gray-600 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Winning Matches
                </label>
                <input
                  type="number"
                  name="wins"
                  value={formData.wins}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Lost Matches
                </label>
                <input
                  type="number"
                  name="losses"
                  value={formData.losses}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Draw
                </label>
                <input
                  type="number"
                  name="draws"
                  value={formData.draws}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-300">
                  Kaos
                </label>
                <input
                  type="text"
                  name="kaos"
                  value={formData.kaos}
                  onChange={handleChange}
                  placeholder="Weight class / Kaos..."
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="url" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram URL" className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner" />
              <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook URL" className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner" />
              <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter URL" className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner" />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Add Boxer
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddBoxer;
