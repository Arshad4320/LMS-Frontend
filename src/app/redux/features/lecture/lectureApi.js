"use client";
import { apiSlice } from "../../RootApi/apiSlice";

export const lectureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: (data) => ({
        url: "/lecture/create-lecture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["lecture"],
    }),

    getLecture: builder.query({
      query: (id) => ({
        url: `/lecture/${id}`,
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
  useGetLectureQuery,
  useEditLectureMutation,
  useCreateLectureMutation,
  useDeleteLectureMutation,
} = lectureApi;
