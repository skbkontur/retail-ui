import * as React from 'react';
import * as PropTypes from 'prop-types';
import LayoutEvents from '../../lib/LayoutEvents';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Nullable } from '../../typings/utility-types';
import styles from './Sticky.module.less';
import { isFunction } from '../../lib/utils';
import { cx } from '../../lib/theming/Emotion';
import warning from 'warning';

export interface StickyProps {
  side: 'top' | 'bottom';
  offset?: number;
  getStop?: () => Nullable<HTMLElement>;
  children?: React.ReactNode | ((fixed: boolean) => React.ReactNode);

  /**
   * @deprecated работа с margin у детей возможна без указания этого флага
   * @default false
   */
  allowChildWithMargins?: boolean;
}

export interface StickyState {
  fixed: boolean;
  deltaHeight: number;
  height: number;
  width: number;
  stopped: boolean;
  relativeTop: number;
}

export default class Sticky extends React.Component<StickyProps, StickyState> {
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
    allowChildWithMargins: PropTypes.bool,
  };

  public static defaultProps = { offset: 0 };

  public state: StickyState = {
    fixed: false,
    deltaHeight: 0,
    height: -1,
    width: -1,
    stopped: false,
    relativeTop: 0,
  };

  private wrapper: Nullable<HTMLElement>;
  private inner: Nullable<HTMLElement>;

  private scheduled: boolean = false;
  private reflowing: boolean = false;
  private layoutSubscription: { remove: Nullable<() => void> } = { remove: null };

  private getProps = createPropsGetter(Sticky.defaultProps);

  public componentDidMount() {
    warning(
      this.props.allowChildWithMargins === undefined,
      '"allowChildWithMargins" prop is deprecated. Component "Sticky" work correctly without it.',
    );
    this.reflow();

    this.layoutSubscription = LayoutEvents.addListener(this.reflow);
  }

  public componentWillUnmount() {
    if (this.layoutSubscription.remove) {
      this.layoutSubscription.remove();
    }
  }

  public componentDidUpdate() {
    this.reflow();
  }

  public render() {
    let innerStyle: React.CSSProperties = {};

    if (this.state.fixed) {
      if (this.state.stopped) {
        innerStyle = {
          top: this.state.relativeTop,
        };
        if (this.props.side === 'top') {
          innerStyle.marginTop = this.state.deltaHeight;
        } else {
          innerStyle.marginBottom = this.state.deltaHeight;
        }
      } else {
        innerStyle = {
          width: this.state.width,
        };

        if (this.props.side === 'top') {
          innerStyle.top = this.props.offset;
        } else {
          innerStyle.bottom = this.props.offset;
        }
      }
    }

    let children = this.props.children;
    if (isFunction(children)) {
      children = children(this.state.fixed);
    }

    innerStyle.display = 'flex';

    return (
      <div ref={this.refWrapper}>
        <div
          className={cx({
            [styles.innerFixed]: this.state.fixed,
            [styles.innerStopped]: this.state.stopped,
          })}
          style={innerStyle}
          ref={this.refInner}
        >
          <div style={{ flex: 'auto' }}>{children}</div>
        </div>
        {this.state.fixed && !this.state.stopped ? (
          <div style={{ width: this.state.width, height: this.state.height }} />
        ) : null}
      </div>
    );
  }

  private refWrapper = (ref: Nullable<HTMLElement>) => (this.wrapper = ref);

  private refInner = (ref: Nullable<HTMLElement>) => (this.inner = ref);

  private reflow = () => {
    if (this.reflowing) {
      this.scheduled = true;
      return;
    }

    this.scheduled = false;
    this.reflowing = true;
    const generator = this.doReflow();
    const check = () => {
      const next = generator.next();
      if (next.done) {
        this.reflowing = false;
        if (this.scheduled) {
          this.reflow();
        }
      } else {
        this.setStateIfChanged(next.value, check);
      }
    };
    check();
  };

  private *doReflow(): Generator {
    const { documentElement } = document;

    if (!documentElement) {
      throw Error('There is no "documentElement" in document');
    }

    const windowHeight = window.innerHeight || documentElement.clientHeight;
    if (!this.wrapper || !this.inner) {
      return;
    }
    const { top, bottom } = this.wrapper.getBoundingClientRect();
    const { width, height } = this.inner.getBoundingClientRect();
    const fixed =
      this.props.side === 'top'
        ? Math.round(top) < this.getProps().offset
        : Math.round(bottom) > windowHeight - this.getProps().offset;

    const wasFixed = this.state.fixed;

    if (fixed && !wasFixed) {
      yield { width, height, fixed };
    }
    if (!fixed && wasFixed) {
      yield { fixed };
    }

    if (fixed) {
      const stop = this.props.getStop && this.props.getStop();
      if (stop) {
        const deltaHeight = this.state.height - height;
        const stopRect = stop.getBoundingClientRect();
        const outerHeight = height + this.getProps().offset;

        if (this.props.side === 'top') {
          const stopped = stopRect.top - outerHeight < 0;
          const relativeTop = stopRect.top - height - top;

          yield { relativeTop, stopped, deltaHeight };
        } else {
          const stopped = stopRect.bottom + outerHeight > windowHeight;
          const relativeTop = stopRect.bottom - top;

          yield { relativeTop, stopped, deltaHeight };
        }
      }
    }
  }

  private setStateIfChanged(state: StickyState, callback?: () => void) {
    for (const key in state) {
      if (this.state[key as keyof StickyState] !== state[key as keyof StickyState]) {
        this.setState(state, callback);
        return;
      }
    }

    if (callback) {
      callback();
    }
  }
}
