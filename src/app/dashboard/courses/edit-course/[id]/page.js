"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useEditCourseMutation,
  useGetCourseQuery,
} from "@/app/redux/features/course/courseApi";

const EditCoursePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: courseData, isLoading } = useGetCourseQuery(id);
  const [updateCourse, { isLoading: updating }] = useEditCourseMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [thumbnailPreview, setThumbnailPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (courseData?.data) {
      reset({
        title: courseData.data.title,
        description: courseData.data.description,
        price: courseData.data.price,
      });
      setThumbnailPreview(courseData.data.thumbnail);
    }
  }, [courseData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);

      if (selectedFile) {
        formData.append("thumbnail", selectedFile);
      }

      const res = await updateCourse({ id, body: formData }).unwrap();

      if (res.success) {
        toast.success("✅ Course updated successfully!");
        router.push("/dashboard/courses");
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      toast.error("Error updating course");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading course...</p>;

  return (
    <div className=" bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        ✏️ Edit Course
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Minimum price is 0" },
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Thumbnail File Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2 bg-white"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-3 w-32 h-20 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {updating ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default EditCoursePage;
