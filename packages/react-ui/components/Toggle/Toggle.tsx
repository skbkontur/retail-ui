import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tabListener } from '../../lib/events/tabListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

import { jsStyles } from './Toggle.styles';

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
  };

  public static defaultProps = {
    disabled: false,
    loading: false,
    captionPosition: 'right',
  };

  private theme!: Theme;
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
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { children, captionPosition, warning, error, loading, color } = this.props;
    const disabled = this.props.disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;
    const [{ className, ...commonProps }] = extractCommonProps(this.props);

    const containerClassNames = cn(jsStyles.container(this.theme), {
      [jsStyles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
      [jsStyles.isLoading(this.theme)]: !!loading,
      [jsStyles.isWarning(this.theme)]: !color && !!warning,
      [jsStyles.isError(this.theme)]: !color && !!error,
    });

    const wrapperProps = {
      ...commonProps,
      className: cn(className, jsStyles.root(this.theme), {
        [jsStyles.rootLeft()]: captionPosition === 'left',
        [jsStyles.disabled(this.theme)]: !!disabled,
      }),
    };

    let caption = null;
    if (children) {
      const captionClass = cn(jsStyles.caption(this.theme), {
        [jsStyles.captionLeft(this.theme)]: captionPosition === 'left',
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    return (
      <label {...wrapperProps}>
        <span className={jsStyles.wrapper(this.theme)}>
          <input
            type="checkbox"
            checked={checked}
            onChange={this.handleChange}
            className={jsStyles.input(this.theme)}
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
                    boxShadow: `inset 0 0 0 1px ${color}`,
                  }
                : undefined
            }
          >
            <div
              className={jsStyles.activeBackground()}
              style={checked && color ? { backgroundColor: color } : undefined}
            />
          </div>
          <div className={jsStyles.handle(this.theme)} />
        </span>
        {caption}
      </label>
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
