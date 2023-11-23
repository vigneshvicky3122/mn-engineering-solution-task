import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "../Redux/CreateSlice";

const store = configureStore({
  reducer: {
    users: SliceReducer,
  },
});
export default store;
