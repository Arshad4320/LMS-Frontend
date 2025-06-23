"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCourseMutation } from "@/app/redux/features/course/courseApi";
import { toast } from "react-hot-toast";

const AddCourseForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [addCourse, { isLoading }] = useCreateCourseMutation();

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);

      setValue("thumbnailFile", file, { shouldValidate: true });
    } else {
      setThumbnailPreview(null);
      setValue("thumbnailFile", null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);

      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile);
      }

      const res = await addCourse(formData).unwrap();

      if (res.success) {
        toast.success("✅ Course added successfully!");
        reset();
        setThumbnailPreview(null);
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add course");
    }
  };

  return (
    <div className=" mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Course
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
  {/* Price */}
  <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be at least 0" },
            })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course price"
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course description"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

      
        {/* Thumbnail File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full"
          />
          {errors.thumbnailFile && (
            <p className="text-sm text-red-500 mt-1">
              {errors.thumbnailFile.message}
            </p>
          )}
        </div>

        {/* Thumbnail Preview */}
        {thumbnailPreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="w-48 h-auto rounded shadow"
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting || isLoading ? "Submitting..." : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
