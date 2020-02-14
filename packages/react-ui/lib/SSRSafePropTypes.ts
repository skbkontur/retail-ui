import * as PropTypes from 'prop-types';

export function instanceOf<T>(getExpectedClass: () => new (...args: any[]) => T) : PropTypes.Requireable<T> {
  if (typeof(window) !== 'undefined') {
    return PropTypes.instanceOf(getExpectedClass());
  }
  
  return PropTypes.any;
}