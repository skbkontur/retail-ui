import events from 'add-event-listener';
import CROSS from '../internal/cross';
import LayoutEvents from '../../lib/LayoutEvents';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import position from './position';
import renderPin from './renderPin';

import styles from './Box.less';

export default class Box extends React.Component {
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
      ...(this.state.pos ? this.state.pos.boxStyle : { left: 0 }),
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
    if (this.props.trigger === 'click') {
      events.addEventListener(document, 'click', this._handleNativeDocClick);
    }
  }

  componentWillUnmount() {
    this._layoutEventsToken.remove();
    events.removeEventListener(document, 'click', this._handleNativeDocClick);

    this._mounted = false;
  }

  componentDidUpdate() {
    this.reflow();
  }

  _handleNativeDocClick = event => {
    if (!this._mounted) {
      // The component might already have been unmounted if closed by clicking
      // on the cross. `ReactDOM.findDOMNode()` throws if called on unmounted
      // component instance.
      return;
    }

    const target = event.target || event.srcElement;
    if (!ReactDOM.findDOMNode(this).contains(target)) {
      this.props.onClose();
    }
  };

  _handleCrossClick = () => {
    this.props.onClose();
  };

  reflow = () => {
    if (this.updating_) {
      return;
    }

    this.updating_ = true;
    this.setState({ pos: null }, () => {
      const of = this.props.getTarget();
      const el = ReactDOM.findDOMNode(this);
      const fixed = this.context.insideFixedContainer === true;
      const pos = position(el, of, this.props.pos, fixed);
      this.setState({ pos }, () => {
        this.updating_ = false;
      });
    });
  };
}
