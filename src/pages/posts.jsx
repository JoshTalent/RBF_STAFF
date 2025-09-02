import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Trash2, Edit, X, ArrowLeft } from "lucide-react";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const API_URL = "http://localhost:4000/post";
  const IMAGE_BASE_URL = "http://localhost:4000"; // Use only the server base

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
      alert("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Post deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  // Open edit modal
  const handleEdit = (post) => setEditingPost({ ...post });

  // Close modal
  const closeModal = () => setEditingPost(null);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEditingPost((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit updated post
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editingPost.title);
      formData.append("description", editingPost.description);
      if (editingPost.image instanceof File) {
        formData.append("image", editingPost.image);
      }

      const res = await axios.put(`${API_URL}/${editingPost._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPosts((prev) =>
        prev.map((p) => (p._id === editingPost._id ? res.data.post : p))
      );
      setEditingPost(null);
      alert("✅ Post updated successfully!");
    } catch (err) {
      console.error("❌ Error updating post:", err);
      alert("Failed to update post.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 md:px-16 lg:px-24 mt-20">
        <h2 className="text-4xl font-extrabold mb-4 text-sky-400">Manage Posts</h2>

        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
            Back to Home
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-lg">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {post.image && (
                  <img
                    src={`${IMAGE_BASE_URL}${post.image}`}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
                  />
                )}
                <h3 className="text-2xl font-bold mb-2 text-sky-400">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.description}</p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
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
        {editingPost && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-3xl font-bold mb-6 text-sky-400">Update Post</h3>

              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingPost.title}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={editingPost.description}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Update Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-gray-300"
                  />
                </div>

                {editingPost.image && (
                  <img
                    src={
                      editingPost.image instanceof File
                        ? URL.createObjectURL(editingPost.image)
                        : `${IMAGE_BASE_URL}${editingPost.image}`
                    }
                    alt="preview"
                    className="w-full md:w-64 rounded-2xl border border-gray-600 shadow-lg mt-4"
                  />
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 rounded-2xl text-white font-bold text-lg shadow-lg transition-all mt-4"
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

export default ManagePosts;
