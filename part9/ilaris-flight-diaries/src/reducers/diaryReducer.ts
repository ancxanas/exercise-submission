import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { addDiary, getAllDiaries } from "../services/diaryService";
import { DiaryEntry } from "../types";
import { createNotification } from "./notificationReducer";
import axios from "axios";
import { RootState } from "../store";

let initialState: DiaryEntry[] = [
  {
    date: "",
    weather: "",
    id: 0,
    visibility: "",
    comment: "",
  },
];

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setDiaries(_state, action) {
      return action.payload;
    },
    appendDiary(state, action: PayloadAction<DiaryEntry>) {
      state.push(action.payload);
    },
  },
});

export const { setDiaries, appendDiary } = diarySlice.actions;

export const initializeDiaries = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const diaries = await getAllDiaries();
    dispatch(setDiaries(diaries));
  };
};

export const createNewDiary = (
  diary: DiaryEntry
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const newDiary = await addDiary(diary);
      dispatch(appendDiary(newDiary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(createNotification(error.response?.data));
      } else {
        dispatch(createNotification(null));
      }
    }
  };
};

export default diarySlice.reducer;
