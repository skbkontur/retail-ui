

import * as React from 'react';
import { bool } from 'prop-types';
import cn from 'classnames';
import getCharHelper from './getCharHelper';
import Input from '../Input';
import type { InputProps } from '../Input/Input';
import Icon from '../Icon';
import PasswordInputFallback from './PasswordInputFallback';
import { ieVerison, isIE } from '../ensureOldIEClassName';

import styles from './PasswordInput.less';

export type Props = {
  detectCapsLock?: boolean
} & InputProps;

type State = {
  visible: boolean,
  capsLockEnabled?: boolean | null
};

/**
 * **DRAFT**
 **/

export default class PasswordInput extends React.Component<Props, State> {
  static defaultProps = {
    size: 'small'
  };

  _input;

  state = {
    visible: false,
    capsLockEnabled: false
  };

  componentWillMount() {
    if (this.props.detectCapsLock) {
      this.setState({ capsLockEnabled: null });
    }

    if (isIE && !window.document.msCapsLockWarningOff) {
      // turns off default ie capslock warning
      window.document.msCapsLockWarningOff = true;
    }
  }

  _handleKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
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

  _handleKeydown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
        <Icon size={14} name={this.state.visible ? 'EyeOpened' : 'EyeClosed'} />
      </span>
    );
  };

  focus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  _refInput = ref => {
    this._input = ref;
  };

  _renderInput() {
    const inputProps = {
      ...this.props,
      onKeyDown: this._handleKeydown,
      onKeyPress: this._handleKeyPress,
      rightIcon: this._renderEye()
    };

    if (isIE && ieVerison === 8) {
      return (
        <PasswordInputFallback
          refInput={this._refInput}
          visible={this.state.visible}
          {...inputProps}
        />
      );
    }

    return (
      <Input
        ref={this._refInput}
        type={this.state.visible ? 'text' : 'password'}
        {...inputProps}
      />
    );
  }

  render() {
    const { capsLockEnabled } = this.state;

    const rootClassNames = cn({
      [styles.root]: true,
      [styles.capsLockEnabled]: capsLockEnabled
    });

    return (
      <div className={rootClassNames}>
        {this._renderInput()}
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
