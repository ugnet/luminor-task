import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../../types/common";
import { GifObject } from "../../types/data";
import { fetchTrendingGifs } from "./data.thunks";

type DataState = {
  data: GifObject[];
  currentOffset: number;
  status?: LoadingStatus;
};

const initialState: DataState = {
  data: [],
  currentOffset: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingGifs.fulfilled, (state, action) => {
      if (!action.payload) {
        state.status = LoadingStatus.ERROR;
        return;
      }

      state.data = action.payload;
      state.currentOffset = state.currentOffset + 50; //incrementing offset to get new gifs

      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchTrendingGifs.pending, (state) => {
      state.status = LoadingStatus.LOADING;
    });
    builder.addCase(fetchTrendingGifs.rejected, (state) => {
      state.status = LoadingStatus.ERROR;
    });
  },
});

export default dataSlice.reducer;
