"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useEditLectureMutation,
  useGetLecturesQuery,
} from "@/app/redux/features/lecture/lectureApi";

const EditLecturePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: lectureData, isLoading: lectureLoading } =
    useGetLecturesQuery(id);

  const [editLecture, { isLoading }] = useEditLectureMutation();

  useEffect(() => {
    if (lectureData?.data) {
      const data = lectureData.data;
      reset({
        title: data.title,
        videoUrl: data.videoUrl,
        courseId: data.courseId,
        moduleId: data.moduleId,
      });
    }
  }, [lectureData, reset]);

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
        router.push(`/dashboard/lecture`);
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update lecture");
    }
  };

  if (lectureLoading) return <p className="text-center">Loading lecture...</p>;

  const lecture = lectureData?.data;
  console.log(lecture);
  return (
    <div className="mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        ✏️ Edit Lecture
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Module Name
          </label>
          <input
            type="text"
            value={lecture?.[0]?.moduleId?.title || "N/A"}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
          />
          <input
            type="hidden"
            {...register("moduleId")}
            value={lecture?.moduleId}
          />
        </div>

        {/* Lecture Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lecture Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={lecture[0]?.title}
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
            className="w-full px-3 py-2 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={lecture[0]?.videoUrl}
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
