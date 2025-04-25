import { MIN_SCROLL_SIZE, scrollSizeParametersNames } from './ScrollContainer.constants';
import type { ScrollBarScrollState } from './ScrollBar';
import type { ScrollContainerScrollStateX, ScrollContainerScrollStateY } from './ScrollContainer';

export const getScrollSizeParams = (inner: HTMLElement, axis: 'x' | 'y') => {
  const { offset, size, pos } = scrollSizeParametersNames[axis];

  const contentSize = inner[size];
  const scrollOffset = inner[pos];
  const containerSize = inner[offset];

  const scrollActive = containerSize < contentSize;

  let scrollSize = 0;
  let scrollPos = 0;

  if (scrollActive) {
    scrollSize = Math.max((containerSize / contentSize) * containerSize, MIN_SCROLL_SIZE);
    scrollPos = (scrollOffset / (contentSize - containerSize)) * (containerSize - scrollSize);

    // Convert pixels to percentages
    scrollSize = containerSize && (100 / containerSize) * scrollSize;
    scrollPos = containerSize && (100 / containerSize) * scrollPos;
  }

  return {
    scrollActive,
    scrollSize,
    scrollPos,
  };
};

export const getScrollYOffset = (element: HTMLElement, container: HTMLElement) => {
  const elementTopOffset = element.offsetTop;

  if (container.scrollTop > elementTopOffset) {
    return elementTopOffset;
  }

  const offset = elementTopOffset + element.scrollHeight - container.offsetHeight;
  if (container.scrollTop < offset) {
    return offset;
  }

  return container.scrollTop;
};

export const convertScrollbarXScrollState = (state: ScrollBarScrollState): ScrollContainerScrollStateX => {
  const scrollBarState: Record<ScrollBarScrollState, ScrollContainerScrollStateX> = {
    begin: 'left',
    end: 'right',
    middle: 'scroll',
  };

  return scrollBarState[state];
};

export const convertScrollbarYScrollState = (state: ScrollBarScrollState): ScrollContainerScrollStateY => {
  const scrollBarState: Record<ScrollBarScrollState, ScrollContainerScrollStateY> = {
    begin: 'top',
    end: 'bottom',
    middle: 'scroll',
  };

  return scrollBarState[state];
};
