import { GifObject } from "../types/data";
import useLocalStorage from "./useLocalStorage";

const useLockedGifs = (): {
  lockedGifs: { index: number; gif: GifObject }[];
  lockGif: (index: number, gif: GifObject) => void;
  unlockGif: (index: number) => void;
} => {
  const { value, setValue } = useLocalStorage("locked_gifs");

  const lockGif = (index: number, gif: GifObject) => {
    const currentGifs: { index: number; gif: GifObject }[] = value
      ? JSON.parse(value)
      : [];

    setValue(JSON.stringify([...currentGifs, { index, gif }]));
  };

  const unlockGif = (index: number) => {
    const currentGifs: { index: number; gif: GifObject }[] = value
      ? JSON.parse(value)
      : [];

    setValue(JSON.stringify(currentGifs.filter((i) => i.index !== index)));
  };

  return {
    lockedGifs: value ? JSON.parse(value) : undefined,
    lockGif,
    unlockGif,
  };
};

export default useLockedGifs;
