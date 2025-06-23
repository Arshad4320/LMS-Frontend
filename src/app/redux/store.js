import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/RootApi/apiSlice";

// import wishlistSlice from "./features/cart/wishlistSlice";

export const store = configureStore({
  reducer: {
    // wishlist: wishlistSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
