import React from "react";
import Navbar from "../components/Navbar";
import Aside from "../components/aside";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { Users, FileText, Award, Building, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Home = () => {
  // Stats Data
  const statsData = [
    { name: "Users", value: 1245, progress: 80, icon: <Users className="w-8 h-8 text-sky-500" /> },
    { name: "Posts", value: 324, progress: 65, icon: <FileText className="w-8 h-8 text-green-500" /> },
    { name: "Matches", value: 58, progress: 45, icon: <Award className="w-8 h-8 text-purple-500" /> },
    { name: "Clubs", value: 12, progress: 90, icon: <Building className="w-8 h-8 text-orange-500" /> },
  ];

  // Recent Activities
  const recentPosts = [
    { title: "Summer Tournament Update", time: "2h ago", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { title: "Club Registration Open", time: "5h ago", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { title: "Match Results: Finals", time: "1d ago", icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
  ];

  const recentMatches = [
    { match: "Lions vs Tigers", status: "Live", color: "text-green-600", icon: <Clock className="w-5 h-5 text-green-600" /> },
    { match: "Eagles vs Hawks", status: "Yesterday", color: "text-gray-500", icon: <Clock className="w-5 h-5 text-gray-500" /> },
    { match: "Bulls vs Panthers", status: "2d ago", color: "text-gray-500", icon: <Clock className="w-5 h-5 text-gray-500" /> },
  ];

  const alerts = [
    {
      type: "error",
      message: "⚠️ Server downtime reported",
      timestamp: "10m ago",
      colorBg: "bg-red-50",
      colorBorder: "border-red-200",
      colorText: "text-red-700",
      actionText: "View Details",
      actionColor: "text-red-600",
    },
    {
      type: "warning",
      message: "⚡ Update pending for Matches module",
      timestamp: "1h ago",
      colorBg: "bg-yellow-50",
      colorBorder: "border-yellow-200",
      colorText: "text-yellow-700",
      actionText: "Update Now",
      actionColor: "text-yellow-600",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col ml-14">
      <Navbar />

      <div className="flex flex-1 pt-16">
        <Aside />

        <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Welcome back, Admin 👋</h1>
            <p className="text-gray-600 mt-3 text-lg">Here’s a quick overview of today’s system status.</p>
          </div>

          {/* Stats Cards + Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    {stat.icon}
                    <div>
                      <h2 className="text-gray-500 text-sm font-medium">{stat.name}</h2>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-sky-500 h-2 rounded-full transition-all"
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{stat.progress}% target reached</p>
                </div>
              ))}
            </div>

            {/* Chart Overview */}
            <div className="bg-white shadow-md rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">System Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Posts */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Posts</h3>
              <ul className="space-y-5">
                {recentPosts.map((post, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b last:border-0 pb-4">
                    <div className="flex items-center gap-2">
                      {post.icon}
                      <span className="text-gray-700 font-medium">{post.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Matches */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Matches</h3>
              <ul className="space-y-5">
                {recentMatches.map((m, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b last:border-0 pb-4">
                    <div className="flex items-center gap-2">
                      {m.icon}
                      <span className="text-gray-700 font-medium">{m.match}</span>
                    </div>
                    <span className={`text-sm font-medium ${m.color}`}>{m.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alerts / Notifications */}
          <div className="bg-white rounded-2xl shadow-md p-8 mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">System Alerts</h3>
            <div className="space-y-5">
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-5 rounded-lg ${alert.colorBg} border ${alert.colorBorder} hover:shadow-md transition`}
                >
                  <div>
                    <span className={`font-medium ${alert.colorText}`}>{alert.message}</span>
                    <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                  </div>
                  <button className={`text-sm font-medium hover:underline ${alert.actionColor}`}>{alert.actionText}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md p-8 mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-sky-500 text-white px-6 py-3 rounded-xl shadow hover:bg-sky-600 transition">
                Add New User
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition">
                Add New Post
              </button>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-600 transition">
                Schedule Match
              </button>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition">
                Register Club
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
