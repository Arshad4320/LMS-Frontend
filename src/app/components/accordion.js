"use client";

import React, { useState } from "react";
import { useGetLecturesQuery } from "@/app/redux/features/lecture/lectureApi";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa"; // ▶️ Icon

const Accordion = ({ items, onLectureSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const { data: lectureData, isFetching } = useGetLecturesQuery(items._id, {
    skip: !isOpen,
  });

  return (
    <div className=" border-b border-gray-300 pb-2">
      <div
        onClick={handleToggle}
        className="cursor-pointer px-3 py-1 rounded-md flex justify-between items-center bg-white hover:bg-blue-50 transition duration-200"
      >
        <span className="text-base md:text-lg font-semibold text-blue-700">
          {items.moduleNumber}. {items.title}
        </span>
        {isOpen ? (
          <ChevronUp className="text-blue-600" />
        ) : (
          <ChevronDown className="text-blue-600" />
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-5 pr-2 mt-3 space-y-3 text-gray-800">
              {isFetching ? (
                <p className="text-sm text-gray-500">Loading lectures...</p>
              ) : lectureData?.data?.length ? (
                lectureData.data.map((lecture) => (
                  <div
                    key={lecture._id}
                    className="flex items-center gap-2 cursor-pointer text-sm md:text-base hover:text-blue-600 transition duration-200"
                    onClick={() => onLectureSelect(lecture)}
                  >
                    <FaPlayCircle className="text-blue-500 text-lg" />
                    <span>{lecture.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No lectures found in this module.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
