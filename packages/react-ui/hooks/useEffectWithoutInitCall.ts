import { useEffect, useRef } from 'react';

export const useEffectWithoutInitCall: typeof useEffect = (effect, deps) => {
  const isInitialRenderRef = useRef(true);

  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
    } else {
      effect();
    }
  }, deps);
};
