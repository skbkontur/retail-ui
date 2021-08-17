import { ScrollBarState } from './ScrollBar';

export const MIN_SCROLL_SIZE = 20;

export const defaultScrollbarState: ScrollBarState = {
  size: 0,
  pos: 0,
  // Mouse is moving where big scrollbar can be located.
  hover: false,
  active: false,
  // True when scroll is following mouse (mouse down on scroll).
  scrolling: false,
  scrollState: 'begin',
};

export const scrollSizeParametersNames = {
  x: {
    offset: 'offsetWidth',
    size: 'scrollWidth',
    pos: 'scrollLeft',
    coord: 'clientX',
    clientSize: 'clientWidth',
    customScrollPos: 'left',
    customScrollSize: 'width',
  },
  y: {
    offset: 'offsetHeight',
    size: 'scrollHeight',
    pos: 'scrollTop',
    coord: 'clientY',
    clientSize: 'clientHeight',
    customScrollPos: 'top',
    customScrollSize: 'height',
  },
} as const;
