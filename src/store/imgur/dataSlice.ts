import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: "SET_DATA",
  initialState,
  reducers: {
    setData(state, action) {
      const payload = action.payload;
      state.data = payload.data;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
