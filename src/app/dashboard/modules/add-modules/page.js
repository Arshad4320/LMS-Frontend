"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useCreateModuleMutation } from "@/app/redux/features/module/moduleApi";
import { useGetCoursesQuery } from "@/app/redux/features/course/courseApi";

const AddModulePage = () => {
  const router = useRouter();
  const { data: coursesData, isLoading: loadingCourses } = useGetCoursesQuery();
  const [addModule, { isLoading }] = useCreateModuleMutation();

  const [title, setTitle] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) {
      toast.error("⚠️ Please select a course first.");
      return;
    }

    try {
      const result = await addModule({
        courseId,
        title,
        moduleNumber: Number(moduleNumber),
      }).unwrap();

      if (result.success) {
        toast.success("✅ Module added successfully!");
        router.push(`/dashboard/modules/`);
      } else {
        toast.error("❌ Failed to add module.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Error adding module.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        ➕ Add New Module
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Selector */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Course
          </label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Course --</option>
            {!loadingCourses &&
              coursesData?.data?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
          </select>
        </div>

        {/* Module Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Module Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter module title"
          />
        </div>

        {/* Module Number */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Module Number
          </label>
          <input
            type="number"
            value={moduleNumber}
            onChange={(e) => setModuleNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter module number"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          {isLoading ? "Adding..." : "Add Module"}
        </button>
      </form>
    </div>
  );
};

export default AddModulePage;
