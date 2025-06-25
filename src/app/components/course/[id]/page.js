"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Accordion from "../../accordion";
import { getEmbedUrl } from "./getEmbedUrl";
import { useGetModulesByCourseQuery } from "@/app/redux/features/module/moduleApi";
import { useGetLecturesQuery } from "@/app/redux/features/lecture/lectureApi";

const ModuleList = () => {
  const params = useParams();
  const id = params?.id;

  const { data: moduleData, isLoading, error } = useGetModulesByCourseQuery(id);

  const [selectedLecture, setSelectedLecture] = useState(null);

  const firstModuleId = moduleData?.data?.[0]?._id;
  const { data: firstLectureData } = useGetLecturesQuery(firstModuleId, {
    skip: !firstModuleId || !!selectedLecture,
  });

  useEffect(() => {
    if (firstLectureData?.data?.length && !selectedLecture) {
      setSelectedLecture(firstLectureData.data[0]);
    }
  }, [firstLectureData, selectedLecture]);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading modules...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Something went wrong loading modules!
      </p>
    );

  return (
    <section className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        📘 Modules & Lectures
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Video Player Section */}
        <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-4">
          {selectedLecture ? (
            <>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                🎬 {selectedLecture.title}
              </h3>
              <div className="relative w-full pt-[56.25%] rounded-md overflow-hidden border">
                <iframe
                  src={getEmbedUrl(selectedLecture.videoUrl)}
                  title={selectedLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              No lecture selected or available yet.
            </div>
          )}
        </div>

        {/* Accordion Section */}
        <div className="w-full lg:w-1/4 max-h-[600px] overflow-y-auto bg-white rounded-lg shadow p-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            📂 Modules
          </h4>
          <div className="space-y-4">
            {moduleData?.data?.map((module) => (
              <Accordion
                key={module._id}
                items={module}
                onLectureSelect={(lecture) => setSelectedLecture(lecture)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleList;
