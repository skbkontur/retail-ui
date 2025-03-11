import type React from 'react';

import { Nullable } from '../typings/utility-types';

import { isNonNullable, isNullable } from './utils';

type refVariants<T> = Nullable<React.RefObject<T> | React.RefCallback<T>>;
type refCallback = ReturnType<typeof createRefCallback<unknown>>;
const CALLBACK_AS_KEY = { callbackAsKey: true };

type cacheKey<T> = NonNullable<refVariants<T> | typeof CALLBACK_AS_KEY>;
type cacheValue<T> = refCallback | WeakMap<cacheKey<T>, cacheValue<T>>;

const cache = new WeakMap<cacheKey<unknown>, cacheValue<unknown>>();

/**
 * Merges two or more refs into one with cached ref
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
export function mergeRefs<T>(...refs: Array<refVariants<T>>): refCallback {
  const cacheLevel = getLeafRefInCache(...refs);

  const cachedCallback = cacheLevel.get(CALLBACK_AS_KEY);
  if (cachedCallback && typeof cachedCallback === 'function') {
    return cachedCallback;
  }

  const newRefCallback = createRefCallback<unknown>(refs);
  cacheLevel.set(CALLBACK_AS_KEY, newRefCallback);

  return newRefCallback;
}

function createRefCallback<T>(refs: Array<refVariants<T>>) {
  function applyRef(value: T) {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        return ref(value);
      } else if (isNonNullable(ref)) {
        return ((ref as React.MutableRefObject<T>).current = value);
      }
    });
  }
  return applyRef;
}

function getLeafRefInCache<T>(...refs: Array<refVariants<T>>) {
  let cacheLevel = cache;
  for (const ref of refs) {
    if (isNullable(ref)) {
      continue;
    }
    const child = cacheLevel.get(ref);

    if (child && typeof child !== 'function') {
      cacheLevel = child;
    } else {
      const leaf = new WeakMap();
      cacheLevel.set(ref, leaf);
      cacheLevel = leaf;
    }
  }
  return cacheLevel;
}
