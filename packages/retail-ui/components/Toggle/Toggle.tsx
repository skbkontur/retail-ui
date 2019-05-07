import * as React from 'react';
import * as PropTypes from 'prop-types';
import tabListener from '../../lib/events/tabListener';
import { cx as classNames } from 'emotion';
import styles from './Toggle.less';
import jsStyles from './Toggle.styles';
import { ThemeConsumer } from '../../lib/theming/ThemeProvider';
import { ITheme } from '../../lib/theming/Theme';

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

  private theme!: ITheme;
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
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { warning, error, loading, color } = this.props;
    const disabled = this.props.disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = classNames(styles.container, jsStyles.container(this.theme), {
      [jsStyles.isWarning(this.theme)]: !color && !!warning,
      [jsStyles.isError(this.theme)]: !color && !!error,
      [jsStyles.isLoading(this.theme)]: !!loading,
      [jsStyles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
    });

    return (
      <label
        className={classNames(styles.wrapper, jsStyles.wrapper(this.theme), {
          [styles.isDisabled]: !!disabled,
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
          <div
            className={classNames(styles.activeBackground, jsStyles.activeBackground(this.theme))}
            style={checked && color ? { backgroundColor: color } : undefined}
          />
        </div>
        <div className={classNames(styles.handle, jsStyles.handle(this.theme))} />
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
