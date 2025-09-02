import React, { useState } from "react";
import {
  Home,
  FileText,
  Video,
  Folder,
  Calendar,
  Newspaper,
  ChevronDown,
  Settings,
  LogOut,
  User, // ✅ Added profile icon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 shadow-xl z-50`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-700 transition"
        >
          <ChevronDown
            className={`w-5 h-5 transform ${
              isCollapsed ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {/* Dashboard */}
        <div className="mb-2">
          <a
            href="/admin/home"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Home className="w-5 h-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </a>
        </div>

        {/* Posts */}
        <div className="mb-2">
          <button
            onClick={() => toggleDropdown("posts")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              {!isCollapsed && <span>Posts</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "posts" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {openDropdown === "posts" && !isCollapsed && (
            <div className="ml-8 mt-2 flex flex-col space-y-2">
              <a href="/admin/posts" className="hover:text-blue-400">
                All Posts
              </a>
              <a href="/admin/add-post" className="hover:text-blue-400">
                Add New
              </a>
            </div>
          )}
        </div>

        {/* Matches */}
        <div className="mb-2">
          <button
            onClick={() => toggleDropdown("matches")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5" />
              {!isCollapsed && <span>Matches</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "matches" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {openDropdown === "matches" && !isCollapsed && (
            <div className="ml-8 mt-2 flex flex-col space-y-2">
              <a href="/admin/matches" className="hover:text-blue-400">
                All Matches
              </a>
              <a href="/admin/add-match" className="hover:text-blue-400">
                Add New
              </a>
            </div>
          )}
        </div>

        {/* Boxers Portfolio */}
        <div className="mb-2">
          <button
            onClick={() => toggleDropdown("boxers")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5" />
              {!isCollapsed && <span>Boxers Portfolio</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "boxers" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {openDropdown === "boxers" && !isCollapsed && (
            <div className="ml-8 mt-2 flex flex-col space-y-2">
              <a href="/admin/boxers" className="hover:text-blue-400">
                All Boxers
              </a>
              <a href="/admin/add-boxer" className="hover:text-blue-400">
                Add New Boxer
              </a>
            </div>
          )}
        </div>

        {/* Events */}
        <div className="mb-2">
          <button
            onClick={() => toggleDropdown("events")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              {!isCollapsed && <span>Events</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "events" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {openDropdown === "events" && !isCollapsed && (
            <div className="ml-8 mt-2 flex flex-col space-y-2">
              <a href="/admin/events" className="hover:text-blue-400">
                All Events
              </a>
              <a href="/admin/add-event" className="hover:text-blue-400">
                Add New Event
              </a>
            </div>
          )}
        </div>

        {/* News */}
        <div className="mb-2">
          <button
            onClick={() => toggleDropdown("news")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-5 h-5" />
              {!isCollapsed && <span>News</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openDropdown === "news" ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {openDropdown === "news" && !isCollapsed && (
            <div className="ml-8 mt-2 flex flex-col space-y-2">
              <a href="/admin/news" className="hover:text-blue-400">
                All News
              </a>
              <a href="/admin/add-news" className="hover:text-blue-400">
                Add New News
              </a>
            </div>
          )}
        </div>

        {/* Profile (replaces Users) */}
        <div className="mb-2">
          <a
            href="/admin/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <User className="w-5 h-5" />
            {!isCollapsed && <span>Profile</span>}
          </a>
        </div>

        {/* Settings */}
        <div className="mb-2">
          <a
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Settings</span>}
          </a>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Aside;
