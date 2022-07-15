import * as PropTypes from 'prop-types';

import { isBrowser } from './client';

export function safePropTypesInstanceOf<T>(
  getExpectedClass: () => new (...args: any[]) => T,
): PropTypes.Requireable<T> {
  if (isBrowser) {
    return PropTypes.instanceOf(getExpectedClass());
  }

  return PropTypes.any;
}

/**
 * TODO: Change return type to `el is HTMLElement | SVGElement` in 5.0.0
 * Current return type is incorrect but changing it to the correct type causes breaking changes
 *
 * @param el DOM node
 * @returns true if passed HTML or SVG element, else false
 */
export function isHTMLOrSVGElement(el: unknown): el is HTMLElement {
  if (isBrowser) {
    return el instanceof HTMLElement || el instanceof SVGElement;
  }

  return false;
}

export function isNode(node: unknown): node is Node {
  if (isBrowser) {
    return node instanceof Node;
  }

  return false;
}

export const globalThat: typeof globalThis =
  (typeof globalThis === 'object' && globalThis) ||
  (typeof global === 'object' && global) ||
  (typeof window === 'object' && window) ||
  Function('return this')();
