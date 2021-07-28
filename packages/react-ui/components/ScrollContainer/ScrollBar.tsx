import React from 'react';
import cn from 'classnames';

import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './ScrollContainer.styles';
import { getScrollSizeParams, scrollSizeParametersNames } from './ScrollContainer.helpers';

export type ScrollAxis = 'x' | 'y';
export type ScrollBarScrollState = 'begin' | 'middle' | 'end';

export interface ScrollStateProps {
  active: boolean;
  hover: boolean;
  scrolling: boolean;
  size: number;
  pos: number;
  state: ScrollBarScrollState;
}

export interface ScrollBarProps extends ScrollStateProps {
  invert: boolean;
  axis: ScrollAxis;
  className?: string;
  onChangeState: (props: Partial<ScrollStateProps>, axis: ScrollAxis) => void;
  onScrollStateChange?: (state: ScrollBarScrollState, axis: ScrollAxis) => void;
}

export class ScrollBar extends React.Component<ScrollBarProps> {
  private inner: Nullable<HTMLElement>;
  private scroll: Nullable<HTMLElement>;
  private theme!: Theme;

  public componentDidMount() {
    this.reflow(this.inner);
  }

  public componentDidUpdate() {
    this.reflow(this.inner);
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
    const props = this.props;

    if (!props.active) {
      return null;
    }

    const { customScrollPos, customScrollSize } = scrollSizeParametersNames[this.props.axis];

    const classNames = cn(props.className, jsStyles.scrollBar(this.theme), this.scrollBarStyles, {
      [jsStyles.scrollBarInvert(this.theme)]: props.invert,
    });

    const styles: React.CSSProperties = {
      [customScrollPos]: props.pos,
      [customScrollSize]: props.size,
    };

    return <div ref={this.refScroll} style={styles} className={classNames} onMouseDown={this.handleScrollMouseDown} />;
  };

  public reflow = (inner: Nullable<HTMLElement>) => {
    if (!inner) {
      return;
    }

    const props = this.props;
    const { scrollSize, scrollPos, scrollActive } = getScrollSizeParams(inner, this.props.axis);

    if (!scrollActive && !props.active) {
      return;
    }

    if (props.active !== scrollActive || props.size !== scrollSize || props.pos !== scrollPos) {
      const scrollState = this.getImmediateScrollState();

      if (scrollState !== props.state) {
        this.props.onScrollStateChange?.(scrollState, props.axis);
      }

      this.props.onChangeState(
        {
          active: scrollActive,
          size: scrollSize,
          pos: scrollPos,
          state: scrollState,
        },
        props.axis,
      );
    }
  };

  public setInnerElement = (inner: Nullable<HTMLElement>) => {
    this.inner = inner;
    this.reflow(this.inner);
  };

  private get scrollBarStyles() {
    const props = this.props;

    if (this.props.axis === 'x') {
      return cn(jsStyles.scrollBarX(this.theme), {
        [jsStyles.scrollBarXHover(this.theme)]: props.hover || props.scrolling,
      });
    }

    return cn(jsStyles.scrollBarY(this.theme), {
      [jsStyles.scrollBarYHover(this.theme)]: props.hover || props.scrolling,
    });
  }

  private refScroll = (element: HTMLElement | null) => {
    const handleScrollWheel = (event: Event) => this.handleScrollWheel(event, this.props.axis);

    if (!this.scroll && element) {
      element.addEventListener('wheel', handleScrollWheel, { passive: false });
    }
    if (this.scroll && !element) {
      this.scroll.removeEventListener('wheel', handleScrollWheel);
    }
    this.scroll = element;
  };

  private handleScrollMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.inner) {
      return;
    }

    const { offset, size, pos, coord } = scrollSizeParametersNames[this.props.axis];

    const initialCoord = event[coord];
    const target: Document = window.document;
    const initialScrollPos = this.inner[pos];
    const props = this.props;

    const mouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!this.inner) {
        return;
      }

      const ratio = (this.inner[size] - this.inner[offset]) / (this.inner[offset] - props.size);
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
      props.onChangeState({ ...this.state, scrolling: false }, props.axis);
    };

    target.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);
    props.onChangeState({ ...this.state, scrolling: false }, props.axis);

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

    if (this.inner[pos] === this.inner[size] - this.inner[clientSize]) {
      return 'end';
    }

    return 'middle';
  };
}
