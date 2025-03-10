import type React from 'react';

import { isNonNullable } from './utils';

type refVariants<T> = React.RefObject<T> | React.RefCallback<T> | React.LegacyRef<T>;
type refCallback<T> = (this: { refs: Array<refVariants<T>> }, value: T | React.LegacyRef<Element>) => void;

const CALLBACK_AS_KEY = 'callbackAsKey';

function applyRef<T>(this: { refs: Array<refVariants<T>> }, value: T) {
  this.refs.forEach((ref) => {
    if (typeof ref === 'function') {
      return ref(value);
    } else if (isNonNullable(ref)) {
      return ((ref as React.MutableRefObject<T>).current = value);
    }
  });
}

const cache = new Map();

/**
 * Merges two or more refs into one with cached refs
 *
 * @returns function that passed refs: (...refs) =>
 *
 * @example
 * const SomeComponent = forwardRef((props, ref) => {
 *  const localRef = useRef();
 *  const mergeRefs = useRef(mergeRefsMemo());
 *
 *  return <div ref={mergeRefs.current(localRef, ref)} />;
 * });
 */
export function mergeRefs<T>(...refs: Array<refVariants<T>>) {
  const cacheLevel = getLeafRefInCache(...refs);

  const callback = cacheLevel.get(CALLBACK_AS_KEY);
  if (callback) {
    return callback as unknown as refCallback<T>;
  }

  const cachedApplyRef = applyRef.bind({ refs });
  cacheLevel.set(CALLBACK_AS_KEY, cachedApplyRef);

  return cachedApplyRef;
}

function getLeafRefInCache<T>(...refs: Array<refVariants<T>>) {
  let cacheLevel = cache;
  for (const ref of refs) {
    const child = cacheLevel.get(ref);

    if (child) {
      cacheLevel = child;
    } else {
      cacheLevel.set(ref, new Map());
      cacheLevel = cacheLevel.get(ref);
    }
  }
  return cacheLevel;
}
