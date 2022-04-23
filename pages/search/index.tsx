import { SpotifyApiWrapper } from 'api/api.wrapper';
import { SearchPageContent } from './search';

export function SearchPage() {
  return (
    <SpotifyApiWrapper>
      <SearchPageContent />
    </SpotifyApiWrapper>
  );
}

export default SearchPage;
