import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import MainSection from '../common/MainSection';
import Loading from '../common/Loading';
import ResultView from './search-section-components/ResultView';

const SearchSection = () => {
  const [searchResult, setSearchResult] = useState({});
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const { generation, boostcamp_id, name, content, offset = 1 } = queryString.parse(search);
  const [searchType, searchValue] = Object.entries({ generation, boostcamp_id, name, content }).filter(
    ([, value]) => value !== undefined,
  )[0];

  useEffect(() => {
    const getContent = async () => {
      setLoading(true);
      let res = await fetch(`/documents/search?${searchType}=${searchValue}&offset=${offset - 1}`);
      let { result } = await res.json();
      if (res.status !== 200 && res.msg === 'fail') {
        history.push('/error');
      }
      setSearchResult(result);
      res = await fetch(`/documents/count?${searchType}=${searchValue}`);
      result = (await res.json()).result;
      if (res.status !== 200) {
        history.push('/error');
      }
      setSearchResultCount(result);
      setLoading(false);
    };

    getContent();
  }, [search]);

  return (
    <MainSection title="검색결과">
      {loading && <Loading />}
      {!loading && (
        <ResultView type={searchType} value={searchValue} result={searchResult} resultCount={searchResultCount} />
      )}
    </MainSection>
  );
};
export default SearchSection;
