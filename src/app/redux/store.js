import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/RootApi/apiSlice";

import courseSlice from "./features/course/courseSlice";

export const store = configureStore({
  reducer: {
    course: courseSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
