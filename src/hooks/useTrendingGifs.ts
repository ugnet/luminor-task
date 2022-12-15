import { fetchTrendingGifs } from "../state/data/data.thunks";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { LoadingStatus } from "../types/common";
import { GifObject } from "../types/data";

const useTrendingGifs = (): {
  data: GifObject[];
  status: LoadingStatus;
  refetchGifs: () => void;
} => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector((state) => state.data);
  const offset = useAppSelector((state) => state.data.currentOffset);

  const refetchGifs = () => {
    if (dataState.status === LoadingStatus.LOADING) return;

    dispatch(fetchTrendingGifs(offset));
  };

  if (
    !dataState.data.length &&
    dataState.status !== LoadingStatus.ERROR &&
    dataState.status !== LoadingStatus.LOADING
  ) {
    dispatch(fetchTrendingGifs(offset));
  }

  return {
    data: dataState.data,
    status: dataState.status || LoadingStatus.IDLE,
    refetchGifs,
  };
};

export default useTrendingGifs;
