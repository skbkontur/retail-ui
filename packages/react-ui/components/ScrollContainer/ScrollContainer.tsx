import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';

import { jsStyles } from './ScrollContainer.styles';

const HIDE_SCROLLBAR_OFFSET = 30;
const MIN_SCROLL_SIZE = 20;

export type ScrollContainerScrollState = 'top' | 'scroll' | 'bottom';

export type ScrollBehaviour = 'auto' | 'smooth';

export interface ScrollContainerProps extends CommonProps {
  invert?: boolean;
  maxHeight?: React.CSSProperties['maxHeight'];
  preventWindowScroll?: boolean;
  /**
   * Поведение скролла (https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
   * @default 'auto'
   */
  scrollBehaviour?: ScrollBehaviour;
  onScrollStateChange?: (scrollState: ScrollContainerScrollState) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export interface ScrollContainerState {
  scrollActive: boolean;
  hover: boolean;
  scrolling: boolean;
  scrollSize: number;
  scrollPos: number;
  scrollState: ScrollContainerScrollState;
}

export class ScrollContainer extends React.Component<ScrollContainerProps, ScrollContainerState> {
  public static __KONTUR_REACT_UI__ = 'ScrollContainer';

  public static propTypes = {
    invert: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    scrollBehaviour: PropTypes.oneOf(['auto', 'smooth']),
    preventWindowScroll: PropTypes.bool,
    onScrollStateChange: PropTypes.func,
  };

  public static defaultProps = {
    scrollBehaviour: 'auto',
  };

  public state: ScrollContainerState = {
    scrollActive: false,
    scrollSize: 0,
    scrollPos: 0,

    // Mouse is moving where big scrollbar can be located.
    hover: false,
    // True when scroll is following mouse (mouse down on scroll).
    scrolling: false,
    scrollState: 'top',
  };

  private inner: Nullable<HTMLElement>;
  private scroll: Nullable<HTMLElement>;

  public componentDidMount() {
    this.reflow();
  }

  public componentDidUpdate(prevProps: ScrollContainerProps) {
    if (this.inner) {
      if (prevProps.preventWindowScroll && !this.props.preventWindowScroll) {
        this.inner.removeEventListener('wheel', this.handleInnerScrollWheel);
      }
      if (!prevProps.preventWindowScroll && this.props.preventWindowScroll) {
        this.inner.addEventListener('wheel', this.handleInnerScrollWheel, { passive: false });
      }
    }
    this.reflow();
  }

  public render() {
    const state = this.state;
    const props = this.props;
    let scroll = null;

    if (state.scrollActive) {
      const scrollClass = cn({
        [jsStyles.scroll()]: true,
        [jsStyles.scrollInvert()]: Boolean(props.invert),
        [jsStyles.scrollHover()]: state.hover || state.scrolling,
      });
      const scrollStyle = {
        top: state.scrollPos,
        height: state.scrollSize,
      };
      scroll = (
        <div
          ref={this.refScroll}
          className={scrollClass}
          style={scrollStyle}
          onMouseDown={this.handleScrollMouseDown}
        />
      );
    }

    const innerStyle: React.CSSProperties = {
      // hide vertical scrollbar with a little extra space
      marginRight: -1 * HIDE_SCROLLBAR_OFFSET,
      paddingRight: HIDE_SCROLLBAR_OFFSET - getScrollWidth(),

      maxHeight: props.maxHeight,
      scrollBehavior: props.scrollBehaviour,
    };

    return (
      <CommonWrapper {...this.props}>
        <div className={jsStyles.root()} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
          {scroll}
          <div
            data-tid="ScrollContainer__inner"
            className={jsStyles.inner()}
            style={innerStyle}
            ref={this.refInner}
            onScroll={this.handleNativeScroll}
          >
            {props.children}
          </div>
        </div>
      </CommonWrapper>
    );
  }

  /**
   * @public
   */
  public scrollTo(element: HTMLElement) {
    if (!element || !this.inner) {
      return;
    }
    const maxScroll = element.offsetTop;
    if (this.inner.scrollTop > maxScroll) {
      this.inner.scrollTop = maxScroll;
      return;
    }

    const minScroll = element.offsetTop + element.scrollHeight - this.inner.offsetHeight;
    if (this.inner.scrollTop < minScroll) {
      this.inner.scrollTop = minScroll;
    }
  }

  /**
   * @public
   */
  public scrollToTop() {
    if (!this.inner) {
      return;
    }
    this.inner.scrollTop = 0;
  }

  /**
   * @public
   */
  public scrollToBottom() {
    if (!this.inner) {
      return;
    }
    this.inner.scrollTop = this.inner.scrollHeight - this.inner.offsetHeight;
  }

