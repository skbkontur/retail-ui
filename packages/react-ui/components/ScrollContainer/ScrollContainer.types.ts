import { CommonProps } from '../../internal/CommonWrapper';

export type ScrollContainerScrollState = 'top' | 'scroll' | 'bottom';

export type ScrollBehaviour = 'auto' | 'smooth';

export interface ScrollContainerProps extends CommonProps {
  invert?: boolean;
  maxHeight?: React.CSSProperties['maxHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  preventWindowScroll?: boolean;
  /**
   * Поведение скролла (https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
   * @default 'auto'
   */
  scrollBehaviour?: ScrollBehaviour;
  onScrollStateChange?: (scrollState: ScrollContainerScrollState) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export type ScrollType = 'scrollX' | 'scrollY';

export interface ScrollState {
  active: boolean;
  hover: boolean;
  scrolling: boolean;
  size: number;
  pos: number;
  scrollState: ScrollContainerScrollState;
}

export type ScrollContainerState = Record<ScrollType, ScrollState>;
