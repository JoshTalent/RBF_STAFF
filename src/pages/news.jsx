import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Trash2, Edit, X, ArrowLeft } from "lucide-react";
import axios from "axios";

const ManageNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  const API_URL = "https://rbfbackend-c00fb.sevalla.app/news";

  // Fetch all news
  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL);
      setNewsList(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Failed to fetch news.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Delete news
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setNewsList(newsList.filter((item) => item._id !== id));
      alert("News deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete news.");
    }
  };

  // Open edit modal
  const handleEdit = (item) => setEditingNews({ ...item });

  // Close modal
  const closeModal = () => setEditingNews(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setEditingNews({ ...editingNews, [name]: files[0] });
    } else {
      setEditingNews({ ...editingNews, [name]: value });
    }
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editingNews.title);
      formData.append("description", editingNews.description);
      formData.append("date", editingNews.date);
      if (editingNews.video instanceof File) {
        formData.append("video", editingNews.video);
      }

      const res = await axios.put(
        `${API_URL}/update/${editingNews._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setNewsList((prev) =>
        prev.map((item) =>
          item._id === editingNews._id ? res.data.news : item
        )
      );
      setEditingNews(null);
      alert("News updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update news.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24 mt-20">
        <h2 className="text-4xl font-extrabold mb-8 text-sky-400">
          Manage News
        </h2>

        {/* Back */}
        <div className="mb-6">
          <Link
            to="/admin/home"
            className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
            Back
          </Link>
        </div>

        {newsList.length === 0 ? (
          <p className="text-gray-400 text-lg">No news available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {item.video && (
                  <video
                    src={`https://rbfbackend-c00fb.sevalla.app${item.video}`}
                    controls
                    className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
                  />
                )}
                <h3 className="text-2xl font-bold mb-2 text-sky-400">{item.title}</h3>
                <p className="text-gray-300 mb-2">{item.description}</p>
                <p className="text-gray-400 text-sm mb-4">{new Date(item.date).toLocaleDateString()}</p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingNews && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-3xl font-bold mb-6 text-sky-400">Update News</h3>

              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingNews.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={editingNews.description}
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
                    value={editingNews.date.split("T")[0]} // format for input type date
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Update Video</label>
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

                {editingNews.video && (
                  <video
                    src={editingNews.video instanceof File ? URL.createObjectURL(editingNews.video) : `http://localhost:4000${editingNews.video}`}
                    controls
                    className="w-full md:w-96 rounded-2xl border border-gray-600 shadow-lg mt-4"
                  />
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 mt-4"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageNews;
