import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

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
