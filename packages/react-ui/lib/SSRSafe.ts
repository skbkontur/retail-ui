import * as PropTypes from 'prop-types';

import { isBrowser } from './client';
import { globalThat } from './globalThat';

export function safePropTypesInstanceOf<T>(
  getExpectedClass: () => new (...args: any[]) => T,
): PropTypes.Requireable<T> {
  if (isBrowser) {
    return PropTypes.instanceOf(getExpectedClass());
  }

  return PropTypes.any;
}

export function matchMediaSSRSafe(mediaQuery: string) {
  if (isBrowser) {
    return globalThat.matchMedia(mediaQuery);
  }
}
