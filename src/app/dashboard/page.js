"use client";
import React from "react";
import {
  FaUserGraduate,
  FaBook,
  FaLayerGroup,
  FaVideo,
  FaBell,
} from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Users",
    value: 1243,
    icon: <FaUserGraduate className="text-blue-600 text-3xl" />,
  },
  {
    title: "Total Courses",
    value: 37,
    icon: <FaBook className="text-green-600 text-3xl" />,
  },
  {
    title: "Total Modules",
    value: 112,
    icon: <FaLayerGroup className="text-yellow-600 text-3xl" />,
  },
  {
    title: "Total Lectures",
    value: 586,
    icon: <FaVideo className="text-purple-600 text-3xl" />,
  },
];

const recentActivities = [
  "👨‍🎓 New user John registered",
  "📚 New course 'React Mastery' added",
  "🎥 3 lectures uploaded to 'JavaScript Basics'",
  "🧩 Module 'Authentication' updated",
];

const DashboardHome = () => {
  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow mb-8">
        <h1 className="text-3xl font-bold">👋 Welcome back, Admin!</h1>
        <p className="text-sm mt-2">
          Here's what's happening with your LMS today.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition duration-300"
          >
            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaBell className="text-blue-500" /> Recent Activities
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            {recentActivities.map((activity, idx) => (
              <li
                key={idx}
                className="border-b border-gray-100 pb-2 last:border-none"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Placeholder for Chart or Future Component */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📈 Site Analytics
          </h3>
          <div className="flex items-center justify-center h-40 text-gray-400 italic">
            [Chart will be displayed here]
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
