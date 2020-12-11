import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tabListener } from '../../lib/events/tabListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { Override } from '../../typings/utility-types';

import { jsStyles } from './Toggle.styles';

export type ToggleProps = Override<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
  {
    children?: React.ReactNode;
    /**
     * Положение children справа или слева от переключателя
     * @default 'right'
     */
    captionPosition: 'left' | 'right';
    checked?: boolean;
    defaultChecked?: boolean;
    onValueChange?: (value: boolean) => void;
    warning?: boolean;
    error?: boolean;
    loading?: boolean;
    color?: React.CSSProperties['color'];
    onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
    onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
    'data-tid'?: string;
    'data-testid'?: string;
  }
>;

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
      checked: !!props.defaultChecked,
    };
  }

  public componentDidMount() {
    if (this.props.autoFocus) {
      tabListener.isTabPressed = true;
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
    const {
      children,
      captionPosition,
      warning,
      error,
      loading,
      color,
      defaultChecked,
      onValueChange,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      className,
      style,
      'data-tid': datatid,
      'data-testid': datatestid,
      ...inputProps
    } = this.props;
    const disabled = this.props.disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = cn(jsStyles.container(this.theme), {
      [jsStyles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
      [jsStyles.isLoading(this.theme)]: !!loading,
      [jsStyles.isWarning(this.theme)]: !color && !!warning,
      [jsStyles.isError(this.theme)]: !color && !!error,
    });

    const labelClassNames = cn(jsStyles.root(this.theme), {
      [jsStyles.rootLeft()]: captionPosition === 'left',
      [jsStyles.disabled(this.theme)]: !!disabled,
    });

    let caption = null;
    if (children) {
      const captionClass = cn(jsStyles.caption(this.theme), {
        [jsStyles.captionLeft(this.theme)]: captionPosition === 'left',
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    const wrapperProps = {
      className: cn(className, labelClassNames),
      style,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      'data-tid': datatid,
      'data-testid': datatestid,
    };

    return (
      <label {...wrapperProps}>
        <span className={jsStyles.wrapper(this.theme)}>
          <input
            {...inputProps}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={this.handleChange}
            className={jsStyles.input(this.theme)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={this.inputRef}
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

    // async check makes autoFocus work
    setTimeout(() => {
      if (tabListener.isTabPressed) {
        this.setState({ focusByTab: true });
      }
    }, 0);
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
