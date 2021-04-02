import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import cn from 'classnames';

import * as LayoutEvents from '../../lib/LayoutEvents';
import { Nullable } from '../../typings/utility-types';
import { isFunction } from '../../lib/utils';
import { ZIndex } from '../../internal/ZIndex';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Sticky.styles';

const MAX_REFLOW_RETRIES = 5;

export interface StickyProps extends CommonProps {
  side: 'top' | 'bottom';
  /**
   * Отступ в пикселях от края экрана, на сколько сдвигается элемент в залипшем состоянии
   * @default 0
   */
  offset: number;
  getStop?: () => Nullable<HTMLElement>;
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

export class Sticky extends React.Component<StickyProps, StickyState> {
  public static __KONTUR_REACT_UI__ = 'Sticky';

  public static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * Функция, которая возвращает DOM-элемент, который нельзя пересекать.
     */
    getStop: PropTypes.func,

    /**
     * Отступ от границы в пикселях
     */
    offset: PropTypes.number,

    side: PropTypes.oneOf(['top', 'bottom']).isRequired,
  };

  public static defaultProps = { offset: 0 };

  public state: StickyState = {
    fixed: false,
    deltaHeight: 0,
    stopped: false,
    relativeTop: 0,
  };

  private wrapper: Nullable<HTMLElement>;
  private inner: Nullable<HTMLElement>;
  private layoutSubscription: { remove: Nullable<() => void> } = { remove: null };
  private reflowCounter = 0;

  public componentDidMount() {
    this.reflow();

    this.layoutSubscription = LayoutEvents.addListener(this.reflow);
  }

  public componentWillUnmount() {
    if (this.layoutSubscription.remove) {
      this.layoutSubscription.remove();
    }
  }

  public componentDidUpdate(prevProps: StickyProps, prevState: StickyState) {
    if (!shallowEqual(prevProps, this.props) || !shallowEqual(prevState, this.state)) {
      if (this.reflowCounter < MAX_REFLOW_RETRIES) {
        LayoutEvents.emit();
        this.reflowCounter += 1;
        return;
      }
    }
    this.reflowCounter = 0;
  }

  public render() {
    let { children } = this.props;
    const { side, offset } = this.props;
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
      <CommonWrapper {...this.props}>
        <div ref={this.refWrapper} className={jsStyles.wrapper()}>
          <ZIndex
            priority="Sticky"
            applyZIndex={fixed}
            className={cn(jsStyles.inner(), {
              [jsStyles.fixed()]: fixed && !stopped,
              [jsStyles.stopped()]: stopped,
            })}
            style={innerStyle}
            wrapperRef={this.refInner}
          >
            <div className={jsStyles.container()}>{children}</div>
          </ZIndex>
          {fixed && !stopped ? <div style={{ width, height }} /> : null}
        </div>
      </CommonWrapper>
    );
  }

  private refWrapper = (ref: Nullable<HTMLElement>) => (this.wrapper = ref);

  private refInner = (ref: Nullable<HTMLElement>) => (this.inner = ref);

  private reflow = () => {
    const { documentElement } = document;

    if (!documentElement) {
      throw Error('There is no "documentElement" in document');
    }

    const windowHeight = window.innerHeight || documentElement.clientHeight;
    if (!this.wrapper || !this.inner) {
      return;
    }
    const { top, bottom, left } = this.wrapper.getBoundingClientRect();
    const { width, height } = this.inner.getBoundingClientRect();
    const { offset, getStop, side } = this.props;
    const { fixed: prevFixed, height: prevHeight = height } = this.state;
    const fixed = side === 'top' ? top < offset : bottom > windowHeight - offset;

    this.setState({ fixed, left });

    if (fixed && !prevFixed) {
      this.setState({ width, height });
    }

    if (fixed) {
      const stop = getStop && getStop();
      if (stop) {
        const deltaHeight = prevHeight - height;
        const stopRect = stop.getBoundingClientRect();
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
