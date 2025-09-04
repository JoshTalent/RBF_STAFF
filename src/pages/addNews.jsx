import { useState } from "react";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNews = () => {
  const [news, setNews] = useState({
    title: "",
    description: "",
    date: "",
    video: null,
  });

  const navigate = useNavigate();

  // Base API URL
  const API_URL = "https://rbfbackend-c00fb.sevalla.app/news";

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setNews({ ...news, [name]: files[0] }); // store video as File
    } else {
      setNews({ ...news, [name]: value });
    }
  };

  // Submit news
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", news.title);
      formData.append("description", news.description);
      formData.append("date", news.date);
      if (news.video) formData.append("video", news.video);

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("News uploaded successfully! 🚀");
      navigate("/"); // redirect to home or news list
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload news.");
    }
  };

  // Video preview URL
  const videoPreview = news.video instanceof File ? URL.createObjectURL(news.video) : null;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24 mt-20">
        <h2 className="text-4xl font-extrabold mb-8 text-sky-400">
          Create News
        </h2>

        {/* Back */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
            Back
          </Link>
        </div>

        <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={news.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-300">Description</label>
            <textarea
              name="description"
              value={news.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              value={news.date}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

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
          </div>

          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="w-full md:w-96 rounded-2xl border border-gray-600 shadow-lg mt-4"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 mt-4"
          >
            Upload News
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateNews;
