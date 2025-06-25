"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useGetCoursesQuery } from "@/app/redux/features/course/courseApi";
import { useGetModulesByCourseQuery } from "@/app/redux/features/module/moduleApi";
import { useCreateLectureMutation } from "@/app/redux/features/lecture/lectureApi";

const AddLecturePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [addLecture, { isLoading }] = useCreateLectureMutation();
  const { data: courseData } = useGetCoursesQuery();
  const selectedCourseId = watch("courseId");

  const { data: moduleData, isLoading: loadingModules } =
    useGetModulesByCourseQuery(selectedCourseId, {
      skip: !selectedCourseId,
    });

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

      const res = await addLecture(formData).unwrap();

      if (res.success) {
        toast.success("✅ Lecture added successfully!");
        reset();
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add lecture");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        ➕ Add New Lecture
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Select Course */}
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

        {/* Select Module */}
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

        {/* PDF Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PDF Note
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
          {isSubmitting || isLoading ? "Submitting..." : "Add Lecture"}
        </button>
      </form>
    </div>
  );
};

export default AddLecturePage;
