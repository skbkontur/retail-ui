import { useEffect, DependencyList, useRef } from 'react';

export const useEffectWithoutInitCall = (effect: () => void, deps: DependencyList) => {
  const isInitialRenderRef = useRef(true);

  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
    } else {
      effect();
    }
  }, deps);
};
