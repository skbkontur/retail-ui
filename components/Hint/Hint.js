// @flow

import React from 'react';

import HintBox from './HintBox';

type Props = {
  children: any,
  pos: 'top' | 'right' | 'bottom' | 'left',
  text: string,
};

export default class Hint extends React.Component {
  static defaultProps = {
    pos: 'top'
  };

  props: Props;

  state = {
    opened: false
  };

  _timer: number = 0;
  _dom: ?HTMLElement;

  render() {
    return (
      <span
        ref={this._ref}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        {this.props.children}
        {this.state.opened && (
          <HintBox
            getTarget={this._getDOM}
            text={this.props.text}
            pos={this.props.pos}
          />
        )}
      </span>
    );
  }

  _ref = (el: ?HTMLElement) => {
    this._dom = el;
  };

  _getDOM = () => {
    return this._dom;
  };

  _handleMouseEnter = () => {
    this._timer = setTimeout(this._open, 400);
  };

  _handleMouseLeave = () => {
    clearTimeout(this._timer);
    this.setState({ opened: false });
  };

  _open = () => {
    this.setState({ opened: true });
  };
}
