import { useEffect, useState } from 'react';

import { getSentPackagesPaginated } from '../../client';

const useSentPackages = (apiKey, apiSecret, pageSize) => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextRowIndex, setNextRowIndex] = useState(0);

  const loadNextRow = () => {
    if (hasMore) {
      setNextRowIndex((lastRowIndex) => lastRowIndex + pageSize);
    }
  };

  const resetLoader = () => {
    setLoading(true);
    setPackages([]);
    setHasMore(false);
    setNextRowIndex(0);
  };

  // wait for changes to nextRowIndex
  useEffect(() => {
    setLoading(true);

    getSentPackagesPaginated(apiKey, apiSecret, nextRowIndex, pageSize).then(
      (res) => {
        setPackages((prevPackages) => [...prevPackages, ...res.packages]);
        setHasMore(res.pagination.hasOwnProperty('nextRowIndex'));
        setLoading(false);
      }
    );
  }, [apiKey, apiSecret, pageSize, nextRowIndex]);

  return { loading, packages, resetLoader, loadNextRow };
};

export default useSentPackages;
