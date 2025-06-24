"use client";

import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

import {
  useDeleteModuleMutation,
  useGetModulesQuery,
} from "@/app/redux/features/module/moduleApi";
import { useGetCoursesQuery } from "@/app/redux/features/course/courseApi";

const ModulesByCourse = () => {
  const { data: moduleData, isLoading, error } = useGetModulesQuery();
  const { data: courseData } = useGetCoursesQuery();

  const [deleteModule, { isLoading: deleting }] = useDeleteModuleMutation();

  const handleDelete = async (moduleId) => {
    if (!window.confirm("Are you sure you want to delete this Module?")) return;
    try {
      const res = await deleteModule(moduleId).unwrap();
      if (res.success) toast.success("✅ Module deleted successfully!");
      else toast.error("❌ Failed to delete module!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading modules...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to fetch modules!</p>;

  // Group modules by courseId
  const groupedModules = {};
  moduleData?.data?.forEach((module) => {
    if (!groupedModules[module.courseId]) {
      groupedModules[module.courseId] = [];
    }
    groupedModules[module.courseId].push(module);
  });

  const getCourseTitle = (courseId) => {
    return (
      courseData?.data?.find((c) => c._id === courseId)?.title ||
      "Unknown Course"
    );
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        📚 Course by Module
      </h2>

      {Object.keys(groupedModules).map((courseId) => (
        <div key={courseId} className="mb-8">
          {/* Course Title */}
          <div className="bg-gray-100 p-3 rounded text-base sm:text-lg font-semibold text-blue-700 mb-3 text-center sm:text-left">
            📘 {getCourseTitle(courseId)}
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 min-w-[500px]">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Module Number
                  </th>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Title
                  </th>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedModules[courseId].map((module) => (
                  <tr key={module._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-center text-orange-600 font-bold whitespace-nowrap">
                      {module.moduleNumber}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-normal break-words">
                      {module.title}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center flex-wrap gap-2">
                        <Link
                          href={`/dashboard/modules/edit-module/${module._id}`}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(module._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs flex items-center gap-1"
                        >
                          <FaTrash /> {deleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {moduleData?.data?.length === 0 && (
        <p className="text-center text-gray-500">
          No modules found for any course.
        </p>
      )}
    </div>
  );
};

export default ModulesByCourse;
