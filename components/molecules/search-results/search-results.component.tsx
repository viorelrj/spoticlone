import { VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Track } from '../../track/track.component';
import { ISearchResultsProps } from './search-results.type';
import styles from './search-results.module.scss';

export const SearchResults = ({ results, className, onSelect }: ISearchResultsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [results]);

  return (
    <VStack className={className} ref={containerRef}>
      {results?.tracks?.items.map((track) => (
        <button
          key={track.id}
          className={styles.result}
          type="button"
          onClick={() => onSelect?.(track.uri)}
        >
          <Track
            key={track.id}
            track={track}
          />
        </button>
      ))}
    </VStack>
  );
};
