import { globalThat } from '../globalThat';

let scrollbarWidth: number | null = null;

export function getScrollWidth() {
  if (!globalThat.document) {
    return 0;
  }
  const { body } = globalThat.document;
  if (!body) {
    throw Error('There is no "body" element in "document"');
  }

  if (scrollbarWidth !== null) {
    return scrollbarWidth;
  }

  const div = globalThat.document.createElement('div');
  div.innerHTML = 'a'; // In IE clientWidth is 0 if this div is empty.
  div.style.overflowY = 'scroll';
  body.appendChild(div);
  // At least in jest it's NaN.
  scrollbarWidth = div.offsetWidth - div.clientWidth || 0;
  body.removeChild(div);

  return scrollbarWidth;
}
