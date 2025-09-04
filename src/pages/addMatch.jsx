import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

const AddMatch = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  const API_URL = "https://rbfbackend-c00fb.sevalla.app/matches/create"; // your backend route

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeVideo = () => {
    setFormData({ ...formData, video: null });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.video) data.append("video", formData.video);

      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Match added successfully!");
      console.log("Created match:", res.data.match);

      // Reset form
      setFormData({ title: "", description: "", video: null });
    } catch (err) {
      console.error("❌ Error adding match:", err);
      alert("Failed to add match.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <h2 className="text-4xl font-extrabold mb-6 text-sky-400">Add New Match</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-6">
              <Link
                to="/admin/home"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
                Back to Home
              </Link>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter match title..."
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
                placeholder="Write match description..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              ></textarea>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">Upload Video</label>
              <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 transition-all">
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-gray-400 text-center">Drag & drop a video or click to select</p>
                <p className="text-gray-500 text-sm mt-2">Supported: MP4, MOV, AVI</p>
              </div>
              {formData.video && (
                <div className="relative mt-4">
                  <video
                    src={URL.createObjectURL(formData.video)}
                    controls
                    className="w-full md:w-96 rounded-2xl border border-gray-600 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Create Match
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddMatch;
