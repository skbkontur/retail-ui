import warning from 'warning';

import type { Nullable } from '../typings/utility-types.js';

type SafeTimeout = ReturnType<typeof setTimeout>;
type SafeInterval = ReturnType<typeof setInterval>;
export type SafeTimer = Nullable<SafeInterval | SafeTimeout | number>;

export type GlobalObject = Partial<typeof globalThis>;

const globalObject: GlobalObject =
  (typeof window === 'object' && window) ||
  (typeof globalThis === 'object' && globalThis) ||
  (typeof global === 'object' && global) ||
  Function('return this')();

export function isBrowser(obj: GlobalObject): obj is GlobalObject & Window {
  return !!obj && typeof obj.window !== 'undefined';
}

export function getSafeWindow(): GlobalObject {
  return globalObject;
}

export function getOwnerGlobalObject(element: Element): GlobalObject {
  if (!element) {
    warning(
      true,
      "The 'element' argument is missing. This indicates incorrect type casting and may cause issues in iframes.",
    );
    return globalObject;
  }

  if (element.nodeType === Node.DOCUMENT_NODE && 'defaultView' in element) {
    warning(true, "The 'element' argument is 'document', but 'Element' was expected.");
    return element.defaultView as GlobalObject;
  }

  if ('window' in element && element.window === element) {
    warning(true, "The 'element' argument is 'window', but 'Element' was expected.");
    return element as GlobalObject;
  }

  if (!element.ownerDocument.defaultView) {
    warning(true, "The 'element.ownerDocument.defaultView' is missing. This is an unexpected edge case.");
    return globalObject;
  }

  return element.ownerDocument.defaultView;
}
