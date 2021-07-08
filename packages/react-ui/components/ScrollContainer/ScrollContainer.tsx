import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { getScrollWidth } from '../../lib/dom/getScrollWidth';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { Nullable } from '../../typings/utility-types';

import {
  ScrollContainerProps,
  ScrollContainerState,
  ScrollType,
  ScrollContainerScrollState,
} from './ScrollContainer.types';
import { defaultScrollState, HIDE_SCROLLBAR_OFFSET, MIN_SCROLL_SIZE } from './ScrollContainer.constants';
import { jsStyles } from './ScrollContainer.styles';

export class ScrollContainer extends React.Component<ScrollContainerProps, ScrollContainerState> {
  public static __KONTUR_REACT_UI__ = 'ScrollContainer';

  public static propTypes = {
    invert: PropTypes.bool,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    scrollBehaviour: PropTypes.oneOf(['auto', 'smooth']),
    preventWindowScroll: PropTypes.bool,
    onScrollStateChange: PropTypes.func,
  };

  public static defaultProps = {
    scrollBehaviour: 'auto',
  };

  public state: ScrollContainerState = {
    scrollX: { ...defaultScrollState },
    scrollY: { ...defaultScrollState },
  };

  private inner: Nullable<HTMLElement>;
  private scroll: Nullable<HTMLElement>;

  public componentDidMount() {
    this.reflowY();
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
    this.reflowY();
  }

  public render() {
    const props = this.props;

    const scrollY = this.renderScroll('scrollY');
    const scrollX = this.renderScroll('scrollX');

    const padding = HIDE_SCROLLBAR_OFFSET - getScrollWidth();

    const innerStyle: React.CSSProperties = {
      maxHeight: props.maxHeight,
      scrollBehavior: props.scrollBehaviour,
      // hide vertical and horizontal scrollbar with a little extra space
      padding: `0 ${padding}px ${padding}px 0`,
      margin: `0 -${HIDE_SCROLLBAR_OFFSET}px -${HIDE_SCROLLBAR_OFFSET}px 0`,
    };

    const wrapperStyle: React.CSSProperties = {
      maxWidth: props.maxWidth,
    };

    return (
      <CommonWrapper {...this.props}>
        <div
          style={wrapperStyle}
          className={jsStyles.root()}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          {scrollY}
          <div
            data-tid="ScrollContainer__inner"
            className={jsStyles.inner()}
            style={innerStyle}
            ref={this.refInner}
            onScroll={this.handleNativeScroll}
          >
            {props.children}
          </div>
          {scrollX}
        </div>
      </CommonWrapper>
    );
  }

  /**
   * @public
   */
  public renderScroll = (scrollType: ScrollType) => {
    const state = this.state[scrollType];

    if (!state.active) {
      return null;
    }

    const props = this.props;

    // TODO Проверять тип скролла
    const scrollClass = cn({
      [jsStyles.scroll()]: true,
      [jsStyles.scrollInvert()]: Boolean(props.invert),
      [jsStyles.scrollHover()]: state.hover || state.scrolling,
    });

    const scrollStyle = {
      top: state.pos,
      height: state.size,
    };

    return (
      <div ref={this.refScroll} className={scrollClass} style={scrollStyle} onMouseDown={this.handleScrollMouseDown} />
    );
  };

  /**
   * @public
   * @param {HTMLElement} element
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
    this.reflowY();
    this.props.onScroll?.(event);
    if (this.props.preventWindowScroll) {
      event.preventDefault();
      return;
    }
    LayoutEvents.emit();
  };

  private reflowY = () => {
    if (!this.inner) {
      return;
    }

    const state = this.state['scrollY'];
    const containerHeight = this.inner.offsetHeight - HIDE_SCROLLBAR_OFFSET;
    const contentHeight = this.inner.scrollHeight;
    const scrollTop = this.inner.scrollTop;

    const scrollActive = containerHeight < contentHeight;

    if (!scrollActive && !state.active) {
      return;
    }

    let scrollSize = 0;
    let scrollPos = 0;
    let scrollState = state.scrollState;

    if (scrollActive) {
      scrollSize = Math.max((containerHeight / contentHeight) * containerHeight, MIN_SCROLL_SIZE);
      scrollPos = (scrollTop / (contentHeight - containerHeight)) * (containerHeight - scrollSize);
    }

    if (state.active !== scrollActive || state.size !== scrollSize || state.pos !== scrollPos) {
      scrollState = this.getImmediateScrollState();

      if (scrollState !== state.scrollState) {
        this.props.onScrollStateChange?.(scrollState);
      }

      this.setState({
        ...this.state,
        scrollY: {
          ...this.state.scrollY,
          active: scrollActive,
          size: scrollSize,
          pos: scrollPos,
          scrollState,
        },
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
        (this.inner.scrollHeight - this.inner.offsetHeight) / (this.inner.offsetHeight - this.state.scrollY.size);
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
      this.setState({ ...this.state, scrollY: { ...this.state.scrollY, scrolling: false } });
    };

    target.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);
    this.setState({ ...this.state, scrollY: { ...this.state.scrollY, scrolling: false } });

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

    if (this.state.scrollY.active) {
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
    if (this.state.scrollY.hover !== hover) {
      this.setState({ ...this.state, scrollY: { ...this.state.scrollY, hover } });
    }
  }

  private getImmediateScrollState(): ScrollContainerScrollState {
    if (!this.inner || this.inner.scrollTop === 0) {
      return 'top';
    } else if (this.inner.scrollTop === this.inner.scrollHeight - this.inner.clientHeight) {
      return 'bottom';
    } else {
      return 'scroll';
    }
  }
}
