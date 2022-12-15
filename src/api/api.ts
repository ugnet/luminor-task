import axios from "axios";
import { GifResponse } from "../types/data";

const BASE = "https://api.giphy.com/v1/gifs/";

// TODO: store api key somewhere securely and not hardcode query parameters
const endpoints = {
  trendingGifs:
    "trending?api_key=WM2qSHyBgGHe10GSzZCD7Xwsj7X4ylSy&limit=24&rating=pg",
};

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const get = <ResponseType>(endpoint: string): Promise<ResponseType> => {
  const url = `${BASE}${endpoint}`;

  return axios
    .get(url, {
      headers: {
        ...config.headers,
      },
    })
    .then((resp) => resp.data as ResponseType);
};

const fetchTrendingGifs = async (offset: number): Promise<GifResponse> =>
  get(`${endpoints.trendingGifs}&offset=${offset}`);

const API = {
  fetchTrendingGifs,
};

export default API;
