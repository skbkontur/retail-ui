/* @flow */

import React, { PropTypes } from 'react';

import LayoutEvents from '../../lib/LayoutEvents';

type Props = {
  side: 'top' | 'bottom',
  offset: number,
  getStop?: () => ?HTMLElement,
  children?: any
}

type State = {
  fixed: bool,
  height: number,
  left: (number | string),
  width: (number | string),

  stopped: bool,
  relativeTop: number,
};

export default class Sticky extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * Функция, которая возвращает DOM-элемент, который нельзя пересекать.
     */
    getStop: PropTypes.func,

    /**
     * Отступ от границы в пикселях
     **/
    offset: PropTypes.number,

    side: PropTypes.oneOf(['top', 'bottom']).isRequired
  };

  static defaultProps: {offset: number} = {
    offset: 0
  };

  props: Props;

  state: State;

  _wrapper: HTMLElement;
  _inner: HTMLElement;

  _scheduled: bool = false;
  _reflowing: bool = false;
  _lastInnerHeight: number = -1;
  _layoutSubscription: {remove: () => void};

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      fixed: false,
      height: -1,
      left: 'auto',
      width: 'auto',

      stopped: false,
      relativeTop: 0
    };
  }

  render() {
    let wrapperStyle = null;
    let innerStyle = null;
    if (this.state.fixed) {
      if (this.state.stopped) {
        innerStyle = {
          position: 'relative',
          top: this.state.relativeTop
        };
      } else {
        wrapperStyle = {
          height: this.state.height === -1 ? 'auto' : this.state.height
        };

        innerStyle = ({
          left: this.state.left,
          position: 'fixed',
          width: this.state.width,
          zIndex: 100
        }: Object);

        if (this.props.side === 'top') {
          innerStyle.top = this.props.offset;
        } else {
          innerStyle.bottom = this.props.offset;
        }
      }
    }

    let children = this.props.children;
    if (typeof children === 'function') {
      children = children(this.state.fixed);
    }

    return (
      <div style={wrapperStyle} ref={this._refWrapper}>
        <div style={innerStyle} ref={this._refInner}>
          {children}
        </div>
      </div>
    );
  }

  _refWrapper = (ref: HTMLElement) => {
    this._wrapper = ref;
  };

  _refInner = (ref: HTMLElement) => {
    this._inner = ref;
  };

  componentDidMount() {
    this._reflow();

    this._layoutSubscription = LayoutEvents.addListener(() => this._reflow());
  }

  componentWillUnmount() {
    this._layoutSubscription.remove();
  }

  componentDidUpdate() {
    this._reflow();
  }

  _reflow = () => {
    if (this._reflowing) {
      this._scheduled = true;
      return;
    }

    this._scheduled = false;
    this._reflowing = true;
    const generator = this._doReflow();
    const check = () => {
      const next = generator.next();
      if (next.done) {
        this._reflowing = false;
        if (this._scheduled) {
          this._reflow();
        }
      } else {
        this._setStateIfChanged(next.value, check);
      }
    };
    check();
  };

  *_doReflow(): Generator<$Shape<State>, void, void> {
    const { documentElement } = document;

    if (!documentElement) {
      throw Error('There is no "documentElement" in document');
    }

    const windowHeight = window.innerHeight ||
      documentElement.clientHeight;
    const wrapRect = this._wrapper.getBoundingClientRect();
    const wrapLeft = wrapRect.left;
    const wrapTop = wrapRect.top;
    const fixed = this.props.side === 'top'
      ? wrapTop < this.props.offset
      : wrapRect.bottom > windowHeight - this.props.offset;

    const wasFixed = this.state.fixed;

    if (fixed) {
      const width = Math.floor(wrapRect.right - wrapRect.left);

      let height = this.state.height;
      if (
        !wasFixed ||
        this.state.width !== width ||
        this._lastInnerHeight !== this._inner.offsetHeight
      ) {
        yield {
          fixed: false,
          height
        };
        height = this._inner.offsetHeight;
      }

      yield {
        width,
        height,
        fixed: true,
        left: wrapLeft
      };

      this._lastInnerHeight = this._inner.offsetHeight;

      const stop = this.props.getStop && this.props.getStop();
      if (stop) {
        const stopRect = stop.getBoundingClientRect();
        const outerHeight = height + this.props.offset;

        if (this.props.side === 'top') {
          const stopped = stopRect.top - outerHeight < 0;
          const relativeTop = stopRect.top - height - wrapTop;

          yield { relativeTop, stopped };
        } else {
          const stopped = stopRect.bottom + outerHeight > windowHeight;
          const relativeTop = stopRect.bottom - wrapTop;

          yield { relativeTop, stopped };
        }
      }
    } else {
      yield { fixed: false };
    }
  }

  _setStateIfChanged(state: $Shape<State>, callback?: () => void) {
    for (const key in state) {
      if (this.state[key] !== state[key]) {
        this.setState(state, callback);
        return;
      }
    }

    callback && callback();
  }
}
