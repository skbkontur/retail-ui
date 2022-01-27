import { useEffect, useRef } from 'react';

/**
 * Does the same thing as useEffect hook, except it skips first render.
 *
 * The signature is identical to useEffect hook.
 */
export const useSkipFirstRender = (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return effect();
    }
  }, deps);

  useEffect(() => {
    isMounted.current = true;
  }, []);
};
