import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // Axios instance for backend requests
  const api = axios.create({
    baseURL: "http://localhost:4000/", // Replace with your backend URL
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

  // Fetch admin info on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin/profile");
        setAdmin({ email: res.data.admin.email, password: "" });
      } catch (error) {
        console.error(error);
        setMessage("Failed to fetch admin info");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Update admin profile
  const handleUpdate = async () => {
    try {
      const updateData = { email: admin.email };
      if (admin.password) updateData.password = admin.password;

      const res = await api.put("/admin/profile", updateData);
      setAdmin({ email: res.data.admin.email, password: "" });
      setEditMode(false);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

      {message && (
        <div className="mb-4 text-green-400 font-semibold">{message}</div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
          />
        ) : (
          <p className="bg-gray-800 p-2 rounded">{admin.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        {editMode ? (
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full p-2 rounded text-black"
          />
        ) : (
          <p className="bg-gray-800 p-2 rounded">********</p>
        )}
      </div>

      <div className="flex gap-4">
        {editMode ? (
          <>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
