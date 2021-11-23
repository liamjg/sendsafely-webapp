import { useEffect, useState } from 'react';

import { RESPONSE_SUCCESS } from '../utilities/client';

const usePackages = (apiKey, apiSecret, pageSize, getPackagesPromise) => {
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

  useEffect(() => {
    setLoading(true);
    getPackagesPromise(apiKey, apiSecret, nextRowIndex, pageSize).then(
      (res) => {
        if (res?.response === RESPONSE_SUCCESS) {
          setPackages((prevPackages) => [...prevPackages, ...res.packages]);
          setHasMore(res.pagination.hasOwnProperty('nextRowIndex'));
        } else {
          setPackages([]);
          setHasMore(false);
        }
        setLoading(false);
      }
    );
  }, [apiKey, apiSecret, pageSize, nextRowIndex, getPackagesPromise]);

  return { loading, packages, resetLoader, loadNextRow };
};

export default usePackages;
