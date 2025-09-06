import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Trash2, Edit, X, ArrowLeft } from "lucide-react";
import axios from "axios";

const ManageMatches = () => {
  const [matches, setMatches] = useState([]);
  const [editingMatch, setEditingMatch] = useState(null);

  // Base API URL
  const API_URL = "https://rbfbackend-c00fb.sevalla.app/matches";
  const BACKEND_URL = "https://rbfbackend-c00fb.sevalla.app"; // for serving videos

  // Fetch all matches from backend
  const fetchMatches = async () => {
    try {
      const res = await axios.get(API_URL);
      setMatches(res.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
      alert("Failed to fetch matches.");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Delete match
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setMatches(matches.filter((match) => match._id !== id));
      alert("Match deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete match.");
    }
  };

  // Open edit modal
  const handleEdit = (match) => setEditingMatch({ ...match });

  // Close modal
  const closeModal = () => setEditingMatch(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setEditingMatch({ ...editingMatch, [name]: files[0] });
    } else {
      setEditingMatch({ ...editingMatch, [name]: value });
    }
  };

  // Submit updated match
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editingMatch.title);
      formData.append("description", editingMatch.description);
      if (editingMatch.video instanceof File) {
        formData.append("video", editingMatch.video);
      }

      const res = await axios.put(
        `${API_URL}/update/${editingMatch._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMatches((prev) =>
        prev.map((match) =>
          match._id === editingMatch._id ? res.data.match : match
        )
      );
      setEditingMatch(null);
      alert("Match updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update match.");
    }
  };

  // Helper to get full video URL
  const getVideoURL = (video) => {
    if (!video) return null;
    if (video instanceof File) return URL.createObjectURL(video); // preview during edit
    return `${BACKEND_URL}${video}`; // prepend backend URL for actual matches
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24 mt-20">
        <h2 className="text-4xl font-extrabold mb-8 text-sky-400">
          Manage Matches
        </h2>

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

        {matches.length === 0 ? (
          <p className="text-gray-400 text-lg">No matches available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match) => (
              <div
                key={match._id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {match.video && (
                  <video
                    src={getVideoURL(match.video)}
                    controls
                    className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
                  />
                )}
                <h3 className="text-2xl font-bold mb-2 text-sky-400">
                  {match.title}
                </h3>
                <p className="text-gray-300 mb-4">{match.description}</p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(match)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(match._id)}
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
        {editingMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-3xl font-bold mb-6 text-sky-400">
                Update Match
              </h3>

              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingMatch.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editingMatch.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-300">
                    Update Video
                  </label>
                  <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 transition-all">
                    <input
                      type="file"
                      name="video"
                      accept="video/*"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <p className="text-gray-400 text-center">
                      Drag & drop a video or click to select
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Supported: MP4, MOV, AVI
                    </p>
                  </div>
                </div>

                {editingMatch.video && (
                  <video
                    src={getVideoURL(editingMatch.video)}
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

export default ManageMatches;
