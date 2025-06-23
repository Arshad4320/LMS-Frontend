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

    getModule: builder.query({
      query: (id) => ({
        url: `/module/${id}`,
      }),
      providesTags: ["module"],
    }),

    editModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `/module/edit-module/${id}`,
        method: "PUT",
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
  useGetModuleQuery,
  useDeleteModuleMutation,
  useEditModuleMutation,
  useCreateModuleMutation,
} = moduleApi;
