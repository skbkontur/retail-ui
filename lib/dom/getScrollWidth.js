// @flow
import ExecutionEnvironment from 'exenv';

let scrollbarWidth = null;

export default function getScrollWidth() {
  if (!ExecutionEnvironment.canUseDOM) {
    return 0;
  }

  if (scrollbarWidth !== null) {
    return scrollbarWidth;
  }

  const div = document.createElement('div');
  div.innerHTML = 'a'; // In IE clientWidth is 0 if this div is empty.
  div.style.overflowY = 'scroll';
  document.body.appendChild(div);
  // At least in jest it's NaN.
  scrollbarWidth = div.offsetWidth - div.clientWidth || 0;
  document.body.removeChild(div);

  return scrollbarWidth;
}
