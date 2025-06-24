"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  useEditModuleMutation,
  useGetSingleModuleQuery,
} from "@/app/redux/features/module/moduleApi";

const EditModulePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: moduleData, isLoading } = useGetSingleModuleQuery(id);
  const [updateModule, { isLoading: updating }] = useEditModuleMutation();

  const [title, setTitle] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");

  useEffect(() => {
    if (moduleData?.data) {
      setTitle(moduleData.data.title);
      setModuleNumber(moduleData.data.moduleNumber);
    }
  }, [moduleData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updated = await updateModule({
        id,
        payload: {
          title,
          moduleNumber: Number(moduleNumber),
        },
      }).unwrap();

      if (updated.success) {
        toast.success("✅ Module updated successfully!");
        router.push("/dashboard/modules");
      } else {
        toast.error("❌ Failed to update module.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error updating module.");
    }
  };

  if (isLoading) return <p className="text-center">Loading module...</p>;

  return (
    <div className=" mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        ✏️ Edit Module
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Module Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Module Number
          </label>
          <input
            type="number"
            value={moduleNumber}
            onChange={(e) => setModuleNumber(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          {updating ? "Updating..." : "Update Module"}
        </button>
      </form>
    </div>
  );
};

export default EditModulePage;
