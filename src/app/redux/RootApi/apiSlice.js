import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
const BASE_URL = "http://localhost:5000/api/v1";
const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  //   prepareHeaders(headers) {
  //     headers.set("Authorization", `accessToken ${Cookies.get("token")}`);
  //     return headers;
  //   },
});
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["course", "module", "lecture"],
});
