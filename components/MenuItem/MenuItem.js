// @flow

import classNames from 'classnames';
import React from 'react';

import styles from './MenuItem.less';

global.React = React;

export default class MenuItem extends React.Component {
  props: {
    state: 'hover' | 'selected';
  };

  render() {
    const {
      state,
      ...rest
    } = this.props;
    const className = classNames({
      [styles.root]: true,
      [styles.hover]: state === 'hover',
      [styles.selected]: state === 'selected',
    });

    return (
      <div {...rest} className={className}>
        {(this.props: any).children}
      </div>
    );
  }
}
