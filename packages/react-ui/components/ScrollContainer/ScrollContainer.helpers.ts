import { Nullable } from '../../typings/utility-types';

import { defaultScrollbarState, MIN_SCROLL_SIZE } from './ScrollContainer.constants';
import { ScrollContainerScrollYState, ScrollContainerScrollXState, ScrollAxis, ScrollStateProps } from './ScrollBar';

export const scrollSizeParametersNames = {
  x: {
    offset: 'offsetWidth',
    size: 'scrollWidth',
    pos: 'scrollLeft',
    coord: 'clientX',
    customScrollPos: 'left',
    customScrollSize: 'width',
  },
  y: {
    offset: 'offsetHeight',
    size: 'scrollHeight',
    pos: 'scrollTop',
    coord: 'clientY',
    customScrollPos: 'top',
    customScrollSize: 'height',
  },
} as const;

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
  }

  return {
    scrollActive,
    scrollSize,
    scrollPos,
  };
};

export const getScrollYOffset = (element: HTMLElement, container: HTMLElement) => {
  const elementOffset = element.offsetTop;

  if (container.scrollTop > elementOffset) {
    return elementOffset;
  }

  const offset = elementOffset + element.scrollHeight - container.offsetHeight;
  if (container.scrollTop < offset) {
    return offset;
  }

  return container.scrollTop;
};

export const getDefaultState = (axis: ScrollAxis): ScrollStateProps => {
  return {
    ...defaultScrollbarState,
    state: axis === 'y' ? 'top' : 'left',
  };
};

export const getImmediateScrollYState = (inner: Nullable<HTMLElement>): ScrollContainerScrollYState => {
  if (!inner || inner.scrollTop === 0) {
    return 'top';
  }

  if (inner.scrollTop === inner.scrollHeight - inner.clientHeight) {
    return 'bottom';
  }

  return 'scroll';
};

export const getImmediateScrollXState = (inner: Nullable<HTMLElement>): ScrollContainerScrollXState => {
  if (!inner || inner.scrollLeft === 0) {
    return 'left';
  }

  if (inner.scrollLeft === inner.scrollWidth - inner.clientWidth) {
    return 'right';
  }

  return 'scroll';
};
