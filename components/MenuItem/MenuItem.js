// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';

import styles from './MenuItem.less';

/**
 * Элемент меню.
 */
export default class MenuItem extends React.Component {
  static __MENU_ITEM__ = true;

  static propTypes = {
    comment: PropTypes.string,

    disabled: PropTypes.bool,

    href: PropTypes.string,

    /** internal */
    loose: PropTypes.bool,

    /** internal */
    state: PropTypes.string,

    target: PropTypes.string,

    onClick: PropTypes.func,
  }

  props: {
    comment?: string,
    disabled?: bool,
    href?: string,
    loose?: bool,
    state?: 'hover' | 'selected',
    target?: string,
    onClick?: () => void,
  };

  render() {
    const {
      comment,
      disabled,
      loose,
      state,

      onClick,

      ...rest,
    } = this.props;
    const hover = state === 'hover' && !disabled;
    const className = classNames({
      [styles.root]: true,
      [styles.disabled]: disabled,
      [styles.hover]: hover,
      [styles.loose]: loose,
      [styles.selected]: state === 'selected',
    });

    return (
      <a
        {...rest}
        className={className}
        tabIndex="-1"
        onClick={disabled ? null : onClick}
      >
        {(this.props: any).children}
        {this.props.comment && (
          <div
            className={classNames({
              [styles.comment]: true,
              [styles.commentHover]: hover,
            })}
          >
            {comment}
          </div>
        )}
      </a>
    );
  }
}
