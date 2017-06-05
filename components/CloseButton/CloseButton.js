import React, { Component } from 'react';
import Icon from '../Icon';

import styles from './CloseButton.less';

export default class CloseButton extends Component {
  render() {
    return (
      <div
        className={styles.close_button_container}
        onClick={this.props.onClick}
      >
        <div className={styles.close_button}>
          <Icon name="remove" color="#a0a0a0" size="14px"/>
        </div>
      </div>
    );
  }
}
