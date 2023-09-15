import { globalObject } from '@skbkontur/global-object';

let scrollbarWidth: number | null = null;

export function getScrollWidth() {
  if (!globalObject.document) {
    return 0;
  }
  const { body } = globalObject.document;
  if (!body) {
    throw Error('There is no "body" element in "document"');
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
