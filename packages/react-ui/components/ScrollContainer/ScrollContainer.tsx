import type { Emotion } from '@emotion/css/create-instance';
import debounce from 'lodash.debounce';
import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { callChildRef } from '../../lib/callChildRef/callChildRef.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { ScrollAxis, ScrollBarScrollState } from './ScrollBar.js';
import { ScrollBar } from './ScrollBar.js';
import { scrollSizeParametersNames } from './ScrollContainer.constants.js';
import {
  convertScrollbarXScrollState,
  convertScrollbarYScrollState,
  getScrollYOffset,
} from './ScrollContainer.helpers.js';
import { getStyles, globalClasses } from './ScrollContainer.styles.js';

export type ScrollContainerScrollStateX = 'left' | 'scroll' | 'right';
export type ScrollContainerScrollStateY = 'top' | 'scroll' | 'bottom';
export type ScrollBehaviour = 'auto' | 'smooth';

type OffsetCSSPropsY = 'top' | 'right' | 'bottom';
type OffsetCSSPropsX = 'right' | 'bottom' | 'left';

export interface ScrollContainerProps extends CommonProps {
  /** Инвертирует цвет скроллбара.
   * @default false */
  invert?: boolean;

  /** Задает максимальную высоту. */
  maxHeight?: React.CSSProperties['maxHeight'];

  /** Задает максимальную ширину. */
  maxWidth?: React.CSSProperties['maxWidth'];

  /** Отключает скролл окна, когда меню открыто.
   * @default false */
  preventWindowScroll?: boolean;

  /** Задает поведение скролла. (https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
   * @default 'auto' */
  scrollBehaviour?: ScrollBehaviour;

  /** Задает функцию, которая вызывается при скроле по горизонтали. */
  onScrollStateChangeX?: (scrollState: ScrollContainerScrollStateX) => void;

  /** Задает функцию, которая вызывается при скроле по вертикали. */
  onScrollStateChangeY?: (scrollState: ScrollContainerScrollStateY) => void;

  /** Задает функцию, которая вызывается при скроле. */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;

  /** Отключает кастомный скролл. */
  disabled?: boolean;

  /** Задает смещение вертикального скроллбара. */
  offsetY?: Partial<Record<OffsetCSSPropsY, React.CSSProperties[OffsetCSSPropsY]>>;

  /** Задает смещение горизонтального скроллбара. */
  offsetX?: Partial<Record<OffsetCSSPropsX, React.CSSProperties[OffsetCSSPropsX]>>;

  /** Определяет, нужно ли показывать скроллбар. */
  showScrollBar?: 'always' | 'scroll' | 'hover' | 'never';

  /** Устанавливает задержку в миллисекундах перед скрытием скроллбара.
   * Работает только при hideScrollBar = true или showScrollBar = 'scroll' | 'hover'. */
  hideScrollBarDelay?: number;

  /** Отключает анимацию. */
  disableAnimations?: boolean;
  scrollRef?: React.Ref<HTMLDivElement | null>;
}

export const ScrollContainerDataTids = {
  root: 'ScrollContainer__root',
  inner: 'ScrollContainer__inner',
} as const;

type DefaultProps = Required<
  Pick<
    ScrollContainerProps,
    'invert' | 'scrollBehaviour' | 'preventWindowScroll' | 'disableAnimations' | 'hideScrollBarDelay' | 'showScrollBar'
  >
>;

interface ScrollContainerState {
  isScrollBarXVisible: boolean;
  isScrollBarYVisible: boolean;
  isHovered: boolean;
}

/**
 * `ScrollContainer` используется для создания контейнера с кастомными полосами прокрутки, который обеспечивает прокрутку содержимого по горизонтали или вертикали.
 */
@withRenderEnvironment
@rootNode
export class ScrollContainer extends React.Component<ScrollContainerProps, ScrollContainerState> {
  public static __KONTUR_REACT_UI__ = 'ScrollContainer';
  public static displayName = 'ScrollContainer';

  public inner: Nullable<HTMLElement>;

  public static defaultProps: DefaultProps = {
    invert: false,
    scrollBehaviour: 'auto',
    preventWindowScroll: false,
    disableAnimations: isTestEnv,
    hideScrollBarDelay: 500,
    showScrollBar: 'always',
  };