  private refInner = (element: HTMLElement | null) => {
    if (!this.inner && element && this.props.preventWindowScroll) {
      element.addEventListener('wheel', this.handleInnerScrollWheel, { passive: false });
    }
    if (this.inner && !element) {
      this.inner.removeEventListener('wheel', this.handleInnerScrollWheel);
    }
    this.inner = element;
  };

  private refScroll = (element: HTMLElement | null) => {
    if (!this.scroll && element) {
      element.addEventListener('wheel', this.handleScrollWheel, { passive: false });
    }
    if (this.scroll && !element) {
      this.scroll.removeEventListener('wheel', this.handleScrollWheel);
    }
    this.scroll = element;
  };

  private handleNativeScroll = (event: React.UIEvent<HTMLDivElement>) => {
    this.reflow();
    this.props.onScroll?.(event);
    if (this.props.preventWindowScroll) {
      event.preventDefault();
      return;
    }
    LayoutEvents.emit();
  };

  private reflow = () => {
    if (!this.inner) {
      return;
    }

    const containerHeight = this.inner.offsetHeight;
    const contentHeight = this.inner.scrollHeight;
    const scrollTop = this.inner.scrollTop;

    const scrollActive = containerHeight < contentHeight;

    if (!scrollActive && !this.state.scrollActive) {
      return;
    }

    let scrollSize = 0;
    let scrollPos = 0;
    let scrollState = this.state.scrollState;

    if (scrollActive) {
      scrollSize = Math.max((containerHeight / contentHeight) * containerHeight, MIN_SCROLL_SIZE);
      scrollPos = (scrollTop / (contentHeight - containerHeight)) * (containerHeight - scrollSize);
    }

    if (
      this.state.scrollActive !== scrollActive ||
      this.state.scrollSize !== scrollSize ||
      this.state.scrollPos !== scrollPos
    ) {
      scrollState = this.getImmediateScrollState();

      if (scrollState !== this.state.scrollState) {
        this.props.onScrollStateChange?.(scrollState);
      }

      this.setState({
        scrollActive,
        scrollSize,
        scrollPos,
        scrollState,
      });
    }
  };

  private handleScrollMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.inner) {
      return;
    }

    const target: Document = window.document;
    const initialY = event.clientY;
    const initialScrollTop = this.inner.scrollTop;

    const mouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!this.inner) {
        return;
      }

      const ratio =
        (this.inner.scrollHeight - this.inner.offsetHeight) / (this.inner.offsetHeight - this.state.scrollSize);
      const deltaY = (mouseMoveEvent.clientY - initialY) * ratio;

      this.inner.scrollTop = initialScrollTop + deltaY;

      if (mouseMoveEvent.preventDefault) {
        mouseMoveEvent.preventDefault();
      }

      if (Object.prototype.hasOwnProperty.call(mouseMoveEvent, 'returnValue')) {
        (mouseMoveEvent as MouseEvent & {
          returnValue: boolean;
        }).returnValue = false;
      }
    };

    const mouseUp = () => {
      target.removeEventListener('mousemove', mouseMove);
      target.removeEventListener('mouseup', mouseUp);
      this.setState({ scrolling: false });
    };

    target.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);
    this.setState({ scrolling: true });

    event.preventDefault();
  };

  private handleScrollWheel = (event: Event) => {
    if (!this.inner || !(event instanceof WheelEvent)) {
      return;
    }

    if (event.deltaY > 0 && this.inner.scrollHeight <= this.inner.scrollTop + this.inner.offsetHeight) {
      return;
    }
    if (event.deltaY < 0 && this.inner.scrollTop <= 0) {
      return;
    }

    this.inner.scrollTop += event.deltaY;
    event.preventDefault();
  };

  private handleInnerScrollWheel = (event: Event) => {
    if (!this.inner || !(event instanceof WheelEvent)) {
      return;
    }

    if (this.state.scrollActive) {
      if (event.deltaY > 0 && this.inner.scrollHeight <= this.inner.scrollTop + this.inner.offsetHeight) {
        event.preventDefault();
        return false;
      }
      if (event.deltaY < 0 && this.inner.scrollTop <= 0) {
        event.preventDefault();
        return false;
      }
    }
  };

  private handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const right = event.currentTarget.getBoundingClientRect().right - event.pageX;
    this.setHover(right <= 12);
  };

  private handleMouseLeave = () => {
    this.setHover(false);
  };

  private setHover(hover: boolean) {
    if (this.state.hover !== hover) {
      this.setState({ hover });
    }
  }

  private getImmediateScrollState(): ScrollContainerScrollState {
    if (!this.inner || this.inner.scrollTop === 0) {
      return 'top';
    }

    // Zoom in Chrome causes problems
    // https://github.com/skbkontur/retail-ui/pull/2705
    const maxScrollPos = this.inner.scrollHeight - this.inner.clientHeight;
    if (Math.abs(maxScrollPos - this.inner.scrollTop) <= 1) {
      return 'bottom';
    }

    return 'scroll';
  }
}
