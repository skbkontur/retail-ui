import CROSS from '../internal/cross';
import LayoutEvents from '../../lib/LayoutEvents';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import shallowEqual from 'fbjs/lib/shallowEqual';
import throttle from 'lodash.throttle';

import position from './position';
import renderPin from './renderPin';

import '../ensureOldIEClassName';
import styles from './Box.less';

class Box extends React.Component {
  static contextTypes = {
    insideFixedContainer: PropTypes.bool,
    rt_inModal: PropTypes.bool
  };

  state = {
    pos: null
  };

  _mounted = false;

  render() {
    const style = {
      ...(this.state.pos ? this.state.pos.boxStyle : { left: 0, top: 0 }),
      zIndex: this.context.rt_inModal ? 1100 : 900
    };

    return (
      <div className={styles.root} style={style}>
        {renderPin(this.state.pos, styles.pin, styles.pinInner)}
        <div className={styles.inner}>
          {this.props.close && (
            <div className={styles.cross} onClick={this._handleCrossClick}>
              {CROSS}
            </div>
          )}
          {this.props.children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._mounted = true;

    this.reflow();

    this._layoutEventsToken = LayoutEvents.addListener(this.reflow);
  }

  componentWillUnmount() {
    this._layoutEventsToken.remove();
    this._mounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.pos &&
      this.state.pos &&
      !shallowEqual(prevState.pos.boxStyle, this.state.pos.boxStyle)
    ) {
      this.reflow();
    }
  }

  _handleCrossClick = () => {
    this.props.onClose();
  };

  reflow = throttle(() => {
    if (!this._mounted) {
      return;
    }
    const of = this.props.getTarget();
    if (!of) {
      return;
    }
    const el = ReactDOM.findDOMNode(this);
    const fixed = this.context.insideFixedContainer === true;
    const pos = position(el, of, this.props.pos, fixed);
    this.setState({ pos }, () => {
      this.updating_ = false;
    });
  }, 100);
}

export default Box;
