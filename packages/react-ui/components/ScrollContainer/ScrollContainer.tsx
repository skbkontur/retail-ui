import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { Nullable } from '../../typings/utility-types';

import {
  ScrollContainerProps,
  ScrollContainerState,
  ScrollState,
  ScrollContainerScrollState,
} from './ScrollContainer.types';
import { defaultScrollYState, defaultScrollXState } from './ScrollContainer.constants';
import { jsStyles } from './ScrollContainer.styles';
import { getScrollSizeParams, getMaxHeightWithOffset, hideOverflowX, hideOverflowY } from './ScrollContainer.helpers';

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
    x: { ...defaultScrollXState },
    y: { ...defaultScrollYState },
  };

  private inner: Nullable<HTMLElement>;
  private scrollY: Nullable<HTMLElement>;

  public componentDidMount() {
    this.reflowY();
    this.reflowX();
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
    this.reflowX();
  }

  public render() {
    const props = this.props;

    const scrollY = this.renderScrollY();
    const scrollX = this.renderScrollX();

    const height = getMaxHeightWithOffset(props.maxHeight);

    const innerStyle: React.CSSProperties = {
      scrollBehavior: props.scrollBehaviour,
      maxHeight: height,
      maxWidth: props.maxWidth,
      ...hideOverflowY(),
      ...hideOverflowX(this.state.y.active),
    };

    return (
      <CommonWrapper {...this.props}>
        <div className={jsStyles.root()} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
          {scrollY}
          {scrollX}
          <div
            data-tid="ScrollContainer__inner"
            className={cn({
              [jsStyles.inner()]: true,
              [jsStyles.bottomIndent()]: this.state.x.active,
            })}
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
    this.inner.scrollTop = this.inner.scrollHeight - this.inner.clientHeight;
  }

  private renderScrollX = () => {
    const state = this.state.x;

    if (!state.active) {
      return null;
    }

    const props = this.props;

    const styles = {
      className: cn({
        [jsStyles.scrollX()]: true,
        [jsStyles.scrollInvert()]: Boolean(props.invert),
        [jsStyles.scrollXIndentRight()]: !this.state.y.active,
        [jsStyles.scrollXHover()]: state.hover || state.scrolling,
      }),
      inline: {
        left: state.pos,
        width: state.size,
      },
    };

    return <div style={styles.inline} className={styles.className} onMouseDown={this.handleScrollXMouseDown} />;
  };

  private renderScrollY = () => {
    const state = this.state.y;

    if (!state.active) {
      return null;
    }

    const props = this.props;
    const styles = {
      className: cn({
        [jsStyles.scrollY()]: true,
        [jsStyles.scrollInvert()]: Boolean(props.invert),
        [jsStyles.scrollYHover()]: state.hover || state.scrolling,
      }),
      inline: {
        top: state.pos,
        height: state.size,
      },
    };
    return (
      <div
        ref={this.refScrollY}
        style={styles.inline}
        className={styles.className}
        onMouseDown={this.handleScrollYMouseDown}
      />
    );
  };

  private setStateScrollX = (state: Partial<ScrollState>) => {
    const oldScrollState = this.state.x;

    this.setState({
      ...this.state,
      x: {
        ...oldScrollState,
        ...state,
      },
    });
  };

  private setStateScrollY = (state: Partial<ScrollState>) => {
    const oldScrollState = this.state.y;

    this.setState({
      ...this.state,
      y: {
        ...oldScrollState,
        ...state,
      },
    });
  };

  private refInner = (element: HTMLElement | null) => {
    if (!this.inner && element && this.props.preventWindowScroll) {
      element.addEventListener('wheel', this.handleInnerScrollWheel, { passive: false });
    }
    if (this.inner && !element) {
      this.inner.removeEventListener('wheel', this.handleInnerScrollWheel);
    }
    this.inner = element;
  };

  private refScrollY = (element: HTMLElement | null) => {
    if (!this.scrollY && element) {
      element.addEventListener('wheel', this.handleScrollWheel, { passive: false });
    }
    if (this.scrollY && !element) {
      this.scrollY.removeEventListener('wheel', this.handleScrollWheel);
    }
    this.scrollY = element;
  };

  private handleNativeScroll = (event: React.UIEvent<HTMLDivElement>) => {
    this.reflowY();
    this.reflowX();
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

    const state = this.state.y;
    const { scrollSize, scrollPos, scrollActive } = getScrollSizeParams(this.inner, 'y');

    if (!scrollActive && !state.active) {
      return;
    }

    if (state.active !== scrollActive || state.size !== scrollSize || state.pos !== scrollPos) {
      const scrollState = this.getImmediateScrollState();

      if (scrollState !== state.scrollState) {
        this.props.onScrollStateChange?.(scrollState);
      }

      this.setStateScrollY({
        active: scrollActive,
        size: scrollSize,
        pos: scrollPos,
        scrollState,
      });
    }
  };

  private reflowX = () => {
    if (!this.inner) {
      return;
    }

    const state = this.state.x;
    const { scrollSize, scrollPos, scrollActive } = getScrollSizeParams(this.inner, 'x');

    if (!scrollActive && !state.active) {
      return;
    }

    if (state.active !== scrollActive || state.size !== scrollSize || state.pos !== scrollPos) {
      this.setStateScrollX({
        active: scrollActive,
        size: scrollSize,
        pos: scrollPos,
        scrollState: 'scroll',
      });
    }
  };

  private handleScrollYMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
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

      const ratioY =
        (this.inner.scrollHeight - this.inner.offsetHeight) / (this.inner.offsetHeight - this.state.y.size);
      const deltaY = (mouseMoveEvent.clientY - initialY) * ratioY;

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
      this.setStateScrollY({ scrolling: false });
    };

    target.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);

    this.setStateScrollY({ scrolling: false });

    event.preventDefault();
  };

  private handleScrollXMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.inner) {
      return;
    }

    const target: Document = window.document;
    const initialX = event.clientX;
    const initialScrollLeft = this.inner.scrollLeft;

    const mouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!this.inner) {
        return;
      }

      const ratioX = (this.inner.scrollWidth - this.inner.offsetWidth) / (this.inner.offsetWidth - this.state.x.size);
      const deltaX = (mouseMoveEvent.clientX - initialX) * ratioX;

      this.inner.scrollLeft = initialScrollLeft + deltaX;

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
      this.setState({ ...this.state, x: { ...this.state.x, scrolling: false } });
    };

    target.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);
    this.setState({ ...this.state, x: { ...this.state.x, scrolling: false } });

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

    if (this.state.y.active) {
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
    const bottom = event.currentTarget.getBoundingClientRect().bottom - event.pageY;

    this.setHoverScrollY(right <= 12);
    this.setHoverScrollX(right >= 12 && bottom <= 12);
  };

  private handleMouseLeave = () => {
    this.setHoverScrollX(false);
    this.setHoverScrollY(false);
  };

  private setHoverScrollY(hover: boolean) {
    if (this.state.y.hover !== hover) {
      this.setStateScrollY({ hover });
    }
  }

  private setHoverScrollX(hover: boolean) {
    if (this.state.x.hover !== hover) {
      this.setStateScrollX({ hover });
    }
  }

  private getImmediateScrollState(): ScrollContainerScrollState {
    if (!this.inner || this.inner.scrollTop === 0) {
      return 'top';
    }

    const bottom = Math.abs(this.inner.scrollTop - (this.inner.scrollHeight - this.inner.clientHeight));

    if (bottom < 1) {
      return 'bottom';
    }

    return 'scroll';
  }
}
