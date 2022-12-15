import { useCallback } from "react";
import styled from "styled-components";

import { Card, Header, LoadingSpinner } from "../components";
import { useLockedGifs, useTrendingGifs } from "../hooks";
import { LoadingStatus } from "../types/common";
import { GifObject } from "../types/data";

export const HomeScreen = () => {
  const { data, status } = useTrendingGifs();
  const { lockedGifs, lockGif, unlockGif } = useLockedGifs();

  // TODO: move this function logic somewhere else to have a cleaner component
  const getSortedAndLockedData = useCallback(
    (
      lockedGifs: {
        index: number;
        gif: GifObject;
      }[]
    ) => {
      const dataCopy = data
        .slice()
        .sort(
          (a, b) =>
            new Date(a.import_datetime).valueOf() -
            new Date(b.import_datetime).valueOf()
        );

      if (lockedGifs && lockedGifs.length) {
        lockedGifs.forEach((item) => {
          dataCopy[item.index] = { ...item.gif, locked: true };
        });
      }

      return dataCopy;
    },
    [data]
  );

  return (
    <main>
      <Header />

      {status === LoadingStatus.LOADING ? (
        <LoadingSpinner />
      ) : (
        <CardGrid>
          {getSortedAndLockedData(lockedGifs).map((item, index) => (
            <Card
              key={item.id}
              index={index}
              gifObject={item}
              isLocked={item.locked}
              lockGif={lockGif}
              unlockGif={unlockGif}
            />
          ))}
        </CardGrid>
      )}
    </main>
  );
};

const CardGrid = styled.div`
  display: grid;
  padding: 1rem;

  grid-gap: 1rem;
  grid-template-columns: auto auto auto auto;

  @media (max-width: 1024px) {
    grid-template-columns: auto auto auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 371px) {
    grid-template-columns: auto;
  }
`;