  private getProps = createPropsGetter(ScrollContainer.defaultProps);

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private scrollX: Nullable<ScrollBar>;
  private scrollY: Nullable<ScrollBar>;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private initialIsScrollBarVisible = this.getProps().showScrollBar === 'always';

  public state: ScrollContainerState = {
    isScrollBarXVisible: this.initialIsScrollBarVisible,
    isScrollBarYVisible: this.initialIsScrollBarVisible,
    isHovered: false,
  };

  public componentDidMount() {
    this.updateInnerElement();
  }

  public componentDidUpdate(prevProps: ScrollContainerProps) {
    const preventWindowScroll = this.getProps().preventWindowScroll;
    if (this.inner) {
      if (prevProps.preventWindowScroll && !preventWindowScroll) {
        this.inner.removeEventListener('wheel', this.handleInnerScrollWheel);
      }
      if (!prevProps.preventWindowScroll && preventWindowScroll) {
        this.inner.addEventListener('wheel', this.handleInnerScrollWheel, { passive: false });
      }
    }

    if (prevProps.disabled !== this.props.disabled && !this.props.disabled) {
      this.updateInnerElement();
    }

    if (prevProps.showScrollBar !== this.props.showScrollBar) {
      if (this.props.showScrollBar === 'always') {
        this.setState({ isScrollBarXVisible: true, isScrollBarYVisible: true });
      } else if (this.props.showScrollBar === 'never') {
        this.setState({ isScrollBarXVisible: false, isScrollBarYVisible: false });
      }
    }
  }

