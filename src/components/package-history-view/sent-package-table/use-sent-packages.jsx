import { useEffect, useState, useCallback } from 'react';

import { getSentPackagesPaginated } from '../../../client';

const useSentPackages = (apiKey, apiSecret, pageSize, observerRef) => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextRowIndex, setNextRowIndex] = useState(0);

  const triggerRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setNextRowIndex((lastRowIndex) => lastRowIndex + pageSize);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, pageSize, hasMore, observerRef]
  );

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

  return { loading, packages, resetLoader, triggerRef };
};

export default useSentPackages;
