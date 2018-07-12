import React from 'react';

import getScrollWidth from '../../lib/dom/getScrollWidth';
import LayoutEvents from '../../lib/LayoutEvents';

import {
  ScrollContainerInner,
  ScrollContainerStyledScroll,
  ScrollContainerWrapper
} from './ScrollContainerView';

const PADDING_RIGHT = 30;
const MIN_SCROLL_SIZE = 20;
const MAX_SCROLL_BAR_HOVER_DISTANCE = 12;

export interface ScrollContainerProps {
  invert?: boolean;
  maxHeight?: number | string;
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
  private inner: HTMLDivElement | null;

  constructor(props: ScrollContainerProps) {
    super(props);

    this.state = {
      scrollActive: false,
      scrollSize: 0,
      scrollPos: 0,

      // Mouse is moving where big scrollbar can be located.
      hover: false,
      // True when scroll is following mouse (mouse down on scroll).
      scrolling: false
    };

    this.inner = null;
  }

  public componentDidMount() {
    this.reflow();
  }

  public componentDidUpdate() {
    this.reflow();
  }

  public render() {
    const innerStyle = {
      marginRight: -(PADDING_RIGHT + getScrollWidth()),
      maxHeight: this.props.maxHeight,
      paddingRight: PADDING_RIGHT
    };

    return (
      <ScrollContainerWrapper
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.state.scrollActive && (
          <ScrollContainerStyledScroll
            invert={this.props.invert}
            hover={this.state.hover || this.state.scrolling}
            style={{
              top: this.state.scrollPos,
              height: this.state.scrollSize
            }}
            onMouseDown={this.handleScrollMouseDown}
            onWheel={this.handleScrollWheel}
          />
        )}
        <ScrollContainerInner
          innerRef={this.refInner}
          style={innerStyle}
          onWheel={this.handleInnerScrollWheel}
          onScroll={this.handleNativeScroll}
        >
          {this.props.children}
        </ScrollContainerInner>
      </ScrollContainerWrapper>
    );
  }

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

  private refInner = (element: HTMLDivElement) => {
    this.inner = element;
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

      const scrollPos =
        (scrollTop / (contentHeight - containerHeight)) * (containerHeight - scrollSize);

      this.setState(state => {
        if (state.scrollSize !== scrollSize || state.scrollPos !== scrollPos) {
          return {
            scrollActive: true,
            scrollSize,
            scrollPos
          };
        }

        return null;
      });
    } else {
      this.setState({
        scrollActive: false,
        scrollSize: 0,
        scrollPos: 0
      });
    }
  };

  private handleScrollMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.inner || !document) {
      event.preventDefault();
      return;
    }

    const initialY = event.clientY;
    const initialScrollTop = this.inner.scrollTop;

    const mouseMove = (documentEvent: MouseEvent) => {
      if (!this.inner) {
        documentEvent.preventDefault();
        return;
      }

      const ratio =
        (this.inner.scrollHeight - this.inner.offsetHeight) /
        (this.inner.offsetHeight - this.state.scrollSize);
      const deltaY = (documentEvent.clientY - initialY) * ratio;

      this.inner.scrollTop = initialScrollTop + deltaY;

      documentEvent.preventDefault();
    };

    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      this.setState({ scrolling: false });
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    this.setState({ scrolling: true });

    event.preventDefault();
  };

  private handleScrollWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!this.inner) {
      event.preventDefault();
      return;
    }

    if (
      event.deltaY > 0 &&
      this.inner.scrollHeight <= this.inner.scrollTop + this.inner.offsetHeight
    ) {
      return;
    }
    if (event.deltaY < 0 && this.inner.scrollTop <= 0) {
      return;
    }

    this.inner.scrollTop += event.deltaY;
    event.preventDefault();
  };

  private handleInnerScrollWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (this.props.preventWindowScroll || !this.inner) {
      return;
    }

    if (
      event.deltaY > 0 &&
      this.inner.scrollHeight <= this.inner.scrollTop + this.inner.offsetHeight
    ) {
      event.preventDefault();
      return;
    }
    if (event.deltaY < 0 && this.inner.scrollTop <= 0) {
      event.preventDefault();
      return;
    }
  };

  private handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const right = event.currentTarget.getBoundingClientRect().right - event.pageX;
    this.setScrollBarHoverState(right <= MAX_SCROLL_BAR_HOVER_DISTANCE);
  };

  private handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setScrollBarHoverState(false);
  };

  private setScrollBarHoverState(hover: boolean) {
    if (this.state.hover !== hover) {
      this.setState(state => (state.hover !== hover ? { hover } : null));
    }
  }
}
