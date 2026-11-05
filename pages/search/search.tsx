import {
  useEffect, useState,
} from 'react';
import { SearchForm } from '@spc/components/molecules/search-form/search-form.component';
import { ISearchFormState } from '@spc/components/molecules/search-form/search-form.type';
import { SearchResults } from '@spc/components/molecules/search-results/search-results.component';
import { track } from '@amplitude/unified';
import { setPlaying, search } from 'api';
import { ISearchResult } from 'api/api.interface';
import { useDebounce } from 'hooks/debounce.hook';
import styles from './search.module.scss';

export const SearchPageContent = () => {
  const [searchState, setSearchState] = useState<ISearchFormState>();
  const debouncedSearchState = useDebounce(searchState, 120);

  const [searchResults, setSearchResults] = useState<ISearchResult>();

  useEffect(() => {
    if (!debouncedSearchState?.query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting results when the query is cleared
      setSearchResults({});
      return;
    }

    search({
      q: debouncedSearchState.query,
      type: ['track'],
    }).then(({ data }) => setSearchResults(data));
  }, [debouncedSearchState]);

  return (
    <div className={styles.search}>
      <SearchForm
        className={styles.search_form}
        onChange={setSearchState}
      />
      <SearchResults
        className={styles.search_results}
        results={searchResults}
        onSelect={(uri) => {
          track('Track Selected');
          setPlaying(uri);
        }}
      />
    </div>
  );
};

export default SearchPageContent;
