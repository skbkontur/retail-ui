// @flow

import classNames from 'classnames';
import events from 'add-event-listener';
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
};

type State = {
  active: bool,
  focused: bool,
};

class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
  };

  props: Props;
  state: State;

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.state = {
      active: false,
      focused: false,
    };
  }

  render() {
    var rootClass = classNames({
      [styles.root]: true,
      [styles.isChecked]: this.props.checked,
      [styles.isActive]: this.state.active,
      [styles.isFocused]: this.state.focused,
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
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };
    if (this.props.tabIndex) {
      inputProps.tabIndex = this.props.tabIndex;
    }

    return (
      <label className={rootClass} onMouseDown={this.handleActivate}>
        <input {...inputProps} />
        <span className={styles.box}>
          <div className={styles.ok}><Icon name="ok" /></div>
        </span>
        <span className={styles.caption}>{this.props.children}</span>
      </label>
    );
  }

  handleActivate = (event: SyntheticMouseEvent) => {
    if (event.button !== 0) {
      return;
    }

    this.setState({active: true});

    events.addEventListener(document, 'mouseup', this.deactivate);
  };

  deactivate = () => {
    this.setState({active: false});

    events.removeEventListener(document, 'mouseup', this.deactivate);
  };

  handleChange = (event: {target: {checked: bool}}) => {
    const checked = event.target.checked;
    this.props.onChange && this.props.onChange((event: any), checked);
  };

  handleFocus = () => {
    this.setState({focused: true});
  };

  handleBlur = () => {
    this.setState({focused: false});
  };
}

export default Checkbox;
