import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/RootApi/apiSlice";

import courseSlice from "./features/course/courseSlice";
import authReducer from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    course: courseSlice,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
