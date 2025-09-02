import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft, X, UploadCloud } from "lucide-react";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const API_URL = "http://localhost:4000/post/";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created successfully! 🚀");
      console.log("Created Post:", res.data);

      // Reset form
      setFormData({ title: "", description: "", image: null });
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Check console for details.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <h2 className="text-4xl font-extrabold mb-6 text-sky-400">
            Create New Post
          </h2>

          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
                Back to Home
              </Link>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter post title..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-inner"
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
                rows="6"
                required
                placeholder="Write a brief description..."
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-inner"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                Upload Image
              </label>
              <div className="relative">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-sky-500 hover:bg-gray-700 transition-all bg-gray-800 text-gray-400 text-center p-4"
                >
                  {formData.image ? (
                    <span className="text-gray-200">{formData.image.name}</span>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 mb-2 text-sky-400" />
                      Drag & drop an image here, or click to select
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
                {formData.image && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-500 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Create Post
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPost;
