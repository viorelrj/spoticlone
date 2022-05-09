import { SearchForm } from '@spc/componvents/molecules/search-form/search-form.component';
import { ISearchFormState } from '@spc/componvents/molecules/search-form/search-form.type';
import { SearchResults } from '@spc/componvents/molecules/search-results/search-results.component';
import { SpotifyApiContext } from 'api/api.context';
import { ISearchResult } from 'api/api.interface';
import { useDebounce } from 'hooks/debounce.hook';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import styles from './search.module.scss';

export function SearchPageContent() {
  const { search, setPlaying } = useContext(SpotifyApiContext);
  const [searchState, setSearchState] = useState<ISearchFormState>();
  const debouncedSearchState = useDebounce(searchState, 120);

  const [searchResults, setSearchResults] = useState<ISearchResult>();

  useEffect(() => {
  }, [searchResults]);

  useEffect(() => {
    if (!debouncedSearchState?.query) return;

    search(debouncedSearchState.query, ['track']).then(({ data }) => setSearchResults(data));
  }, [debouncedSearchState, search]);

  const onUriSelect = useCallback((uri: string) => {
    setPlaying(uri);
  }, [setPlaying]);

  return (
    <div className={styles.search}>
      <SearchForm
        className={styles.search_form}
        onChange={(val) => setSearchState(val)}
      />
      <SearchResults
        className={styles.search_results}
        results={searchResults}
        onSelect={onUriSelect}
      />
    </div>
  );
}

export default SearchPageContent;
