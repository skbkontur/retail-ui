import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import filterProps from '../../filterProps';

import '../../ensureOldIEClassName';
import styles from './InputLikeText.less';

const PASS_PROPS = {
  onClick: true,
  onKeyDown: true,
  onKeyPress: true,
};

export default class InputLikeText extends React.Component {
  render() {
    const passProps = filterProps(this.props, PASS_PROPS);

    const className = classNames({
      [styles.root]: true,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning,
    });

    return (
      <span tabIndex="0" className={className} {...passProps}>
        {this.props.children}
      </span>
    );
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }
}
