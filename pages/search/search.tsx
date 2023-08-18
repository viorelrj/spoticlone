import { SearchForm } from '@spc/componvents/molecules/search-form/search-form.component';
import { ISearchFormState } from '@spc/componvents/molecules/search-form/search-form.type';
import { SearchResults } from '@spc/componvents/molecules/search-results/search-results.component';
import { setPlaying, search } from 'api';
import { ISearchResult } from 'api/api.interface';
import { useDebounce } from 'hooks/debounce.hook';
import {
  useEffect, useState,
} from 'react';
import styles from './search.module.scss';

export const SearchPageContent = () => {
  const [searchState, setSearchState] = useState<ISearchFormState>();
  const debouncedSearchState = useDebounce(searchState, 120);

  const [searchResults, setSearchResults] = useState<ISearchResult>();

  useEffect(() => {
    if (!debouncedSearchState?.query) {
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
        onSelect={setPlaying}
      />
    </div>
  );
};

export default SearchPageContent;
