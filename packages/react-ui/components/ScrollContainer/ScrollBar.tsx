import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { cx } from '../../lib/theming/Emotion';

import { defaultScrollbarState, scrollSizeParametersNames } from './ScrollContainer.constants';
import { styles, globalClasses } from './ScrollContainer.styles';
import { getScrollSizeParams } from './ScrollContainer.helpers';

export type ScrollAxis = 'x' | 'y';
export type ScrollBarScrollState = 'begin' | 'middle' | 'end';

export interface ScrollBarState {
  active: boolean;
  hover: boolean;
  scrolling: boolean;
  size: number;
  pos: number;
  scrollState: ScrollBarScrollState;
}

export interface ScrollBarProps {
  invert: boolean;
  axis: ScrollAxis;
  className?: string;
  onScrollStateChange?: (state: ScrollBarScrollState, axis: ScrollAxis) => void;
}

export class ScrollBar extends React.Component<ScrollBarProps, ScrollBarState> {
  private inner: Nullable<HTMLElement>;
  private theme!: Theme;

  public node: Nullable<HTMLElement>;
  public state: ScrollBarState = {
    ...defaultScrollbarState,
  };

  public componentDidMount() {
    this.reflow();
  }

  public componentDidUpdate() {
    this.reflow();
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain = () => {
    const state = this.state;
    const props = this.props;

    if (!state.active) {
      return null;
    }

    const { customScrollPos, customScrollSize } = scrollSizeParametersNames[this.props.axis];

    const classNames = cx(props.className, styles.scrollBar(this.theme), this.scrollBarStyles, {
      [styles.scrollBarInvert(this.theme)]: props.invert,
    });

    const inlineStyles: React.CSSProperties = {
      [customScrollPos]: state.pos,
      [customScrollSize]: state.size,
    };

    return (
      <div
        ref={this.refScroll}
        style={inlineStyles}
        className={classNames}
        onMouseDown={this.handleScrollMouseDown}
        data-tid={`ScrollContainer__ScrollBar-${props.axis}`}
      />
    );
  };

  public reflow = () => {
    if (!this.inner) {
      return;
    }

    const props = this.props;
    const state = this.state;

    const { scrollSize, scrollPos, scrollActive } = getScrollSizeParams(this.inner, props.axis);

    if (!scrollActive && !state.active) {
      return;
    }

    if (state.active !== scrollActive || state.size !== scrollSize || state.pos !== scrollPos) {
      const scrollState = this.getImmediateScrollState();

      if (scrollState !== state.scrollState) {
        this.props.onScrollStateChange?.(scrollState, props.axis);
      }

      this.setState({
        ...this.state,
        active: scrollActive,
        size: scrollSize,
        pos: scrollPos,
        scrollState,
      });
    }
  };

  public setInnerElement = (inner: Nullable<HTMLElement>) => {
    this.inner = inner;
    this.reflow();
  };

  public setHover(hover: boolean) {
    if (this.state.active && this.state.hover !== hover) {
      this.setState({ ...this.state, hover });
    }
  }

  public get scrollBarState() {
    return this.state.scrollState;
  }

  private get scrollBarStyles() {
    const state = this.state;

    if (this.props.axis === 'x') {
      return cx(styles.scrollBarX(this.theme), globalClasses.scrollbarX, {
        [styles.scrollBarXHover(this.theme)]: state.hover || state.scrolling,
      });
    }

    return cx(styles.scrollBarY(this.theme), globalClasses.scrollbarY, {
      [styles.scrollBarYHover(this.theme)]: state.hover || state.scrolling,
    });
  }

  private refScroll = (element: HTMLElement | null) => {
    const handleScrollWheel = (event: Event) => this.handleScrollWheel(event, this.props.axis);

    if (!this.node && element) {
      element.addEventListener('wheel', handleScrollWheel, { passive: false });
    }
    if (this.node && !element) {
      this.node.removeEventListener('wheel', handleScrollWheel);
    }
    this.node = element;
  };

  private handleScrollMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.inner) {
      return;
    }

    const { offset, size, pos, coord } = scrollSizeParametersNames[this.props.axis];

    const initialCoord = event[coord];
    const target: Document = window.document;
    const initialScrollPos = this.inner[pos];
    const state = this.state;

    const mouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!this.inner) {
        return;
      }

      const ratio = (this.inner[size] - this.inner[offset]) / (this.inner[offset] - state.size);
      const delta = (mouseMoveEvent[coord] - initialCoord) * ratio;

      this.inner[pos] = initialScrollPos + delta;

      if (mouseMoveEvent.preventDefault) {
        mouseMoveEvent.preventDefault();
      }

      if (Object.prototype.hasOwnProperty.call(mouseMoveEvent, 'returnValue')) {
        (
          mouseMoveEvent as MouseEvent & {
            returnValue: boolean;
          }
        ).returnValue = false;
      }
    };

    const mouseUp = () => {
      target.removeEventListener('mousemove', mouseMove);
      target.removeEventListener('mouseup', mouseUp);
      this.setState({ ...this.state, scrolling: false });
    };

    target.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);
    this.setState({ ...this.state, scrolling: true });

    event.preventDefault();
  };

  private handleScrollWheel = (event: Event, axis: ScrollAxis) => {
    if (!this.inner || !(event instanceof WheelEvent) || (axis === 'x' && !event.shiftKey)) {
      return;
    }

    const { offset, size, pos } = scrollSizeParametersNames[axis];

    const scrollSize = this.inner[size];
    const scrollPos = this.inner[pos];
    const offsetHeight = this.inner[offset];

    if (event.deltaY > 0 && scrollSize <= scrollPos + offsetHeight) {
      return;
    }
    if (event.deltaY < 0 && scrollPos <= 0) {
      return;
    }

    this.inner[pos] += event.deltaY;

    event.preventDefault();
  };

  private getImmediateScrollState = (): ScrollBarScrollState => {
    const { pos, size, clientSize } = scrollSizeParametersNames[this.props.axis];

    if (!this.inner || this.inner[pos] === 0) {
      return 'begin';
    }
    // Zoom in Chrome causes problems
    // https://github.com/skbkontur/retail-ui/pull/2705#issue-806286945
    const maxScrollPos = this.inner[size] - this.inner[clientSize];
    if (Math.abs(maxScrollPos - this.inner[pos]) <= 1) {
      return 'end';
    }

    return 'middle';
  };
}
