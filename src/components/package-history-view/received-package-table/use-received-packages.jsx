import { useEffect, useState } from 'react';

import { getReceivedPackagesPaginated } from '../../../client';

const useReceivedPackages = (apiKey, apiSecret, pageSize) => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextRowIndex, setNextRowIndex] = useState(0);
  const [loadRowIndex, setLoadRowIndex] = useState(0);

  const resetLoader = () => {
    setLoading(true);
    setPackages([]);
    setHasMore(false);
    setNextRowIndex(0);
    setLoadRowIndex(0);
  };

  const loadNextRow = () => {
    if (hasMore) {
      setLoadRowIndex(nextRowIndex);
    }
  };

  useEffect(() => {
    setLoading(true);

    getReceivedPackagesPaginated(
      apiKey,
      apiSecret,
      loadRowIndex,
      pageSize
    ).then((res) => {
      setPackages((prevPackages) => [
        ...new Set([...prevPackages, ...res.packages]),
      ]);
      if (res.pagination.hasOwnProperty('nextRowIndex')) {
        setHasMore(true);
        setNextRowIndex(res.pagination.nextRowIndex);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    });
  }, [apiKey, apiSecret, pageSize, loadRowIndex]);

  return { loading, packages, resetLoader, loadNextRow };
};

export default useReceivedPackages;
