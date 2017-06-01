// @flow

import React from 'react';

import styles from './Indicator.less';

type Props = {
  getAnchorNode: () => ?Element
};

class Indicator extends React.Component {
  props: Props;

  render() {
    const node = this.props.getAnchorNode();

    if (!node) {
      return null;
    }

    return <div className={styles.root} style={this._getStyles(node)} />;
  }

  _getStyles(node) {
    if (!(node instanceof HTMLElement)) {
      return {};
    }
    const rect = node.getBoundingClientRect();
    const top = node.offsetHeight + node.offsetTop - 3;
    const left = node.offsetLeft;
    return {
      left,
      top,
      height: 3,
      width: rect.right - rect.left
    };
  }
}

export default Indicator;
