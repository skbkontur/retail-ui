// @flow
import classNames from 'classnames';
import * as React from 'react';

import Popup from '../Popup';
import { ieVerison } from '../ensureOldIEClassName';

import styles from './HintBox.less';

const bgColor = ieVerison === 8 ? '#5b5b5b' : 'rgba(51, 51, 51, 0.8)';

type Props = {
  children?: React.Node,
  manual: boolean,
  maxWidth: string | number,
  onMouseEnter: (e: SyntheticMouseEvent<>) => void,
  onMouseLeave: (e: SyntheticMouseEvent<>) => void,
  opened: boolean,
  pos:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top left'
    | 'top center'
    | 'top right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'left top'
    | 'left middle'
    | 'left bottom'
    | 'right top'
    | 'right middle'
    | 'right bottom',
  text: React.Node
};

type State = {
  opened: boolean
};

const Positions = [
  'top center',
  'top left',
  'top right',
  'bottom center',
  'bottom left',
  'bottom right',
  'left middle',
  'left top',
  'left bottom',
  'right middle',
  'right top',
  'right bottom'
];

export default class Hint extends React.Component<Props, State> {
  static defaultProps = {
    pos: 'top',
    manual: false,
    opened: false,
    maxWidth: (200: string | number),
    onMouseEnter: (e: SyntheticMouseEvent<>) => {},
    onMouseLeave: (e: SyntheticMouseEvent<>) => {}
  };

  state: {
    opened: boolean
  } = {
    opened: false
  };

  _timer: ?TimeoutID = null;
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

  componentWillUnmount() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  isOpened() {
    return this.state.opened;
  }

  render() {
    return (
      <span ref={this._ref} style={{ display: 'inline-block' }}>
        <span
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
        >
          {this.props.children}
        </span>
        <Popup
          hasPin
          opened={this.isOpened()}
          anchorElement={this._dom}
          positions={this._getPositions()}
          backgroundColor={bgColor}
        >
          {this._renderContent()}
        </Popup>
      </span>
    );
  }

  _renderContent() {
    const { pos } = this.props;
    const className = classNames({
      [styles.root]: true,
      [styles.rootCenter]: pos === 'top' || pos === 'bottom'
    });
    return <div className={className}>{this.props.text}</div>;
  }

  _ref = (el: ?HTMLElement) => {
    this._dom = el;
  };

  _getDOM = () => {
    return this._dom;
  };

  _getPositions = () => {
    return Positions.filter(x => x.startsWith(this.props.pos));
  };

  _handleMouseEnter = e => {
    if (!this.props.manual && !this._timer) {
      this._timer = setTimeout(this._open, 400);
    }
    this.props.onMouseEnter(e);
  };

  _handleMouseLeave = e => {
    if (!this.props.manual && this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
      this.setState({ opened: false });
    }
    this.props.onMouseLeave(e);
  };

  _open = () => {
    this.setState({ opened: true });
  };
}
