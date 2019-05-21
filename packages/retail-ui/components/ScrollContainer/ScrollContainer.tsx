import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import LayoutEvents from '../../lib/LayoutEvents';
import getScrollWidth from '../../lib/dom/getScrollWidth';

import styles from './ScrollContainer.less';
import { Nullable } from '../../typings/utility-types';
import { isChrome, isOpera, isSafari } from '../../lib/utils';

const PADDING_RIGHT = 30;
const MIN_SCROLL_SIZE = 20;
const SCROLL_HIDDEN = isChrome || isOpera || isSafari;

export type ScrollContainerScrollState = 'top' | 'scroll' | 'bottom';

export interface ScrollContainerProps {
  invert?: boolean;
  maxHeight?: React.CSSProperties['maxHeight'];
  preventWindowScroll?: boolean;
  onScrollStateChange?: (scrollState: ScrollContainerScrollState) => void;
}

export interface ScrollContainerState {
  scrollActive: boolean;
  hover: boolean;
  scrolling: boolean;
  scrollSize: number;
  scrollPos: number;
  scrollState: string;
}

export default class ScrollContainer extends React.Component<ScrollContainerProps, ScrollContainerState> {
  public static propTypes = {
    invert: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    preventWindowScroll: PropTypes.bool,
    onScrollStateChange: PropTypes.func,
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
    let scroll = null;
    if (this.state.scrollActive) {
      const scrollClass = classNames({
        [styles.scroll]: true,
        [styles.scrollInvert]: this.props.invert,
        [styles.scrollHover]: this.state.hover || this.state.scrolling,
      });
      const scrollStyle = {
        top: this.state.scrollPos,
        height: this.state.scrollSize,
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

    const innerStyle = {
      marginRight: this.getMarginRight(),
      maxHeight: this.props.maxHeight,
      paddingRight: PADDING_RIGHT,
    };

    return (
      <div className={styles.root} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
        {scroll}
        <div className={styles.inner} style={innerStyle} ref={this.refInner} onScroll={this.handleNativeScroll}>
          {this.props.children}
        </div>
      </div>
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

    if (scrollActive) {
      let scrollSize = (containerHeight / contentHeight) * containerHeight;

      if (scrollSize < MIN_SCROLL_SIZE) {
        scrollSize = MIN_SCROLL_SIZE;
      }

      const scrollPos = (scrollTop / (contentHeight - containerHeight)) * (containerHeight - scrollSize);

      if (this.state.scrollSize !== scrollSize || this.state.scrollPos !== scrollPos) {
        const { scrollState } = this.state;
        const updatedScrollState = this.getImmediateScrollState();
        const scrollParamsToUpdate = {
          scrollActive: true,
          scrollSize,
          scrollPos,
          scrollState,
        };

        if (updatedScrollState !== this.state.scrollState) {
          scrollParamsToUpdate.scrollState = updatedScrollState;

          if (this.props.onScrollStateChange) {
            this.props.onScrollStateChange(updatedScrollState);
          }
        }

        this.setState(scrollParamsToUpdate);
      }
    } else {
      this.setState({
        scrollActive: false,
        scrollSize: 0,
        scrollPos: 0,
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

      if (mouseMoveEvent.hasOwnProperty('returnValue')) {
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

    if (event.deltaY > 0 && this.inner.scrollHeight <= this.inner.scrollTop + this.inner.offsetHeight) {
      event.preventDefault();
      return false;
    }
    if (event.deltaY < 0 && this.inner.scrollTop <= 0) {
      event.preventDefault();
      return false;
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
    } else if (this.inner.scrollTop === this.inner.scrollHeight - this.inner.offsetHeight) {
      return 'bottom';
    } else {
      return 'scroll';
    }
  }

  private getMarginRight(): number {
    return -1 * (PADDING_RIGHT + (SCROLL_HIDDEN ? 0 : getScrollWidth()));
  }
}
