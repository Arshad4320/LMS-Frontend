import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const BASE_URL = "https://lms-1-i4vz.onrender.com/api/v1/";
// const BASE_URL = "http://localhost:5000/api/v1/";

const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: customBaseQuery,
  tagTypes: ["course", "module", "lecture", "Auth", "User", "Dashboard"],
  endpoints: () => ({}),
});
