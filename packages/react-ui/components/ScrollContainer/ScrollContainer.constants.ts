import { ScrollState } from './ScrollContainer.types';

export const HIDE_SCROLLBAR_OFFSET = 25;
export const MIN_SCROLL_SIZE = 20;

export const defaultScrollState: ScrollState = {
  active: false,
  size: 0,
  pos: 0,
  // Mouse is moving where big scrollbar can be located.
  hover: false,
  // True when scroll is following mouse (mouse down on scroll).
  scrolling: false,
  scrollState: 'top',
};

export const scrollSizeParameterName = {
  x: {
    offset: 'offsetWidth',
    size: 'scrollWidth',
    pos: 'scrollLeft',
  },
  y: {
    offset: 'offsetHeight',
    size: 'scrollHeight',
    pos: 'scrollTop',
  },
} as const;
