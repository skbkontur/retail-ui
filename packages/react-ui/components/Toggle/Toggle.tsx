import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { tabListener } from '../../lib/events/tabListener';
import { theme } from '../../lib/theming/decorators';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles, globalClasses } from './Toggle.styles';

let colorWarningShown = false;

export interface ToggleProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * Положение children справа или слева от переключателя
   * @default 'right'
   */
  captionPosition: 'left' | 'right';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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

@theme
export class Toggle extends React.Component<ToggleProps, ToggleState> {
  public static __KONTUR_REACT_UI__ = 'Toggle';

  public static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    onValueChange: PropTypes.func,
    color(props: ToggleProps) {
      if (props.color && !colorWarningShown) {
        warning(false, `[Toggle]: prop 'color' is deprecated. Please, use theme variable 'toggleBgChecked' instead. `);
        colorWarningShown = true;
      }
    },
  };

  public static defaultProps = {
    disabled: false,
    loading: false,
    captionPosition: 'right',
  };

  private readonly theme!: Theme;
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
    const { children, captionPosition, warning, error, loading, color } = this.props;
    const disabled = this.props.disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = cx(styles.container(this.theme), {
      [styles.containerDisabled(this.theme)]: !!disabled,
      [globalClasses.container]: true,
      [globalClasses.containerDisabled]: !!disabled,
      [globalClasses.containerLoading]: loading,
    });

    const labelClassNames = cx(styles.root(this.theme), {
      [styles.rootLeft()]: captionPosition === 'left',
      [styles.disabled()]: !!disabled,
    });

    let caption = null;
    if (children) {
      const captionClass = cx(styles.caption(this.theme), {
        [styles.captionLeft(this.theme)]: captionPosition === 'left',
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    return (
      <CommonWrapper {...this.props}>
        <label className={labelClassNames}>
          <div
            className={cx(styles.outline(this.theme), {
              [styles.isWarning(this.theme)]: !!warning,
              [styles.isError(this.theme)]: !!error,
              [styles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
            })}
          >
            <span className={cx(styles.wrapper(this.theme))}>
              <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
                className={styles.input(this.theme)}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={this.inputRef}
                disabled={disabled}
              />
              <div
                className={containerClassNames}
                style={
                  checked && color && !disabled
                    ? {
                        backgroundColor: color,
                        boxShadow: `inset 0 0 0 1px ${color}`,
                      }
                    : undefined
                }
              >
                <div
                  className={cx(styles.activeBackground(), globalClasses.background, {
                    [styles.activeBackgroundLoading(this.theme)]: loading,
                  })}
                  style={
                    checked && color && !disabled
                      ? {
                          backgroundColor: color,
                          boxShadow: `inset 0 0 0 1px ${color}`,
                        }
                      : undefined
                  }
                />
              </div>
              <div
                className={cx(styles.handle(this.theme), globalClasses.handle, {
                  [styles.handleDisabled(this.theme)]: disabled,
                })}
              />
            </span>
          </div>
          {caption}
        </label>
      </CommonWrapper>
    );
  }

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.checked);
    }

    if (this.isUncontrolled()) {
      this.setState({
        checked: event.target.checked,
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    if (tabListener.isTabPressed) {
      this.setState({ focusByTab: true });
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
