import { Box, VStack } from '@chakra-ui/react';
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
        <Box key={track.id}>
          {track.name}
        </Box>
      ))}
    </VStack>
  );
}
