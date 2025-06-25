"use client";
import { apiSlice } from "../../RootApi/apiSlice";

export const lectureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: (formData) => ({
        url: "/lecture/create-lecture",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["lecture"],
    }),

    getLectures: builder.query({
      query: (id) => ({
        url: `/lecture/${id}`,
      }),
      providesTags: ["lecture"],
    }),
    getAllLectures: builder.query({
      query: () => ({
        url: "/lecture",
      }),
      providesTags: ["lecture"],
    }),

    editLecture: builder.mutation({
      query: ({ id, data }) => ({
        url: `/lecture/update-lecture/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["lecture"],
    }),

    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/lecture/delete-lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecture"],
    }),
  }),
});

export const {
  useGetLecturesQuery,
  useEditLectureMutation,
  useCreateLectureMutation,
  useDeleteLectureMutation,
  useGetAllLecturesQuery
} = lectureApi;
