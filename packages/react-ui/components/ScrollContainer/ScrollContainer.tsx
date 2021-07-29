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
import { ScrollAxis, ScrollBar, ScrollBarScrollState } from './ScrollBar';

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

type ScrollContainerStateKey = 'activeScrollBarX' | 'activeScrollBarY';

type ScrollContainerState = Record<ScrollContainerStateKey, boolean>;

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
    activeScrollBarX: false,
    activeScrollBarY: false,
  };

  private refScrollX: Nullable<ScrollBar>;
  private refScrollY: Nullable<ScrollBar>;
  private inner: Nullable<HTMLElement>;
  private theme!: Theme;

  public componentDidMount() {
    this.refScrollX?.setInnerElement(this.inner);
    this.refScrollY?.setInnerElement(this.inner);
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
            [styles.innerBottomIndent(this.theme)]: this.state.activeScrollBarX,
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

  private renderScrollbar = (axis: ScrollAxis) => {
    const active = axis === 'x' ? this.state.activeScrollBarX : this.state.activeScrollBarY;
    const refSctollBar = axis === 'x' ? this.refScrollBarX : this.refScrollBarY;

    return (
      <ScrollBar
        axis={axis}
        active={active}
        ref={refSctollBar}
        invert={this.props.invert}
        onChangeActive={this.handleActiveScrollBar}
        onScrollStateChange={this.handleScrollStateChange}
      />
    );
  };

  private handleActiveScrollBar = (active: boolean, axis: ScrollAxis) => {
    const prop: ScrollContainerStateKey = axis === 'x' ? 'activeScrollBarX' : 'activeScrollBarY';
    this.setState({ ...this.state, [prop]: active });
  };

  private handleScrollStateChange = (scrollState: ScrollBarScrollState, axis: ScrollAxis) => {
    if (!this.refScrollY || !this.refScrollX) {
      return;
    }

    if (axis === 'x') {
      const scrollXState = convertScrollbarXScrollState(scrollState);
      const scrollYState = convertScrollbarYScrollState(this.refScrollY?.scrollBarState);

      this.props.onScrollStateChange?.(scrollYState, scrollXState);
      return;
    }

    const scrollXState = convertScrollbarXScrollState(this.refScrollX?.scrollBarState);
    const scrollYState = convertScrollbarYScrollState(scrollState);

    this.props.onScrollStateChange?.(scrollYState, scrollXState);
  };

  private refScrollBarY = (scrollbar: Nullable<ScrollBar>) => {
    this.refScrollY = scrollbar;
  };

  private refScrollBarX = (scrollbar: Nullable<ScrollBar>) => {
    this.refScrollX = scrollbar;
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
    this.refScrollX?.reflow();
    this.refScrollY?.reflow();

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
    if (!this.inner || !(event instanceof WheelEvent) || (axis === 'x' && !event.shiftKey)) {
      return;
    }

    const { activeScrollBarX, activeScrollBarY } = this.state;

    if (activeScrollBarX || activeScrollBarY) {
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

    this.refScrollY?.setHover(right <= 12);
    this.refScrollX?.setHover(right >= 12 && bottom <= 12);
  };

  private handleMouseLeave = () => {
    this.refScrollY?.setHover(false);
    this.refScrollX?.setHover(false);
  };
}
