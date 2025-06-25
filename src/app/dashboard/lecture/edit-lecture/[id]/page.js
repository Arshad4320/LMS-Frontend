"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useGetCoursesQuery } from "@/app/redux/features/course/courseApi";
import { useGetModulesByCourseQuery } from "@/app/redux/features/module/moduleApi";
import {
  useEditLectureMutation,
  useGetSingleLectureQuery,
} from "@/app/redux/features/lecture/lectureApi";

const EditLecturePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: lectureData, isLoading: lectureLoading } =
    useGetSingleLectureQuery(id);
  const [editLecture, { isLoading }] = useEditLectureMutation();

  const { data: courseData } = useGetCoursesQuery();
  const selectedCourseId = watch("courseId");

  const { data: moduleData, isLoading: loadingModules } =
    useGetModulesByCourseQuery(selectedCourseId, {
      skip: !selectedCourseId,
    });

  useEffect(() => {
    if (lectureData?.data) {
      const data = lectureData.data;
      setValue("title", data.title);
      setValue("videoUrl", data.videoUrl);
      setValue("courseId", data.courseId);
      setValue("moduleId", data.moduleId);
    }
  }, [lectureData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("videoUrl", data.videoUrl);
      formData.append("courseId", data.courseId);
      formData.append("moduleId", data.moduleId);
      if (data.pdfNote?.[0]) {
        formData.append("pdfNote", data.pdfNote[0]);
      }

      const res = await editLecture({ id, data: formData }).unwrap();

      if (res.success) {
        toast.success("✅ Lecture updated successfully!");
        router.push(`/dashboard/lectures`); // change as needed
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update lecture");
    }
  };

  if (lectureLoading) return <p className="text-center">Loading lecture...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        ✏️ Edit Lecture
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Course Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Course
          </label>
          <select
            {...register("courseId", { required: "Course is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Course --</option>
            {courseData?.data?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <p className="text-sm text-red-500 mt-1">
              {errors.courseId.message}
            </p>
          )}
        </div>

        {/* Module Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Module
          </label>
          <select
            {...register("moduleId", { required: "Module is required" })}
            disabled={!selectedCourseId || loadingModules}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Module --</option>
            {moduleData?.data?.map((module) => (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            ))}
          </select>
          {errors.moduleId && (
            <p className="text-sm text-red-500 mt-1">
              {errors.moduleId.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lecture Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter lecture title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video URL
          </label>
          <input
            type="url"
            {...register("videoUrl", { required: "Video URL is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://youtube.com/embed/..."
          />
          {errors.videoUrl && (
            <p className="text-sm text-red-500 mt-1">
              {errors.videoUrl.message}
            </p>
          )}
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload New PDF (optional)
          </label>
          <input
            type="file"
            accept="application/pdf"
            {...register("pdfNote")}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting || isLoading ? "Updating..." : "Update Lecture"}
        </button>
      </form>
    </div>
  );
};

export default EditLecturePage;
