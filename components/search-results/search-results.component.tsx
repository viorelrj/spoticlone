import { VStack } from '@chakra-ui/react';
import { Track } from '../track/track.component';
import { ISearchResultsProps } from './search-results.type';

export function SearchResults({ results }: ISearchResultsProps) {
  // if (!results?.tracks) {
  //   return (
  //     <VStack>
  //       Nothing to show
  //     </VStack>
  //   );
  // }

  return (
    <VStack>
      {results?.tracks?.items.map((track) => (
        <Track
          key={track.id}
          track={track}
        />
      ))}
    </VStack>
  );
}
