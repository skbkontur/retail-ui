import { ScrollBarState } from './ScrollBar';

export const MIN_SCROLL_SIZE = 20;

export const defaultScrollbarState: ScrollBarState = {
  active: false,
  size: 0,
  pos: 0,
  // Mouse is moving where big scrollbar can be located.
  hover: false,
  // True when scroll is following mouse (mouse down on scroll).
  scrolling: false,
  scrollState: 'begin',
};
