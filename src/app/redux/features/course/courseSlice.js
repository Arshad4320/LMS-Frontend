import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCourse, removeCourse } = courseSlice.actions;
export default courseSlice.reducer;
