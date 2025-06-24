// redux/features/course/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCourseId: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
    },
  },
});

export const { setSelectedCourseId } = courseSlice.actions;
export default courseSlice.reducer;
