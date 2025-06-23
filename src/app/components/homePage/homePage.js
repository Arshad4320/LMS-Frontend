"use client";

import Image from "next/image";
import Link from "next/link";
import CourseComponent from "../course/CourseComponent";

const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Welcome to Our LMS
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Learn from the best instructors and boost your career today.
          </p>
          <Link
            href="#courses"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      <section className="py-16 bg-blue-50 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#4C9AFF" strokeWidth="4" />
              <path
                d="M22 44C22 38 32 34 32 34C32 34 42 38 42 44"
                stroke="#4C9AFF"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="32" cy="24" r="6" fill="#4C9AFF" />
            </svg>
            <h3 className="text-xl font-semibold mt-4 mb-2">
              Expert Instructors
            </h3>
            <p className="text-gray-600 max-w-sm">
              Learn from industry leaders with real-world experience.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect
                x="10"
                y="10"
                width="44"
                height="44"
                rx="8"
                stroke="#FFB572"
                strokeWidth="4"
              />
              <path
                d="M10 26L32 44L54 26"
                stroke="#FFB572"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M32 20V10M32 54V44"
                stroke="#FFB572"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="text-xl font-semibold mt-4 mb-2">
              Flexible Learning
            </h3>
            <p className="text-gray-600 max-w-sm">
              Study anytime, anywhere with our 24/7 access.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect
                x="6"
                y="10"
                width="52"
                height="44"
                rx="4"
                stroke="#4CAF50"
                strokeWidth="3"
                fill="#E8F5E9"
              />
              <path
                d="M14 18H50M14 26H42M14 34H36"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="50" cy="38" r="6" fill="#4CAF50" />
              <path d="M50 44V54L46 50L42 54V44" fill="#4CAF50" />
            </svg>
            <h3 className="text-xl font-semibold mt-4 mb-2">Certificate</h3>
            <p className="text-gray-600 max-w-sm">
              Get certified and boost your resume after every course.
            </p>
          </div>
        </div>
      </section>

      <section id="courses" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            📚 Our Popular Courses
          </h2>
          <CourseComponent />
        </div>
      </section>

      <section className="bg-blue-600 text-white px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Ready to start learning?
          </h2>
          <p className="text-lg mb-6">
            Enroll in a course and take the first step toward your goal.
          </p>
          <Link
            href="#courses"
            className="bg-white text-blue-600 px-6 py-3 rounded font-bold hover:bg-gray-100 transition"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
