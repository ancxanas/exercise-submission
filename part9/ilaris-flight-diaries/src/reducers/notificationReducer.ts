import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ThunkAction } from "redux-thunk";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (
  message: string | null
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

export default notificationSlice.reducer;
