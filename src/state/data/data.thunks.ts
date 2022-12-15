import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchTrendingGifs = createAsyncThunk(
  "data/fetchTrendingGifs",
  async (offset: number) => {
    const response = await API.fetchTrendingGifs(offset).then(
      (data) => data.data
    );
    return response;
  }
);
