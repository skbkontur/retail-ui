import * as PropTypes from 'prop-types';

export function safePropTypesInstanceOf<T>(expectedClass?: new (...args: any[]) => T): PropTypes.Requireable<T> {
  return expectedClass ? PropTypes.instanceOf(expectedClass) : PropTypes.any;
}
