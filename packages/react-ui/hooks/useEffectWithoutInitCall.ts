import { useEffect, DependencyList, useRef } from 'react';

export const useEffectWithoutInitCall = (effect: () => void, deps: DependencyList) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      effect();
    }
  }, deps);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
};
