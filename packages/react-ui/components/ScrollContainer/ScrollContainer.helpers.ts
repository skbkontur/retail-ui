import {
  MIN_SCROLL_SIZE,
  scrollSizeParameterName,
  HIDE_SCROLL_Y_OFFSET,
  HIDE_SCROLL_X_OFFSET,
} from './ScrollContainer.constants';

export const getScrollSizeParams = (inner: HTMLElement, axis: 'x' | 'y') => {
  const { offset, size, pos } = scrollSizeParameterName[axis];

  const contentSize = inner[size];
  const scrollOffset = inner[pos];
  let containerSize = inner[offset];

  if (axis === 'y') {
    containerSize -= HIDE_SCROLL_X_OFFSET;
  }

  const scrollActive = containerSize < contentSize;

  if (axis === 'x') {
    containerSize -= HIDE_SCROLL_Y_OFFSET;
  }

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

export const getMaxHeightWithOffset = (prop: React.CSSProperties['maxHeight']) => {
  let maxSize = '100%';

  if (typeof prop === 'number') {
    maxSize = `${prop}px`;
  }

  if (typeof prop === 'string') {
    maxSize = prop;
  }

  return `calc(${maxSize} + ${HIDE_SCROLL_X_OFFSET}px)`;
};
