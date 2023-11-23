import { createSlice } from "@reduxjs/toolkit";

const Slicer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload.values);
    },
  },
});
export const { addUser } = Slicer.actions;
export const State = (state) => state.users;
export default Slicer.reducer;
