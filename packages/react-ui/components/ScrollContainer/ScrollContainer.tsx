import React from 'react';
import PropTypes from 'prop-types';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';
import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './ScrollContainer.styles';
import {
  getScrollYOffset,
  scrollSizeParametersNames,
  convertScrollbarXScrollState,
  convertScrollbarYScrollState,
} from './ScrollContainer.helpers';
import { defaultScrollbarState } from './ScrollContainer.constants';
import { ScrollAxis, ScrollBar, ScrollBarScrollState, ScrollStateProps } from './ScrollBar';

export type ScrollContainerScrollXState = 'left' | 'scroll' | 'right';
export type ScrollContainerScrollYState = 'top' | 'scroll' | 'bottom';
export type ScrollContainerScrollState = ScrollContainerScrollYState; // deprecated
export type ScrollBehaviour = 'auto' | 'smooth';

export interface ScrollContainerProps extends CommonProps {
  /**
   * Инвертировать цвет скроллбара
   * @default false
   */
  invert: boolean;
  maxHeight?: React.CSSProperties['maxHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  /**
   * @default false
   */
  preventWindowScroll: boolean;
  /**
   * Поведение скролла (https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
   * @default 'auto'
   */
  scrollBehaviour?: ScrollBehaviour;
  onScrollStateChange?: (scrollYState: ScrollContainerScrollState, scrollXState: ScrollContainerScrollXState) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export interface ScrollContainerState {
  x: ScrollStateProps;
  y: ScrollStateProps;
}

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
    invert: false,
    scrollBehaviour: 'auto',
    preventWindowScroll: false,
  };

  public state: ScrollContainerState = {
    x: defaultScrollbarState,
    y: defaultScrollbarState,
  };

  private refScrollX: React.RefObject<ScrollBar>;
  private refScrollY: React.RefObject<ScrollBar>;
  private inner: Nullable<HTMLElement>;
  private theme!: Theme;

  constructor(props: ScrollContainerProps) {
    super(props);

    this.refScrollX = React.createRef();
    this.refScrollY = React.createRef();
  }

  public componentDidMount() {
    this.refScrollX.current?.setInnerElement(this.inner);
    this.refScrollY.current?.setInnerElement(this.inner);
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
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * @public
   * @param {HTMLElement} element
   */
  public scrollTo(element: Nullable<HTMLElement>) {
    if (!element || !this.inner) {
      return;
    }

    this.inner.scrollLeft = element.offsetLeft;
    this.inner.scrollTop = getScrollYOffset(element, this.inner);
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

  /**
   * @public
   */
  public scrollToLeft() {
    if (!this.inner) {
      return;
    }
    this.inner.scrollLeft = 0;
  }

  /**
   * @public
   */
  public scrollToRight() {
    if (!this.inner) {
      return;
    }

    this.inner.scrollLeft = this.inner.scrollWidth - this.inner.offsetWidth;
  }

  private renderMain = () => {
    const props = this.props;

    const innerStyle: React.CSSProperties = {
      scrollBehavior: props.scrollBehaviour,
      maxHeight: props.maxHeight,
      maxWidth: props.maxWidth,
    };

    const scrollbarY = this.renderScrollbar('y');
    const scrollbarX = this.renderScrollbar('x');

    return (
      <div className={styles.root()} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
        {scrollbarY}
        {scrollbarX}
        <div
          data-tid="ScrollContainer__inner"
          className={cx(styles.inner(), {
            [styles.innerBottomIndent(this.theme)]: this.state.x.active && this.state.y.active,
          })}
          style={innerStyle}
          ref={this.refInner}
          onScroll={this.handleNativeScroll}
        >
          {props.children}
        </div>
      </div>
    );
  };

  private handleScrollStateChange = (scrollState: ScrollBarScrollState, axis: ScrollAxis) => {
    if (axis === 'x') {
      const scrollYState = convertScrollbarYScrollState(this.state.y.state);
      const scrollXState = convertScrollbarXScrollState(scrollState);
      this.props.onScrollStateChange?.(scrollYState, scrollXState);
      return;
    }

    const scrollXState = convertScrollbarXScrollState(this.state.x.state);
    const scrollYState = convertScrollbarYScrollState(scrollState);
    this.props.onScrollStateChange?.(scrollYState, scrollXState);
  };

  private renderScrollbar = (axis: ScrollAxis) => {
    const state = this.state[axis];
    const ref = axis === 'x' ? this.refScrollX : this.refScrollY;
    const className = cx({
      [styles.scrollBarXIndentRight(this.theme)]: axis === 'x' && this.state.y.active,
    });

    return (
      <ScrollBar
        ref={ref}
        axis={axis}
        className={className}
        invert={this.props.invert}
        onChangeState={this.setStateScrollBar}
        onScrollStateChange={this.handleScrollStateChange}
        {...state}
      />
    );
  };

  private setStateScrollBar = (newState: Partial<ScrollStateProps>, axis: ScrollAxis) => {
    const state = this.state;
    this.setState({ ...state, [axis]: { ...state[axis], ...newState } });
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

  private handleNativeScroll = (event: React.UIEvent<HTMLDivElement>) => {
    this.refScrollX?.current?.reflow(this.inner);
    this.refScrollY?.current?.reflow(this.inner);

    this.props.onScroll?.(event);
    if (this.props.preventWindowScroll) {
      event.preventDefault();
      return;
    }
    LayoutEvents.emit();
  };

  private handleInnerScrollWheel = (event: Event) => {
    this.handleInnerScrollAxisWheel(event, 'y');
    this.handleInnerScrollAxisWheel(event, 'x');
  };

  private handleInnerScrollAxisWheel = (event: Event, axis: ScrollAxis) => {
    if (!this.inner || !(event instanceof WheelEvent)) {
      return;
    }

    if (this.state.y.active || this.state.x.active) {
      const { pos, size, offset } = scrollSizeParametersNames[axis];

      if (event.deltaY > 0 && this.inner[size] <= this.inner[pos] + this.inner[offset]) {
        event.preventDefault();
        return false;
      }
      if (event.deltaY < 0 && this.inner[pos] <= 0) {
        event.preventDefault();
        return false;
      }
    }
  };

  private handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const right = event.currentTarget.getBoundingClientRect().right - event.pageX;
    const bottom = event.currentTarget.getBoundingClientRect().bottom - event.pageY;

    this.setHoverScrollBar(right <= 12, 'y');
    this.setHoverScrollBar(right >= 12 && bottom <= 12, 'x');
  };

  private handleMouseLeave = () => {
    this.setHoverScrollBar(false, 'y');
    this.setHoverScrollBar(false, 'x');
  };

  private setHoverScrollBar(hover: boolean, axis: ScrollAxis) {
    if (this.state[axis].hover !== hover) {
      this.setStateScrollBar({ hover }, axis);
    }
  }
}
