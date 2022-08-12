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

export function isElement(el: unknown): el is Element {
  if (isBrowser) {
    return el instanceof Element;
  }

  return false;
}

export function isHTMLElement(el: unknown): el is HTMLElement {
  if (isBrowser) {
    return el instanceof HTMLElement;
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
