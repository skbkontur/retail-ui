// @flow

import * as React from 'react';

import PropTypes from 'prop-types';

import RenderContainer from '../RenderContainer/RenderContainer';
import position from '../Tooltip/position';
import type { Result } from '../Tooltip/position';
import renderPin from '../Tooltip/renderPin';

import styles from './HintBox.less';

type Props = {
  getTarget: () => ?HTMLElement,
  pos: 'top' | 'right' | 'bottom' | 'left',
  text: string,
  maxWidth: string | number
};

type State = {
  pos: ?Result
};

export default class HintBox extends React.Component<Props, State> {
  static contextTypes = {
    insideFixedContainer: PropTypes.bool,
    rt_inModal: PropTypes.bool
  };

  state: State = {
    pos: null
  };

  _dom: ?HTMLElement = null;
  _positioning: boolean = false;

  render() {
    let style = {
      zIndex: this.context.rt_inModal ? 1100 : 900,
      maxWidth: this.props.maxWidth
    };
    let className = styles.root;
    if (this.state.pos) {
      style = { ...style, ...this.state.pos.boxStyle };

      const { pinDirection } = this.state.pos;
      if (pinDirection === 'top' || pinDirection === 'bottom') {
        className += ' ' + styles.rootCenter;
      }
    }

    return (
      <RenderContainer>
        <div ref={this._ref} style={style} className={className}>
          {this.props.text}
          {renderPin(this.state.pos, styles.pin, styles.pinInner)}
        </div>
      </RenderContainer>
    );
  }

  componentDidMount() {
    this._position();
  }

  componentDidUpdate() {
    this._position();
  }

  _ref = (el: ?HTMLElement) => {
    this._dom = el;
  };

  _position() {
    if (this._positioning) {
      return;
    }

    let posStr;
    switch (this.props.pos) {
      case 'top':
        posStr = 'top center';
        break;
      case 'right':
        posStr = 'right middle';
        break;
      case 'bottom':
        posStr = 'bottom center';
        break;
      case 'left':
        posStr = 'left middle';
        break;
      default:
        throw new Error('Should never happen.');
    }

    const target = this.props.getTarget();
    const box = this._dom;
    if (target && box) {
      const fixed = this.context.insideFixedContainer === true;
      const pos = position(box, target, posStr, fixed);

      this._positioning = true;
      this.setState({ pos }, () => {
        this._positioning = false;
      });
    }
  }
}
