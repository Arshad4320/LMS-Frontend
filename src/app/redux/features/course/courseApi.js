"use client";
import { apiSlice } from "../../RootApi/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),

    getCourses: builder.query({
      query: () => ({
        url: "/course",
      }),
      providesTags: ["course"],
    }),

    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
      }),
      providesTags: ["course"],
    }),

    editCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/course/update-course/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/delete-course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetCourseQuery,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
