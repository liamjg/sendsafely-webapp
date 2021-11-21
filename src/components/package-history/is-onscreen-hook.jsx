import { useState, useEffect, useRef } from 'react';

const useIsOnscreen = (ref) => {
  const [isOnscreen, setIsOnScreen] = useState(true);

  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnscreen;
};

export default useIsOnscreen;
