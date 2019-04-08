import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Upgrades from '../../lib/Upgrades';
import tabListener from '../../lib/events/tabListener';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const styles = isFlatDesign ? require('./Toggle.flat.less') : require('./Toggle.less');

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
  checked?: boolean;
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
    onChange: PropTypes.func,
  };

  public static defaultProps = {
    disabled: false,
    loading: false,
  };

  private input: HTMLInputElement | null = null;

  constructor(props: ToggleProps) {
    super(props);

    this.state = {
      focusByTab: false,
      checked: props.defaultChecked,
    };
  }

  public componentDidMount() {
    if (this.props.autoFocus) {
      tabListener.isTabPressed = true;
      this.focus();
    }
  }

  /**
   * @public
   */
  public focus = () => {
    if (this.input) {
      tabListener.isTabPressed = true;
      this.input.focus();
    }
  };

  public render() {
    const { warning, error, loading, color } = this.props;
    const disabled = this.props.disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = classNames(styles.container, {
      [styles.isWarning]: !color && warning,
      [styles.isError]: !color && error,
      [styles.isLoading]: loading,
      [styles.focused]: !disabled && this.state.focusByTab,
    });

    return (
      <label
        className={classNames(styles.wrapper, {
          [styles.isDisabled]: disabled,
        })}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={this.handleChange}
          className={styles.input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.inputRef}
          disabled={disabled}
        />
        <div
          className={containerClassNames}
          style={
            checked && color
              ? {
                  backgroundColor: color,
                  borderColor: color,
                }
              : undefined
          }
        >
          <div className={styles.activeBackground} style={checked && color ? { backgroundColor: color } : undefined} />
        </div>
        <div className={styles.handle} />
      </label>
    );
  }

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.checked);
    }

    if (this.props.changeEventHandler) {
      this.props.changeEventHandler(event);
    }

    if (this.isUncontrolled()) {
      this.setState({
        checked: event.target.checked,
      });
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    if (tabListener.isTabPressed) {
      this.setState({ focusByTab: true }, () => {
        tabListener.isTabPressed = false;
      });
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({
      focusByTab: false,
    });
  };

  private isUncontrolled() {
    return this.props.checked === undefined;
  }
}
