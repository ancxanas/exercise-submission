import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getAllDiaries, addDiary } from "../diaryService";
import { DiaryEntry } from "../types";

const diarySlice = createSlice({
  name: "diary",
  initialState: [],
  reducers: {
    setDiaries(state, action) {
      return action.payload;
    },
  },
});

export const { setDiaries } = diarySlice.actions;

export const initializeDiaries = () => {
  return async (dispatch: Dispatch) => {
    const diaries = await getAllDiaries();
    dispatch(setDiaries(diaries));
  };
};

export default diarySlice.reducer;
