import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Trash2, Edit, X, ArrowLeft } from "lucide-react";

const API_URL = "https://rbfbackend-c00fb.sevalla.app/events";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setEvents(events.filter((event) => event._id !== id));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  // Open edit modal
  const handleEdit = (event) => {
    setEditingEvent({ ...event });
  };

  // Close modal
  const closeModal = () => setEditingEvent(null);

  // Handle edit form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingEvent._id}`, editingEvent);
      setEvents((prev) =>
        prev.map((event) =>
          event._id === editingEvent._id ? editingEvent : event
        )
      );
      setEditingEvent(null);
      alert("Event updated successfully! 🚀");
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-6 md:px-16 lg:px-24 mt-20">
        <h2 className="text-4xl font-extrabold mb-4 text-sky-400">
          Manage Events
        </h2>

        {/* Back to Home below title */}
        <div className="mb-8">
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-900" />
          <a
            href="/admin/home"
            className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-100 transition-all"
          >
            Back to Home
          </a>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-400 text-lg">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ width: "350px" }} // slightly wider
              >
                <h3 className="text-2xl font-bold mb-2 text-sky-400">
                  {event.title}
                </h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p
                  className="text-gray-300 mb-4 overflow-auto max-h-32 break-words"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {event.description}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white font-semibold transition"
                  >
                    <Edit className="w-5 h-5" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
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
        {editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-red-600 rounded-full hover:bg-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-3xl font-bold mb-6 text-sky-400">
                Update Event
              </h3>
              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingEvent.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editingEvent.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={editingEvent.date.split("T")[0]}
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
                    value={editingEvent.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  ></textarea>
                </div>
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

export default ManageEvents;
