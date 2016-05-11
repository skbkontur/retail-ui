/* @flow */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

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

  props: Props;

  static propTypes = {
    side: PropTypes.oneOf(['top', 'bottom']).isRequired,

    /**
     * Отступ от границы в пикселях
     **/
    offset: PropTypes.number,

    /**
     * Функция, которая возвращает DOM-элемент, который нельзя пересекать.
     */
    getStop: PropTypes.func,

    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  };

  state: State;

  _wrapper: HTMLElement;
  _inner: HTMLElement;

  _immediateState: $Shape<State>;
  /**
   * Should this be a flag? For now just err on the side of caution and make it
   * a counter.
   */
  _pendingSetState: number;
  _layoutSubscription: {remove: () => void};

  static defaultProps: {offset: number} = {
    offset: 0,
  };

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      fixed: false,
      height: -1,
      left: 'auto',
      width: 'auto',

      stopped: false,
      relativeTop: 0,
    };

    this._immediateState = {};
    this._pendingSetState = 0;
  }

  render() {
    let wrapperStyle = null;
    let innerStyle = null;
    if (this.state.fixed) {
      if (this.state.stopped) {
        innerStyle = {
          position: 'relative',
          top: this.state.relativeTop,
        };
      } else {
        wrapperStyle = {
          height: this.state.height === -1 ? 'auto' : this.state.height,
        };

        innerStyle = ({
          left: this.state.left,
          position: 'fixed',
          width: this.state.width,
          zIndex: 100,
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

  // $FlowIssue 850
  _refWrapper = (ref) => {
    this._wrapper = ref;
  };

  // $FlowIssue 850
  _refInner = (ref) => {
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

  // $FlowIssue 850
  _reflow = () => {
    if (this._pendingSetState) {
      return;
    }

    const windowHeight = window.innerHeight;
    const wrapRect = this._wrapper.getBoundingClientRect();
    const wrapBottom = wrapRect.bottom;
    const wrapLeft = wrapRect.left;
    const wrapTop = wrapRect.top;
    const fixed = this.props.side === 'top'
      ? wrapTop < this.props.offset
      : wrapBottom > windowHeight - this.props.offset;

    this._setStateIfChanged({fixed});

    if (fixed) {
      const width = this._wrapper.offsetWidth;
      const widthHasChanged = this.state.width !== width;
      this._setStateIfChanged(
        {
          width,
          fixed: widthHasChanged ? false : fixed,
          left: wrapLeft,
        },
        () => {
          const height = widthHasChanged
            ? this._inner.offsetHeight
            : this.state.height;
          this._setStateIfChanged({height, fixed});

          if (this.props.getStop) {
            const stop = this.props.getStop();
            if (stop) {
              const stopRect = stop.getBoundingClientRect();
              const outerHeight = height + this.props.offset;

              if (this.props.side === 'top') {
                const stopped = stopRect.top - outerHeight < 0;
                const relativeTop = stopRect.top - height - wrapTop;
                this._setStateIfChanged({relativeTop, stopped});
              } else {
                const stopped = stopRect.bottom + outerHeight > windowHeight;
                const relativeTop = stopRect.bottom - wrapTop;
                this._setStateIfChanged({relativeTop, stopped});
              }
            }
          }
        },
      );
    }
  };

  _setStateIfChanged(state: $Shape<State>, callback?: () => void) {
    let changed = false;
    for (const key in state) {
      if (this._immediateState[key] !== state[key]) {
        changed = true;
        this._immediateState[key] = state[key];
      }
    }

    if (changed) {
      this._pendingSetState++;
      this.setState(state, () => {
        this._pendingSetState--;
        callback && callback();
      });
    } else {
      if (callback) {
        callback();
      }
    }
  };
}
