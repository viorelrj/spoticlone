import { VStack } from '@chakra-ui/react';
import { Track } from '../track/track.component';
import { ISearchResultsProps } from './search-results.type';
import styles from './search-results.module.scss';

export function SearchResults({ results, className }: ISearchResultsProps) {
  return (
    <VStack className={className}>
      {results?.tracks?.items.map((track) => (
        <button className={styles.result} type="button">
          <Track
            key={track.id}
            track={track}
          />
        </button>
      ))}
    </VStack>
  );
}
