"use client";

import Link from "next/link";
import { FaEdit, FaTrash, FaFilePdf, FaVideo } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useDeleteLectureMutation,
  useGetAllLecturesQuery,
} from "@/app/redux/features/lecture/lectureApi";
import { useRouter } from "next/navigation";

const LectureListByModule = () => {
  const { data: allLecturesData, isLoading, error } = useGetAllLecturesQuery();
  const [deleteLecture] = useDeleteLectureMutation();
  const router = useRouter();

  if (isLoading)
    return <p className="text-center text-gray-500">Loading lectures...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load lectures!</p>;

  const groupedLectures = {};
  allLecturesData?.data?.forEach((lecture) => {
    const module = lecture.moduleId;
    if (!module?._id) return;

    if (!groupedLectures[module._id]) {
      groupedLectures[module._id] = {
        title: module.title,
        number: module.moduleNumber,
        lectures: [],
      };
    }

    groupedLectures[module._id].lectures.push(lecture);
  });

  const handleDelete = async (lectureId) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;
    try {
      const res = await deleteLecture(lectureId).unwrap();
      if (res.success) toast.success("✅ Lecture deleted successfully!");
      else toast.error("❌ Failed to delete lecture!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        🎓 Lecture List by Module
      </h2>

      {Object.keys(groupedLectures).map((moduleId) => (
        <div key={moduleId} className="mb-8">
          {/* Module Title */}
          <div className="bg-gray-100 p-3 rounded text-base sm:text-lg font-semibold text-blue-700 mb-3 text-center sm:text-left">
            📘 {groupedLectures[moduleId].title} {" -"}
            {groupedLectures[moduleId].number}
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 min-w-[500px]">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Title
                  </th>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Video
                  </th>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    PDF Note
                  </th>
                  <th className="px-4 py-2 text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedLectures[moduleId].lectures.map((lecture) => (
                  <tr key={lecture._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-center font-medium text-gray-800">
                      <Link
                        href={`/dashboard/lectures/${lecture._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lecture.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {lecture.videoUrl ? (
                        <a
                          href={lecture.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 flex items-center justify-center gap-1"
                        >
                          <FaVideo /> Watch
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {lecture.pdfNote ? (
                        <a
                          href={lecture.pdfNote}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 flex items-center justify-center gap-1"
                        >
                          <FaFilePdf /> View
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <Link
                          href={`/dashboard/lecture/edit-lecture/${lecture._id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(lecture._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                        >
                          <FaTrash /> Delete
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

      {allLecturesData?.data?.length === 0 && (
        <p className="text-center text-gray-500">
          No lectures found in any module.
        </p>
      )}
    </div>
  );
};

export default LectureListByModule;
