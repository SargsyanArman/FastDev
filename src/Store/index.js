import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlices";
import usersReducer from './Slices/Users'

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer
  },
});
