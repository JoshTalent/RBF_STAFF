import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Trash2, Edit, X, ArrowLeft, Instagram, Facebook, Twitter } from "lucide-react";
import axios from "axios";

const ManageBoxers = () => {
  const [boxers, setBoxers] = useState([]);
  const [editingBoxer, setEditingBoxer] = useState(null);

  // Single variable for backend URL
  const BACKEND_URL = "https://rbfbackend-c00fb.sevalla.app/";

  // Fetch all boxers
  useEffect(() => {
    const fetchBoxers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/boxers`);
        setBoxers(res.data);
      } catch (err) {
        console.error("Error fetching boxers:", err);
      }
    };
    fetchBoxers();
  }, []);

  // Delete boxer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this boxer?")) {
      try {
        await axios.delete(`${BACKEND_URL}/boxers/${id}`);
        setBoxers(boxers.filter((b) => b._id !== id));
        alert("Boxer deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete boxer.");
      }
    }
  };

  // Open edit modal
  const handleEdit = (boxer) => setEditingBoxer({ ...boxer });

  // Close modal
  const closeModal = () => setEditingBoxer(null);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setEditingBoxer({ ...editingBoxer, [name]: files[0] });
    } else {
      setEditingBoxer({ ...editingBoxer, [name]: value });
    }
  };

  // Update boxer
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", editingBoxer.name);
      data.append("description", editingBoxer.description);
      data.append("winningMatches", editingBoxer.winningMatches || 0);
      data.append("lostMatches", editingBoxer.lostMatches || 0);
      data.append("draw", editingBoxer.draw || 0);
      data.append("kaos", editingBoxer.kaos || "");
      data.append("instagram", editingBoxer.socialMedia?.instagram || "");
      data.append("facebook", editingBoxer.socialMedia?.facebook || "");
      data.append("twitter", editingBoxer.socialMedia?.twitter || "");
      if (editingBoxer.photo instanceof File) data.append("photo", editingBoxer.photo);

      const res = await axios.put(
        `${BACKEND_URL}/boxers/update/${editingBoxer._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setBoxers((prev) =>
        prev.map((b) => (b._id === editingBoxer._id ? res.data.boxer : b))
      );
      setEditingBoxer(null);
      alert("Boxer updated successfully! 🥊");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update boxer.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
            Back to Home
          </Link>
        </div>

        <h2 className="text-4xl font-extrabold mb-8 text-sky-400">
          Manage Boxers
        </h2>

        {boxers.length === 0 ? (
          <p className="text-gray-400 text-lg">No boxers available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boxers.map((boxer) => (
              <div
                key={boxer._id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {boxer.photo && (
                  <img
                    src={`${BACKEND_URL}${boxer.photo}`}
                    alt={boxer.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
                  />
                )}
                <h3 className="text-2xl font-bold mb-2 text-sky-400">{boxer.name}</h3>
                <p className="text-gray-300 mb-4">{boxer.description}</p>
                <div className="text-gray-200 mb-2">
                  <p>Wins: {boxer.winningMatches}</p>
                  <p>Losses: {boxer.lostMatches}</p>
                  <p>Draws: {boxer.draw}</p>
                  <p>Kaos: {boxer.kaos}</p>
                </div>
                <div className="flex gap-3 mb-4">
                  {boxer.socialMedia?.instagram && (
                    <a href={boxer.socialMedia.instagram} target="_blank" rel="noreferrer">
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </a>
                  )}
                  {boxer.socialMedia?.facebook && (
                    <a href={boxer.socialMedia.facebook} target="_blank" rel="noreferrer">
                      <Facebook className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                  {boxer.socialMedia?.twitter && (
                    <a href={boxer.socialMedia.twitter} target="_blank" rel="noreferrer">
                      <Twitter className="w-5 h-5 text-sky-400" />
                    </a>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(boxer)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(boxer._id)}
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
        {editingBoxer && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-3xl font-bold mb-6 text-sky-400">
                Update Boxer
              </h3>
              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                {/* Name */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Boxer Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingBoxer.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={editingBoxer.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Photo */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">Update Photo</label>
                  <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 transition-all">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <p className="text-gray-400 text-center">Drag & drop a photo or click to select</p>
                    <p className="text-gray-500 text-sm mt-2">Supported: JPG, PNG</p>
                  </div>
                  {editingBoxer.photo && (
                    <div className="relative mt-4">
                      <img
                        src={
                          editingBoxer.photo instanceof File
                            ? URL.createObjectURL(editingBoxer.photo)
                            : `${BACKEND_URL}${editingBoxer.photo}`
                        }
                        alt="preview"
                        className="w-full md:w-64 rounded-2xl border border-gray-600 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingBoxer({ ...editingBoxer, photo: null })}
                        className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="winningMatches"
                    value={editingBoxer.winningMatches}
                    onChange={handleChange}
                    placeholder="Wins"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <input
                    type="number"
                    name="lostMatches"
                    value={editingBoxer.lostMatches}
                    onChange={handleChange}
                    placeholder="Losses"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <input
                    type="number"
                    name="draw"
                    value={editingBoxer.draw}
                    onChange={handleChange}
                    placeholder="Draws"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <input
                    type="text"
                    name="kaos"
                    value={editingBoxer.kaos}
                    onChange={handleChange}
                    placeholder="Kaos / Weight Class"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Social Media */}
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="url"
                    name="instagram"
                    value={editingBoxer.socialMedia?.instagram || ""}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <input
                    type="url"
                    name="facebook"
                    value={editingBoxer.socialMedia?.facebook || ""}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <input
                    type="url"
                    name="twitter"
                    value={editingBoxer.socialMedia?.twitter || ""}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Save Button */}
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

export default ManageBoxers;
