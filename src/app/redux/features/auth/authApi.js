"use client";

import { apiSlice } from "../../RootApi/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User", "Dashboard"],
    }),

    getVideos: builder.query({
      query: () => ({
        url: "auth/videos",
      }),
      providesTags: ["User"],
    }),

    getAdminDashboard: builder.query({
      query: () => ({
        url: "auth/admin/dashboard",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetVideosQuery,
  useGetAdminDashboardQuery,
} = authApi;
