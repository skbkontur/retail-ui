import React from 'react';
import shallowEqual from 'shallowequal';
import type { Emotion } from '@emotion/css/create-instance';
import warning from 'warning';

import type { GlobalObject } from '../../lib/globalObject.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import type { Nullable } from '../../typings/utility-types.js';
import { isFunction } from '../../lib/utils.js';
import { ZIndex } from '../../internal/ZIndex/index.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Sticky.styles.js';

const MAX_REFLOW_RETRIES = 5;

export interface StickyProps extends Omit<CommonProps, 'children'> {
  /** Задает сторону залипания. */
  side: 'top' | 'bottom';

  /** Задает отступ от края экрана в пикселях, на который сдвигается элемент в залипшем состоянии.
   * @default 0 */
  offset?: number;

  /** Задает функцию, которая возвращает DOM-элемент, который нельзя пересекать. */
  getStop?: () => Nullable<HTMLElement>;

  /** @ignore */
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);
}

export interface StickyState {
  fixed: boolean;
  deltaHeight: number;
  height?: number;
  width?: number;
  left?: number;
  stopped: boolean;
  relativeTop: number;
}

export const StickyDataTids = {
  root: 'Sticky__root',
} as const;

type DefaultProps = Required<Pick<StickyProps, 'offset'>>;

/**
 * `Sticky` позволяет закреплять элемент интерфейса в определенной позиции на экране при прокрутке страницы.
 * Это полезно для создания "прилипающих" элементов, которые остаются видимыми при прокрутке содержимого.
 */
@withRenderEnvironment
@rootNode
export class Sticky extends React.Component<StickyProps, StickyState> {
  public static __KONTUR_REACT_UI__ = 'Sticky';
  public static displayName = 'Sticky';

  public static defaultProps: DefaultProps = { offset: 0 };

  private getProps = createPropsGetter(Sticky.defaultProps);

  public state: StickyState = {
    fixed: false,
    deltaHeight: 0,
    stopped: false,
    relativeTop: 0,
  };

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private wrapper: Nullable<HTMLElement>;
  private inner: Nullable<HTMLElement>;
  private layoutSubscription: { remove: Nullable<() => void> } = { remove: null };
  private reflowCounter = 0;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount() {
    this.reflow();

    this.layoutSubscription = LayoutEvents.addListener(this.reflow, this.globalObject);
  }

  public componentWillUnmount() {
    if (this.layoutSubscription.remove) {
      this.layoutSubscription.remove();
    }
  }

  public componentDidUpdate(prevProps: StickyProps, prevState: StickyState) {
    if (!shallowEqual(prevProps, this.props) || !shallowEqual(prevState, this.state)) {
      if (this.reflowCounter < MAX_REFLOW_RETRIES) {
        this.reflow();
        this.reflowCounter += 1;
        return;
      }
    }
    this.reflowCounter = 0;
  }

  public render() {
    this.styles = getStyles(this.emotion);
    return this.renderMain();
  }

  private renderMain() {
    let { children } = this.props;
    const { side } = this.props;
    const offset = this.getProps().offset;
    const { fixed, stopped, relativeTop, deltaHeight, width, height, left } = this.state;
    const innerStyle: React.CSSProperties = {};

    if (fixed) {
      if (stopped) {
        innerStyle.top = relativeTop;
        innerStyle[side === 'top' ? 'marginTop' : 'marginBottom'] = deltaHeight;
      } else {
        innerStyle.width = width;
        innerStyle[side] = offset;
        innerStyle.left = left;
      }
    }

    if (isFunction(children)) {
      children = children(fixed);
    }

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={StickyDataTids.root} ref={this.refWrapper} className={this.styles.wrapper()}>
          <ZIndex
            priority="Sticky"
            applyZIndex={fixed}
            className={this.cx(this.styles.inner(), {
              [this.styles.fixed()]: fixed && !stopped,
              [this.styles.stopped()]: stopped,
            })}
            style={innerStyle}
            wrapperRef={this.refInner}
          >
            <div className={this.styles.container()}>{children}</div>
          </ZIndex>
          {fixed && !stopped ? <div style={{ width, height }} /> : null}
        </div>
      </CommonWrapper>
    );
  }

  private refWrapper = (ref: Nullable<HTMLElement>) => (this.wrapper = ref);

  private refInner = (ref: Nullable<HTMLElement>) => (this.inner = ref);

  /**
   * Пересчитать габариты и позицию залипшего элемента
   *
   * @public
   */
  public reflow = () => {
    if (!this.globalObject.document?.documentElement) {
      warning(false, 'There is no "documentElement" in document');
      return;
    }

    const windowHeight = this.globalObject.innerHeight || this.globalObject.document.documentElement.clientHeight;
    if (!this.wrapper || !this.inner) {
      return;
    }
    const { top, bottom, left, width } = getDOMRect(this.wrapper);
    const { height } = getDOMRect(this.inner);
    const { getStop, side } = this.props;
    const { fixed: prevFixed, height: prevHeight = height } = this.state;
    const offset = this.getProps().offset;
    const fixed = side === 'top' ? Math.ceil(top) < offset : Math.floor(bottom) > windowHeight - offset;

    this.setState({ fixed, left });

    if (fixed && !prevFixed) {
      this.setState({ width, height });
    }

    if (fixed) {
      this.setState({ width });
      const stop = getStop && getStop();
      if (stop) {
        const deltaHeight = prevHeight - height;
        const stopRect = getDOMRect(stop);
        const outerHeight = height + offset;
        let stopped = false;
        let relativeTop = 0;

        if (side === 'top') {
          stopped = stopRect.top - outerHeight < 0;
          relativeTop = stopRect.top - prevHeight - top;
        } else {
          stopped = stopRect.bottom + outerHeight > windowHeight;
          relativeTop = stopRect.bottom - top;
        }

        this.setState({ relativeTop, deltaHeight, stopped });
      }
    }
  };
}
