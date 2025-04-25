import type React from 'react';

import type { Nullable } from '../typings/utility-types';

import { isNonNullable, isNullable } from './utils';

type RefVariants<T> = Nullable<React.RefObject<T> | React.RefCallback<T>>;
type RefCallback<T> = ReturnType<typeof createRefCallback<T>>;
const CALLBACK_AS_KEY = { callbackAsKey: true };

type CacheKey<T> = NonNullable<RefVariants<T> | typeof CALLBACK_AS_KEY>;
type CacheValue<T> = RefCallback<T> | WeakMap<CacheKey<T>, CacheValue<T>>;

const cache = new WeakMap<CacheKey<any>, CacheValue<any>>();

/**
 * Позволяет объединить несколько параметров ref в один вызов, в котором во все переданные параметры просетится ref.
 *
 * Кеширует результат возвращаемой функции, так что при одинаковых входных параметрах React-у будет возвращена одинаковая функция.
 * Это позволит не вызывать лишние commitAttachRef и commitDetachRef и не ловить сайдэффекты связанные со значением ref в моменте
 *
 * Не прокидывай в параметрах стрелочные функции, так результат не будет закеширован.
 *
 * @returns function that passed refs: (...refs) =>
 *
 * @example
 * const SomeComponent = forwardRef((props, ref) => {
 *  const localRef = useRef();
 *  return <div ref={mergeRefs(localRef, ref)} />;
 * });
 */
export function mergeRefs<T>(...refs: Array<RefVariants<T>>): RefCallback<T> {
  const cacheLevel = getLeafRefInCache(...refs);

  const cachedCallback = cacheLevel.get(CALLBACK_AS_KEY);
  if (cachedCallback && typeof cachedCallback === 'function') {
    return cachedCallback;
  }

  const newRefCallback = createRefCallback<T>(refs);
  cacheLevel.set(CALLBACK_AS_KEY, newRefCallback);

  return newRefCallback;
}

function createRefCallback<T>(refs: Array<RefVariants<T>>) {
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

function getLeafRefInCache<T>(...refs: Array<RefVariants<T>>) {
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
