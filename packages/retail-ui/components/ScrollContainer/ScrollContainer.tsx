import events from 'add-event-listener';
import classNames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

import LayoutEvents from '../../lib/LayoutEvents';
import getScrollWidth from '../../lib/dom/getScrollWidth';

import styles from './ScrollContainer.less';

const PADDING_RIGHT = 30;
const MIN_SCROLL_SIZE = 20;

export interface ScrollContainerProps {
  invert?: boolean;
  maxHeight?: string | number;
  preventWindowScroll?: boolean;
}

export interface ScrollContainerState {
  scrollActive: boolean;
  scrollSize: number;
  scrollPos: number;
  hover: boolean;
  scrolling: boolean;
}

export default class ScrollContainer extends React.Component<
  ScrollContainerProps,
  ScrollContainerState
> {
  public static propTypes = {
    invert: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    preventWindowScroll: PropTypes.bool
  };

  public state = {
    scrollActive: false,
    scrollSize: 0,
    scrollPos: 0,

    // Mouse is moving where big scrollbar can be located.
    hover: false,
    // True when scroll is following mouse (mouse down on scroll).
    scrolling: false
  };

  private _inner: HTMLElement | null = null;

  public scrollTo(el: HTMLElement) {
    if (!el) {
      return;
    }
    const maxScroll = el.offsetTop;

    if (!this._inner) {
      return;
    }

    if (this._inner.scrollTop > maxScroll) {
      this._inner.scrollTop = maxScroll;
      return;
    }

    const minScroll = el.offsetTop + el.scrollHeight - this._inner.offsetHeight;
    if (this._inner.scrollTop < minScroll) {
      this._inner.scrollTop = minScroll;
    }
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

  public componentDidMount() {
    this._reflow();
  }

  public componentDidUpdate() {
    this._reflow();
  }

  private _refInner = (el: HTMLElement | null) => {
    this._inner = el;
  };

  private _handleNativeScroll = (event: React.UIEvent) => {
    this._reflow();
    if (this.props.preventWindowScroll) {
      event.preventDefault();
      return;
    }
    LayoutEvents.emit();
  };

  private _reflow = () => {
    const state = this.state;
    const inner = this._inner;

    if (inner === null) {
      return;
    }

    const containerHeight = inner.offsetHeight;
    const contentHeight = inner.scrollHeight;
    const scrollTop = inner.scrollTop;

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

      if (state.scrollSize !== scrollSize || state.scrollPos !== scrollPos) {
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

  private _handleScrollMouseDown = (event: React.MouseEvent) => {
    const target = global.document;
    const initialY = event.clientY;

    if (!this._inner) {
      return;
    }

    const initialScrollTop = this._inner.scrollTop;

    const mouseMove = (evt: MouseEvent) => {
      if (!this._inner) {
        return;
      }
      const ratio =
        (this._inner.scrollHeight - this._inner.offsetHeight) /
        (this._inner.offsetHeight - this.state.scrollSize);
      const deltaY = (evt.clientY - initialY) * ratio;

      this._inner.scrollTop = initialScrollTop + deltaY;

      if (evt.preventDefault) {
        evt.preventDefault();
      } else {
        evt.returnValue = false;
      }
    };

    const mouseUp = () => {
      events.removeEventListener(target, 'mousemove', mouseMove);
      events.removeEventListener(target, 'mouseup', mouseUp);
      this.setState({ scrolling: false });
    };

    events.addEventListener(target, 'mousemove', mouseMove);
    events.addEventListener(target, 'mouseup', mouseUp);
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

  private _handleMouseMove = (event: React.MouseEvent) => {
    const right =
      event.currentTarget.getBoundingClientRect().right - event.pageX;
    this._setHover(right <= 12);
  };

  private _handleMouseLeave = (event: React.MouseEvent) => {
    this._setHover(false);
  };

  private _setHover(hover: boolean) {
    this.setState(state => (state.hover !== hover ? { hover } : null));
  }
}
