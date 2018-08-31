import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Upgrades from '../../lib/Upgrades';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

import DefaultStyles = require('./Toggle.less');
import FlatStyles = require('./Toggle.flat.less');

const styles = isFlatDesign ? FlatStyles : DefaultStyles;

let isListening: boolean;
let tabPressed: boolean;

const KEYCODE_TAB = 9;

function listenTabPresses() {
  const handler = (event: KeyboardEvent) => {
    tabPressed = event.keyCode === KEYCODE_TAB;
  };

  if (!isListening) {
    document.addEventListener('keydown', handler);
    isListening = true;
  }
}

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  changeEventHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  warning?: boolean;
  error?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  color?: React.CSSProperties['color'];
}

export interface ToggleState {
  focusByTab?: boolean;
}

export default class Toggle extends React.Component<ToggleProps, ToggleState> {
  public static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func
  };

  public static defaultProps = {
    disabled: false,
    loading: false
  };

  private input: HTMLInputElement | null = null;

  constructor(props: ToggleProps) {
    super(props);

    this.state = {
      focusByTab: false,
    };
  }

  public componentDidMount() {
    listenTabPresses();
    const { defaultChecked, autoFocus } = this.props

    if (autoFocus) {
      tabPressed = true;
      this.focus();
    }
    if (this.input && this.isUncontrolled() && defaultChecked) {
      this.input.checked = defaultChecked
    }
  }

  public render() {
    const { warning, error, loading, color, defaultChecked } = this.props;
    const disabled = this.isDisabled();
    const checked = this.isUncontrolled()
      ? this.input ? this.input.checked : defaultChecked
      : this.props.checked;

    const containerClassNames = classNames(styles.container, {
      [styles.isWarning]: !color && warning,
      [styles.isError]: !color && error,
      [styles.isLoading]: loading,
      [styles.focused]: !disabled && !loading && this.state.focusByTab
    });

    return (
      <label
        className={classNames(styles.wrapper, {
          [styles.isDisabled]: disabled
        })}
      >
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.handleChange}
          className={styles.input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.inputRef}
        />
        <div
          className={containerClassNames}
          style={
            checked && this.props.color
              ? {
                  backgroundColor: color,
                  borderColor: color
                }
              : undefined
          }
        >
          <div
            className={styles.activeBackground}
            style={
              checked && this.props.color
                ? {
                    backgroundColor: color
                  }
                : undefined
            }
          />
        </div>
        <div className={styles.handle} />
      </label>
    );
  }

  public focus = () => {
    if (this.input) {
      tabPressed = true;
      this.input.focus();
    }
  };

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    if (this.props.changeEventHandler) {
      event.persist();
    }

    this.callHandlers(event.target.checked, event);
    if (this.isUncontrolled() && this.props.color) {
      this.forceUpdate()
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    if (this.props.onFocus) {
      event.persist();
    }

    if (tabPressed) {
      this.setState(
        {
          focusByTab: true
        },
        () => {
          if (this.props.onFocus) {
            this.props.onFocus(event);
          }
          tabPressed = false;
        }
      );
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      event.persist();
    }

    this.setState(
      {
        focusByTab: false
      },
      () => {
        if (this.props.onBlur) {
          this.props.onBlur(event);
        }
      }
    );
  };

  private isDisabled() {
    return this.props.disabled || this.props.loading;
  }

  private isUncontrolled = () => this.props.checked === undefined;

  private callHandlers = (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (this.props.onChange) {
      this.props.onChange(checked);
    }

    if (this.props.changeEventHandler) {
      this.props.changeEventHandler(event);
    }
  };
}
