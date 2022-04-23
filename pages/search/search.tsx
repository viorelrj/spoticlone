import { SearchForm } from '@spc/componvents/search-form/search-form.component';
import { ISearchFormState } from '@spc/componvents/search-form/search-form.type';
import { SearchResults } from '@spc/componvents/search-results/search-results.component';
import { SpotifyApiContext } from 'api/api.context';
import { ISearchResult } from 'api/api.interface';
import { useDebounce } from 'hooks/debounce.hook';
import { useContext, useEffect, useState } from 'react';

export function SearchPageContent() {
  const { search } = useContext(SpotifyApiContext);
  const [searchState, setSearchState] = useState<ISearchFormState>();
  const debouncedSearchState = useDebounce(searchState, 120);

  const [searchResults, setSearchResults] = useState<ISearchResult>();

  useEffect(() => {
    if (!debouncedSearchState?.query) return;

    search(debouncedSearchState.query, ['track']).then(({ data }) => setSearchResults(data));
  }, [debouncedSearchState, search]);

  return (
    <div>
      <SearchForm
        onChange={(val) => setSearchState(val)}
      />
      <SearchResults results={searchResults} />
    </div>
  );
}

export default SearchPageContent;
