// @flow

import React from 'react';
import { bool } from 'prop-types';
import cn from 'classnames';
import getCharHelper from './getCharHelper';
import Input from '../Input';
import type { Props as InputProps } from '../Input/Input';
import Icon from '../Icon';
import PasswordInputFallback from './PasswordInputFallback';
import { ieVerison } from '../ensureOldIEClassName';

import styles from './PasswordInput.less';

export type Props = {
  detectCapsLock?: boolean,
  visible?: boolean
} & InputProps;

type State = {
  visible: boolean,
  capsLockEnabled?: boolean | null
};

export default class PasswordInput extends React.Component {
  static defaultProps = {
    size: 'small'
  };

  _input: HTMLInputElement;

  props: Props;
  state: State = {
    visible: false
  };

  componentWillMount() {
    if (this.props.detectCapsLock) {
      this.setState({ capsLockEnabled: null });
    }
  }

  _handleKeyPress = (e: SyntheticKeyboardEvent) => {
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

  _handleKeydown = (e: SyntheticKeyboardEvent) => {
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
    if (this._input) {
      this._input.focus();

      return;
    }
  };

  _renderEye = () => {
    return (
      <span>
        <span
          className={styles.toggleVisibility}
          onClick={this._handleToggleVisibility}
        >
          <Icon size={14} name={this.state.visible ? 'eye' : 'eye-slash'} />
        </span>
      </span>
    );
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

    if (ieVerison === 8) {
      return (
        <PasswordInputFallback visible={this.state.visible} {...inputProps} />
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
