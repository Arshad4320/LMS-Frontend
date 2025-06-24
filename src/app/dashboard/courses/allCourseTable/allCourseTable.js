"use client";

import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
} from "@/app/redux/features/course/courseApi";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

const AllCoursesTable = () => {
  const { id } = useParams();
  console.log("id", id);
  const { data, isLoading, error } = useGetCoursesQuery();

  const [deleteCourse, { isLoading: deleting }] = useDeleteCourseMutation();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteCourse(id).unwrap();
      if (res.success) {
        toast.success("✅ Course deleted successfully!");
      } else {
        toast.error("❌ Failed to delete course!");
      }
    } catch (err) {
      toast.error("❌ Something went wrong!");
      console.error(err);
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading courses...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to fetch courses!</p>;

  return (
    <div className="bg-white p-3 sm:p-6 rounded-md shadow-md w-full overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        📋 All Courses
      </h2>

      <table className="w-full text-sm text-left border border-gray-200 min-w-[600px]">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-center">Thumbnail</th>
            <th className="px-4 py-3 text-center">Title</th>
            <th className="px-4 py-3 text-center">Price</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((course) => (
            <tr
              key={course._id}
              className="border-t hover:bg-gray-50 transition duration-200"
            >
              <td className="px-4 py-3 flex justify-center">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={80}
                  height={50}
                  className="rounded object-cover w-20 h-12"
                />
              </td>
              <td className="px-4 py-3 text-center font-medium text-gray-800">
                {course.title.slice(0, 120)}
              </td>
              <td className="px-4 py-3 text-center text-orange-600 font-bold">
                ${course.price}
              </td>
              <td className="px-4 py-3 text-center ">
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href={`/dashboard/courses/edit-course/${course._id}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    <FaTrash /> {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!data?.data?.length && (
        <p className="text-center text-gray-500 mt-4">No courses available.</p>
      )}
    </div>
  );
};

export default AllCoursesTable;
