// @flow

import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Icon from '../Icon';

import '../ensureOldIEClassName';
import styles from './Checkbox.less';

type Props = {
  children?: any,
  checked: bool,
  disabled?: bool,
  error?: bool,
  warning?: bool,
  onChange?: (event: {target: {value: bool}}, value: bool) => void,
  onMouseEnter?: (e: SyntheticMouseEvent) => void,
  onMouseLeave?: (e: SyntheticMouseEvent) => void,
  onMouseOver?: (e: SyntheticMouseEvent) => void,
};

class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  props: Props;
  input: ?HTMLInputElement;

  render() {
    const rootClass = classNames({
      [styles.root]: true,
      [styles.isChecked]: this.props.checked,
      [styles.isDisabled]: this.props.disabled,
      [styles.error]: this.props.error,
      [styles.warning]: this.props.warning,
    });

    const inputProps: Object = {
      type: 'checkbox',
      className: styles.input,
      checked: this.props.checked,
      disabled: this.props.disabled,
      onChange: this.handleChange,
      ref: this._inputRef,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver,
    };
    if (this.props.tabIndex) {
      inputProps.tabIndex = this.props.tabIndex;
    }

    return (
      <label className={rootClass} onClick={this._preventFocus}>
        <input {...inputProps} />
        <span className={styles.box}>
          <div className={styles.ok}><Icon name="ok" /></div>
        </span>
        <span className={styles.caption}>{this.props.children}</span>
      </label>
    );
  }

  _preventFocus = () => {
    if (this.input) {
      this.input.blur();
    }
  };

  _inputRef = (ref: HTMLInputElement) => {
    this.input = ref;
  };

  handleChange = (event: {target: {checked: bool}}) => {
    const checked = event.target.checked;
    this.props.onChange && this.props.onChange((event: any), checked);
  };
}

export default Checkbox;
