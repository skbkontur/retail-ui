// @flow

import React from 'react';

import HintBox from './HintBox';

type Props = {
  children?: any,
  pos: 'top' | 'right' | 'bottom' | 'left',
  text: string,
  manual: boolean,
  maxWidth: string | number,
  opened: boolean,
  onMouseEnter: (e: SyntheticMouseEvent) => void,
  onMouseLeave: (e: SyntheticMouseEvent) => void
};

export default class Hint extends React.Component {
  static defaultProps = {
    pos: 'top',
    manual: false,
    opened: false,
    maxWidth: (200: string | number),
    onMouseEnter: (e: SyntheticMouseEvent) => {},
    onMouseLeave: (e: SyntheticMouseEvent) => {}
  };

  props: Props;
  state: {
    opened: boolean
  } = {
    opened: false
  };

  _timer: number = 0;
  _dom: ?HTMLElement;

  componentDidMount() {
    this.setState({
      opened: this.props.manual ? this.props.opened : false
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.manual) {
      return;
    }

    if (nextProps.opened !== this.props.opened) {
      this.setState({ opened: nextProps.opened });
    }
  }

  isOpened() {
    return this.state.opened;
  }

  render() {
    return (
      <span
        ref={this._ref}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        {this.props.children}
        {this.isOpened() &&
          <HintBox
            getTarget={this._getDOM}
            text={this.props.text}
            pos={this.props.pos}
            maxWidth={this.props.maxWidth}
          />}
      </span>
    );
  }

  _ref = (el: ?HTMLElement) => {
    this._dom = el;
  };

  _getDOM = () => {
    return this._dom;
  };

  _handleMouseEnter = e => {
    if (!this.props.manual) {
      this._timer = setTimeout(this._open, 400);
    }
    this.props.onMouseEnter(e);
  };

  _handleMouseLeave = e => {
    if (!this.props.manual) {
      clearTimeout(this._timer);
      this.setState({ opened: false });
    }
    this.props.onMouseLeave(e);
  };

  _open = () => {
    this.setState({ opened: true });
  };
}
