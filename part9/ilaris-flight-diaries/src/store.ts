import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./reducers/diaryReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    diary: diaryReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