  public render(): React.ReactNode {
    this.styles = getStyles(this.emotion);

    const props = this.props;

    if (this.props.disabled) {
      return this.props.children;
    }

    const innerStyle: React.CSSProperties = {
      scrollBehavior: this.getProps().scrollBehaviour,
      maxHeight: props.maxHeight,
      maxWidth: props.maxWidth,
    };

    const scrollbarY = this.renderScrollbar('y');
    const scrollbarX = this.renderScrollbar('x');

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div
          data-tid={ScrollContainerDataTids.root}
          className={this.styles.root()}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          {scrollbarY}
          {scrollbarX}
          <div
            style={innerStyle}
            ref={this.refInner}
            className={this.cx(this.styles.inner(), globalClasses.inner)}
            data-tid={ScrollContainerDataTids.inner}
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
   * @param {Element} element
   */
  public scrollTo(element: Nullable<HTMLElement>): void {
    if (!element || !this.inner) {
      return;
    }

    this.inner.scrollLeft = element.offsetLeft;
    this.inner.scrollTop = getScrollYOffset(element, this.inner);
  }

  /**
   * @public
   */
  public scrollToTop(): void {
    if (!this.inner) {
      return;
    }
    this.inner.scrollTop = 0;
  }

  /**
   * @public
   */
  public scrollToBottom(): void {
    if (!this.inner) {
      return;
    }
    this.inner.scrollTop = this.inner.scrollHeight - this.inner.offsetHeight;
  }

  /**
   * @public
   */
  public scrollToLeft(): void {
    if (!this.inner) {
      return;
    }
    this.inner.scrollLeft = 0;
  }

  /**
   * @public
   */
  public scrollToRight(): void {
    if (!this.inner) {
      return;
    }

    this.inner.scrollLeft = this.inner.scrollWidth - this.inner.offsetWidth;
  }

  public hasScrollBar(axis: ScrollAxis): boolean {
    if (!this.inner) {
      return false;
    }

    return axis === 'x'
      ? this.inner.offsetWidth < this.inner.scrollWidth
      : this.inner.offsetHeight < this.inner.scrollHeight;
  }

  private renderScrollbar = (axis: ScrollAxis) => {
    const { offsetY, offsetX, invert, disableAnimations } = this.getProps();
    const isAxisX = axis === 'x';
    const refScrollBar = isAxisX ? this.refScrollBarX : this.refScrollBarY;
    const offset = isAxisX ? offsetX : offsetY;
    const isVisible = isAxisX ? this.state.isScrollBarXVisible : this.state.isScrollBarYVisible;

    return (
      <ScrollBar
        axis={axis}
        ref={refScrollBar}
        invert={invert}
        onScroll={this.handleScroll}
        offset={offset}
        disableAnimations={disableAnimations}
        isVisible={isVisible}
      />
    );
  };

  private handleScrollStateChange = (scrollState: ScrollBarScrollState, axis: ScrollAxis) => {
    if (!this.scrollY || !this.scrollX) {
      return;
    }

    if (axis === 'x') {
      const scrollXState = convertScrollbarXScrollState(scrollState);

      this.props.onScrollStateChangeX?.(scrollXState);
      return;
    }

    const scrollYState = convertScrollbarYScrollState(scrollState);

    this.props.onScrollStateChangeY?.(scrollYState);
  };

  private handleScroll = (
    axis: ScrollAxis,
    scrollState: ScrollBarScrollState,
    prevScrollState: ScrollBarScrollState,
  ) => {
    if (scrollState !== prevScrollState) {
      this.handleScrollStateChange(scrollState, axis);
    }
    const { showScrollBar } = this.getProps();
    showScrollBar === 'scroll' && this.showScrollBarOnMouseWheel(axis);
  };

  private refScrollBarY = (scrollbar: Nullable<ScrollBar>) => {
    this.scrollY = scrollbar;
  };

  private refScrollBarX = (scrollbar: Nullable<ScrollBar>) => {
    this.scrollX = scrollbar;
  };

  private refInner = (element: HTMLElement | null) => {
    if (!this.inner && element && this.getProps().preventWindowScroll) {
      element.addEventListener('wheel', this.handleInnerScrollWheel, { passive: false });
    }
    if (this.inner && !element) {
      this.inner.removeEventListener('wheel', this.handleInnerScrollWheel);
    }
    this.inner = element;

    if (this.props.scrollRef) {
      callChildRef(this.props.scrollRef, element);
    }
  };

  private handleNativeScroll = (event: React.UIEvent<HTMLDivElement>) => {
    this.scrollY?.reflow();
    this.scrollX?.reflow();

    this.props.onScroll?.(event);
    if (this.getProps().preventWindowScroll) {
      event.preventDefault();
      return;
    }
    LayoutEvents.emit();
  };

  private showScrollBarOnMouseWheel = (axis: ScrollAxis) => {
    const isScrollBarVisible = axis === 'x' ? this.state.isScrollBarXVisible : this.state.isScrollBarYVisible;
    if (!isScrollBarVisible) {
      axis === 'x' ? this.setState({ isScrollBarXVisible: true }) : this.setState({ isScrollBarYVisible: true });
    }
    this.hideScrollBar(axis);
  };

  private readonly hideScrollBar = debounce((axis: ScrollAxis | 'both') => {
    if (this.state.isHovered) {
      return;
    }
    const isScrollBarXHovered = this.scrollX?.getHover();
    const isScrollBarYHovered = this.scrollY?.getHover();
    if (axis === 'both') {
      !isScrollBarXHovered && !isScrollBarYHovered
        ? this.setState({ isScrollBarXVisible: false, isScrollBarYVisible: false })
        : this.hideScrollBar('both');
    } else if (axis === 'x') {
      !isScrollBarXHovered ? this.setState({ isScrollBarXVisible: false }) : this.hideScrollBar('x');
    } else {
      !isScrollBarYHovered ? this.setState({ isScrollBarYVisible: false }) : this.hideScrollBar('y');
    }
  }, this.getProps().hideScrollBarDelay);

  private handleInnerScrollWheel = (event: Event) => {
    if (!this.inner || !isInstanceOf(event, this.globalObject.WheelEvent)) {
      return;
    }

    const axis: ScrollAxis = event.shiftKey ? 'x' : 'y';

    if (this.hasScrollBar(axis)) {
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
    const right = getDOMRect(event.currentTarget).right - event.pageX;
    const bottom = getDOMRect(event.currentTarget).bottom - event.pageY;

    this.scrollY?.setHover(right <= 12);
    this.scrollX?.setHover(right >= 12 && bottom <= 12);

    this.getProps().showScrollBar === 'hover' &&
      !this.state.isHovered &&
      this.setState({ isScrollBarXVisible: true, isScrollBarYVisible: true, isHovered: true });
  };

  private handleMouseLeave = () => {
    this.scrollY?.setHover(false);
    this.scrollX?.setHover(false);
    if (this.getProps().showScrollBar === 'hover') {
      this.setState({ isHovered: false });
      this.hideScrollBar('both');
    }
  };

  private updateInnerElement = () => {
    this.scrollX?.setInnerElement(this.inner);
    this.scrollY?.setInnerElement(this.inner);
  };
}
