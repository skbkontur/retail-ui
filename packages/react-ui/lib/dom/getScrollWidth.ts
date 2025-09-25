import { globalObject } from '@skbkontur/global-object';
import warning from 'warning';

let scrollbarWidth: number | null = null;

export function getScrollWidth() {
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
