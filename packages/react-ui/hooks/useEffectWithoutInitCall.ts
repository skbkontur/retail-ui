import { useEffect, useRef } from 'react';
import type { DependencyList } from 'react';

export const useEffectWithoutInitCall = (effect: () => void, deps: DependencyList): void => {
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
