import classNames from 'classnames';
import * as React from 'react';

import * as PropTypes from 'prop-types';

import LayoutEvents from '../../lib/LayoutEvents';
import getScrollWidth from '../../lib/dom/getScrollWidth';

import styles from './ScrollContainer.less';
import { Nullable } from '../../typings/utility-types';

const PADDING_RIGHT = 30;
const MIN_SCROLL_SIZE = 20;

export type ScrollContainerScrollState = 'top' | 'scroll' | 'bottom';

export interface ScrollContainerProps {
  invert?: boolean;
  maxHeight?: React.CSSProperties['maxHeight'];
  preventWindowScroll?: boolean;
  children?: React.ReactNode;
  onScrollStateChange?: (scrollState: ScrollContainerScrollState) => void;
}

export interface ScrollContainerState {
  scrollActive: boolean;
  hover: boolean;
  scrolling: boolean;
  scrollSize: number;
  scrollPos: number;
}

export default class ScrollContainer extends React.Component<
  ScrollContainerProps,
  ScrollContainerState
> {
  public static propTypes = {};

  public state: ScrollContainerState = {
    scrollActive: false,
    scrollSize: 0,
    scrollPos: 0,

    // Mouse is moving where big scrollbar can be located.
    hover: false,
    // True when scroll is following mouse (mouse down on scroll).
    scrolling: false
  };

  private _inner: Nullable<HTMLDivElement>;

  public componentDidMount() {
    this._reflow();
  }

  public componentDidUpdate() {
    this._reflow();
  }

  public render() {
    let scroll = null;
    if (this.state.scrollActive) {
      const scrollClass = classNames({
        [styles.scroll]: true,
        [styles.scrollInvert]: this.props.invert,
        [styles.scrollHover]: this.state.hover || this.state.scrolling
      });
      const scrollStyle = {
        top: this.state.scrollPos,
        height: this.state.scrollSize
      };
      scroll = (
        <div
          className={scrollClass}
          style={scrollStyle}
          onMouseDown={this._handleScrollMouseDown}
          onWheel={this._handleScrollWheel}
        />
      );
    }

    const innerStyle = {
      marginRight: -(PADDING_RIGHT + getScrollWidth()),
      maxHeight: this.props.maxHeight,
      paddingRight: PADDING_RIGHT
    };

    const innerProps = {
      ref: this._refInner,
      className: styles.inner,
      style: innerStyle,
      onWheel: this.props.preventWindowScroll
        ? this._handleInnerScrollWheel
        : undefined,
      onScroll: this._handleNativeScroll
    };

    return (
      <div
        className={styles.root}
        onMouseMove={this._handleMouseMove}
        onMouseLeave={this._handleMouseLeave}
      >
        {scroll}
        <div {...innerProps}>{this.props.children}</div>
      </div>
    );
  }

  /**
   * @public
   */
  public scrollTo(element: HTMLElement) {
    if (!element || !this._inner) {
      return;
    }
    const maxScroll = element.offsetTop;
    if (this._inner.scrollTop > maxScroll) {
      this._inner.scrollTop = maxScroll;
      return;
    }

    const minScroll =
      element.offsetTop + element.scrollHeight - this._inner.offsetHeight;
    if (this._inner.scrollTop < minScroll) {
      this._inner.scrollTop = minScroll;
    }
  }

  /**
   * @public
   */
  public scrollToTop() {
    if (!this._inner) {
      return;
    }
    this._inner.scrollTop = 0;
  }

  /**
   * @public
   */
  public scrollToBottom() {
    if (!this._inner) {
      return;
    }
    this._inner.scrollTop = this._inner.scrollHeight - this._inner.offsetHeight;
  }

  private _refInner = (element: HTMLDivElement) => {
    this._inner = element;
  };

  private _handleNativeScroll = (event: React.UIEvent<HTMLDivElement>) => {
    this._reflow();
    if (this.props.preventWindowScroll) {
      event.preventDefault();
      return;
    }
    LayoutEvents.emit();
  };

  private _reflow = () => {
    if (!this._inner) {
      return;
    }

    const containerHeight = this._inner.offsetHeight;
    const contentHeight = this._inner.scrollHeight;
    const scrollTop = this._inner.scrollTop;

    const scrollActive = containerHeight < contentHeight;

    if (!scrollActive && !this.state.scrollActive) {
      return;
    }

    if (scrollActive) {
      let scrollSize = (containerHeight / contentHeight) * containerHeight;

      if (scrollSize < MIN_SCROLL_SIZE) {
        scrollSize = MIN_SCROLL_SIZE;
      }

      const scrollPos =
        (scrollTop / (contentHeight - containerHeight)) *
        (containerHeight - scrollSize);

      if (
        this.state.scrollSize !== scrollSize ||
        this.state.scrollPos !== scrollPos
      ) {
        const currentScrollState = this._getScrollState();
        this.props.onScrollStateChange && this.props.onScrollStateChange(currentScrollState);

        this.setState({
          scrollActive: true,
          scrollSize,
          scrollPos
        });
      }
    } else {
      this.setState({
        scrollActive: false,
        scrollSize: 0,
        scrollPos: 0
      });
    }
  };

  private _handleScrollMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!this._inner) {
      return;
    }

    const target: Document = window.document;
    const initialY = event.clientY;
    const initialScrollTop = this._inner.scrollTop;

    const mouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!this._inner) {
        return;
      }

      const ratio =
        (this._inner.scrollHeight - this._inner.offsetHeight) /
        (this._inner.offsetHeight - this.state.scrollSize);
      const deltaY = (mouseMoveEvent.clientY - initialY) * ratio;

      this._inner.scrollTop = initialScrollTop + deltaY;

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

  private _handleScrollWheel = (event: React.WheelEvent) => {
    if (!this._inner) {
      return;
    }

    if (
      event.deltaY > 0 &&
      this._inner.scrollHeight <=
        this._inner.scrollTop + this._inner.offsetHeight
    ) {
      return;
    }
    if (event.deltaY < 0 && this._inner.scrollTop <= 0) {
      return;
    }

    this._inner.scrollTop += event.deltaY;
    event.preventDefault();
  };

  private _handleInnerScrollWheel = (event: React.WheelEvent) => {
    if (!this._inner) {
      return;
    }

    if (
      event.deltaY > 0 &&
      this._inner.scrollHeight <=
        this._inner.scrollTop + this._inner.offsetHeight
    ) {
      event.preventDefault();
      return false;
    }
    if (event.deltaY < 0 && this._inner.scrollTop <= 0) {
      event.preventDefault();
      return false;
    }
  };

  private _handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const right =
      event.currentTarget.getBoundingClientRect().right - event.pageX;
    this._setHover(right <= 12);
  };

  private _handleMouseLeave = () => {
    this._setHover(false);
  };

  private _setHover(hover: boolean) {
    if (this.state.hover !== hover) {
      this.setState({ hover });
    }
  }

  private _getScrollState(): ScrollContainerScrollState {
    if (!this._inner || this._inner.scrollTop === 0) {
      return 'top';
    }
    else if (this._inner.scrollTop === this._inner.scrollHeight - this._inner.offsetHeight) {
      return 'bottom';
    }
    else {
      return 'scroll';
    }
  }
}

ScrollContainer.propTypes = {
  invert: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  preventWindowScroll: PropTypes.bool
};
