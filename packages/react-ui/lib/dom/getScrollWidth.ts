import { useMemo } from 'react';
import warning from 'warning';

import type { GlobalObject } from '../../lib/globalObject.js';
import { useGlobal } from '../renderEnvironment/index.js';

let scrollbarWidth: number | null = null;

export function getScrollWidth(globalObject: GlobalObject): number {
  if (!globalObject.document) {
    return 0;
  }
  const { body } = globalObject.document;
  if (!body) {
    warning(false, 'There is no "body" element in "document"');
    return 0;
  }

  if (scrollbarWidth !== null) {
    return scrollbarWidth;
  }

  const div = globalObject.document.createElement('div');
  div.innerHTML = 'a'; // In IE clientWidth is 0 if this div is empty.
  div.style.overflowY = 'scroll';
  body.appendChild(div);
  // At least in jest it's NaN.
  scrollbarWidth = div.offsetWidth - div.clientWidth || 0;
  body.removeChild(div);

  return scrollbarWidth;
}

export function useGetScrollWidth(): number {
  const globalObject = useGlobal();
  return useMemo(() => getScrollWidth(globalObject), [globalObject]);
}
