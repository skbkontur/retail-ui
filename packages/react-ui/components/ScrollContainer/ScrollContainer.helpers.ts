import { MIN_SCROLL_SIZE, HIDE_SCROLL_Y_OFFSET, scrollSizeParameterName } from './ScrollContainer.constants';

export const getScrollSizeParams = (inner: HTMLElement, axis: 'x' | 'y') => {
  const { offset, size, pos } = scrollSizeParameterName[axis];

  const contentSize = inner[size];
  const scrollOffset = inner[pos];
  let containerSize = inner[offset];

  const scrollActive = containerSize < contentSize;

  containerSize -= HIDE_SCROLL_Y_OFFSET;

  let scrollSize = 0;
  let scrollPos = 0;

  if (scrollActive) {
    scrollSize = Math.max((containerSize / contentSize) * containerSize, MIN_SCROLL_SIZE);
    scrollPos = (scrollOffset / (contentSize - containerSize)) * (containerSize - scrollSize);
  }

  return {
    scrollActive,
    scrollSize,
    scrollPos,
  };
};
