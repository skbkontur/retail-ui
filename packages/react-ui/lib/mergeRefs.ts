import type React from 'react';

import { Nullable } from '../typings/utility-types';

import { isNonNullable } from './utils';

type refVariants<T> = React.RefObject<T> | React.RefCallback<T> | React.LegacyRef<T>;
type refCallback<T> = (this: { refs: Array<refVariants<T>> }, value: T | React.LegacyRef<Element>) => void;

interface IRefCallbackCache<T> {
  refs: Array<refVariants<T>>;
  callback: refCallback<T>;
}

function applyRef<T>(this: { refs: Array<refVariants<T>> }, value: T) {
  this.refs.forEach((ref) => {
    if (typeof ref === 'function') {
      return ref(value);
    } else if (isNonNullable(ref)) {
      return ((ref as React.MutableRefObject<T>).current = value);
    }
  });
}

const cache: Array<IRefCallbackCache<any>> = [];

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
  const callback = getCallbackInCache(...refs);

  if (callback) {
    return callback;
  }

  const cachedApplyRef = applyRef.bind({ refs });
  cache.push({ refs, callback: cachedApplyRef });
  return cachedApplyRef;
}

function getCallbackInCache<T>(...refs: Array<refVariants<T>>): Nullable<refCallback<T>> {
  for (const { refs: cachedRefs, callback } of cache) {
    const isCachedRefs = refs.every((newRef) => cachedRefs.includes(newRef));

    if (isCachedRefs) {
      return callback;
    }
  }

  return undefined;
}
