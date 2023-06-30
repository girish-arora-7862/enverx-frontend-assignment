import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setStoreData } = dataSlice.actions;

export const selectData = (state) => state.data.data;

export default dataSlice.reducer;
