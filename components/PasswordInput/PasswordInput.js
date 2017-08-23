// @flow

import * as React from 'react';
import { bool } from 'prop-types';
import cn from 'classnames';
import getCharHelper from './getCharHelper';
import Input from '../Input';
import type { Props as InputProps } from '../Input/Input';
import Icon from '../Icon';

import styles from './PasswordInput.less';

type Props = {
  detectCapsLock?: boolean
} & InputProps;

type State = {
  visible: boolean,
  capsLockEnabled?: boolean | null
};

export default class PasswordInput extends React.Component<Props, State> {
  static defaultProps = {
    size: 'small'
  };

  _input: ?Input;

  state: State = {
    visible: false
  };

  componentWillMount() {
    if (this.props.detectCapsLock) {
      this.setState({ capsLockEnabled: null });
    }
  }

  _handleKeyPress = (e: SyntheticKeyboardEvent<>) => {
    const { onKeyPress, detectCapsLock } = this.props;

    if (onKeyPress) {
      onKeyPress(e);
    }

    if (!detectCapsLock) {
      return;
    }

    const chr = getCharHelper(e);

    if (!chr) {
      return;
    }

    if (chr.toLowerCase() === chr.toUpperCase()) {
      return;
    }

    const capsLockEnabled =
      (chr.toLowerCase() === chr && e.shiftKey) ||
      (chr.toUpperCase() === chr && !e.shiftKey);

    this.setState({ capsLockEnabled });
  };

  _handleKeydown = (e: SyntheticKeyboardEvent<>) => {
    const {
      props: { detectCapsLock, onKeyDown },
      state: { capsLockEnabled }
    } = this;

    if (onKeyDown) {
      onKeyDown(e);
    }

    if (!detectCapsLock) {
      return;
    }

    if (e.keyCode === 20 && capsLockEnabled != null) {
      this.setState({ capsLockEnabled: !capsLockEnabled });
    }
  };

  _handleToggleVisibility = () => {
    this.setState({ visible: !this.state.visible }, this._handleFocus);
  };

  _handleFocus = () => {
    this._input && this._input.focus();
  };

  _renderEye = () => {
    return (
      <span
        className={styles.toggleVisibility}
        onClick={this._handleToggleVisibility}
      >
        <Icon size={14} name={this.state.visible ? 'eye' : 'eye-slash'} />
      </span>
    );
  };

  _refInput = ref => {
    this._input = ref;
  };

  render() {
    const { capsLockEnabled, visible } = this.state;

    const rootClassNames = cn({
      [styles.root]: true,
      [styles.capsLockEnabled]: capsLockEnabled
    });

    const inputProps = {
      ref: this._refInput,
      type: visible ? 'text' : 'password',
      onKeyDown: this._handleKeydown,
      onKeyPress: this._handleKeyPress,
      rightIcon: this._renderEye()
    };

    return (
      <div className={rootClassNames}>
        <Input {...this.props} {...inputProps} />
        {capsLockEnabled && <span className={styles.capsLockDetector} />}
      </div>
    );
  }
}

PasswordInput.propTypes = {
  /**
   * Включает CapsLock детектор
   */
  detectCapsLock: bool
};
