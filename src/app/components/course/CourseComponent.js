"use client";

import React from "react";
import { useGetCoursesQuery } from "../../redux/features/course/courseApi";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const CourseComponent = () => {
  const { data, isLoading, error } = useGetCoursesQuery();

  if (isLoading)
    return <p className="text-center text-gray-500">Loading courses...</p>;
  if (error)
    return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {data?.data?.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <Link href={`/components/course/${course._id}`}>
              <div className="relative w-full h-48">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-1 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-500">
                    (120 reviews)
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-orange-600 font-bold text-lg">
                  ${course.price}
                </span>
                <Link
                  href={`/components/course/${course._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
                >
                  Watch Video
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseComponent;
