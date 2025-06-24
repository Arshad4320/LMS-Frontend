"use client";
import { apiSlice } from "../../RootApi/apiSlice";

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createModule: builder.mutation({
      query: (data) => ({
        url: "/module/create-module",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["module"],
    }),

    getModulesByCourse: builder.query({
      query: (courseId) => ({
        url: `/module/${courseId}`,
        method: "GET",
      }),
      providesTags: ["module"],
    }),
    getModules: builder.query({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
      providesTags: ["module"],
    }),
    getSingleModule: builder.query({
      query: (id) => ({
        url: `/module/single-module/${id}`,
        method: "GET",
      }),
      providesTags: ["module"],
    }),

    editModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `/module/update-module/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["module"],
    }),

    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/module/delete-module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["module"],
    }),
  }),
});

export const {
  useGetModulesByCourseQuery,
  useDeleteModuleMutation,
  useEditModuleMutation,
  useCreateModuleMutation,
  useGetModulesQuery,
  useGetSingleModuleQuery,
} = moduleApi;
