import { useEffect, useState } from 'react';

import { getReceivedPackagesPaginated } from '../../utilities/client';

const useReceivedPackages = (apiKey, apiSecret, pageSize) => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextRowIndex, setNextRowIndex] = useState(0);

  const resetLoader = () => {
    setLoading(true);
    setPackages([]);
    setHasMore(false);
    setNextRowIndex(0);
  };

  const loadNextRow = () => {
    if (hasMore) {
      setNextRowIndex((lastRowIndex) => lastRowIndex + pageSize);
    }
  };

  //TODO: add error handling
  useEffect(() => {
    setLoading(true);

    getReceivedPackagesPaginated(
      apiKey,
      apiSecret,
      nextRowIndex,
      pageSize
    ).then((res) => {
      setPackages((prevPackages) => [...prevPackages, ...res.packages]);
      setHasMore(res.pagination.hasOwnProperty('nextRowIndex'));
      setLoading(false);
    });
  }, [apiKey, apiSecret, pageSize, nextRowIndex]);

  return { loading, packages, resetLoader, loadNextRow };
};

export default useReceivedPackages;
