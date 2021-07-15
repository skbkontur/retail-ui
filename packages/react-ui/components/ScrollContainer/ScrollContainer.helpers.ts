import React from 'react';

import { getScrollWidth } from '../../lib/dom/getScrollWidth';

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
  if (typeof prop === 'number') {
    return `calc(${prop}px + ${HIDE_SCROLL_X_OFFSET}px)`;
  }

  if (typeof prop === 'string') {
    return `calc(${prop} + ${HIDE_SCROLL_X_OFFSET}px)`;
  }

  return `calc(100% + ${HIDE_SCROLL_X_OFFSET}px)`;
};

export const hideOverflowX = (isActiveScrollY: boolean) => {
  return isActiveScrollY
    ? {
        marginBottom: -1 * HIDE_SCROLL_X_OFFSET,
      }
    : {
        marginBottom: -2 * HIDE_SCROLL_X_OFFSET,
        paddingBottom: HIDE_SCROLL_X_OFFSET,
        height: '100%',
      };
};

export const hideOverflowY = () => {
  return {
    // hide vertical scrollbar with a little extra spac
    paddingRight: HIDE_SCROLL_Y_OFFSET - getScrollWidth(),
    marginRight: -1 * HIDE_SCROLL_Y_OFFSET,
  };
};
