import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
