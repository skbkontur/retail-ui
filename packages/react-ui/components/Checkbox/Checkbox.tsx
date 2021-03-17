import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Nullable, Override } from '../../typings/utility-types';
import { tabListener } from '../../lib/events/tabListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { OkIcon, SquareIcon } from '../../internal/icons/16px';
import { isEdge, isFirefox, isIE11 } from '../../lib/client';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Checkbox.styles';

export interface CheckboxProps
  extends CommonProps,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /** Контент `label` */
        children?: React.ReactNode;
        /** Состояние ошибки */
        error?: boolean;
        /** Состояние Предупреждения */
        warning?: boolean;
        /** Вызывается на label */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается на label */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается на label */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается при изменении `value` */
        onValueChange?: (value: boolean) => void;
        /** onBlur */
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
        /** Состояние частичного выделения */
        initialIndeterminate?: boolean;
      }
    > {}

export interface CheckboxState {
  focusedByTab: boolean;
  indeterminate: boolean;
}

/**
 * Все свойства, кроме перечисленных, `className` и `style` передаются в `input`.
 */
export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static __KONTUR_REACT_UI__ = 'Checkbox';

  public static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onValueChange: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  public state = {
    focusedByTab: false,
    indeterminate: this.props.initialIndeterminate || false,
  };

  private theme!: Theme;
  private input: Nullable<HTMLInputElement>;

  public componentDidMount = () => {
    if (this.state.indeterminate && this.input) {
      this.input.indeterminate = true;
    }
  };

  public UNSAFE_componentWillReceiveProps(nextProps: CheckboxProps) {
    if (nextProps.checked !== this.props.checked) {
      this.resetIndeterminate();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * @public
   */
  public focus() {
    tabListener.isTabPressed = true;
    this.input?.focus();
  }

  /**
   * @public
   */
  public blur() {
    this.input?.blur();
  }

  /**
   * Установить промежуточное значение
   * @public
   */
  public setIndeterminate = () => {
    this.setState({
      indeterminate: true,
    });
    if (this.input) {
      this.input.indeterminate = true;
    }
  };

  /**
   * Сбросить промежуточное значение
   * @public
   */
  public resetIndeterminate = () => {
    this.setState({
      indeterminate: false,
    });
    if (this.input) {
      this.input.indeterminate = false;
    }
  };

  private renderMain = (props: CommonWrapperRestProps<CheckboxProps>) => {
    const {
      error,
      warning,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onValueChange,
      type,
      initialIndeterminate,
      ...rest
    } = props;
    const isIndeterminate = this.state.indeterminate;

    const rootClass = cn({
      [jsStyles.root(this.theme)]: true,
      [jsStyles.rootFallback()]: isIE11 || isEdge,
      [jsStyles.disabled(this.theme)]: Boolean(props.disabled),
      [jsStyles.checked(this.theme)]: Boolean(props.checked),
      [jsStyles.indeterminate(this.theme)]: isIndeterminate,
      [jsStyles.focus(this.theme)]: this.state.focusedByTab,
      [jsStyles.warning(this.theme)]: Boolean(props.warning),
      [jsStyles.error(this.theme)]: Boolean(props.error),
    });

    const inputProps = {
      ...rest,
      type: 'checkbox',
      className: jsStyles.input(),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      ref: this.inputRef,
    };

    let caption = null;
    if (this.props.children) {
      const captionClass = cn({
        [jsStyles.caption(this.theme)]: true,
        [jsStyles.captionIE11()]: isIE11 || isEdge,
      });
      caption = <span className={captionClass}>{this.props.children}</span>;
    }

    const iconClass = cn({
      [jsStyles.iconUnchecked()]: !props.checked && !isIndeterminate,
      [jsStyles.iconFixBaseline()]: isFirefox || isIE11 || isEdge,
    });

    const box = (
      <span className={jsStyles.box(this.theme)}>
        {(isIndeterminate && <SquareIcon className={iconClass} />) || <OkIcon className={iconClass} />}
      </span>
    );

    return (
      <label className={rootClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
        <input {...inputProps} />
        {box}
        {caption}
      </label>
    );
  };

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.props.onBlur?.(e);
    this.setState({ focusedByTab: false });
  };

  private inputRef = (ref: HTMLInputElement | null) => {
    this.input = ref;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    this.props.onValueChange?.(checked);

    this.resetIndeterminate();

    this.props.onChange?.(event);
  };

  private handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.props.onClick?.(e);
    // support IE11's and old Edge's special behavior
    // https://github.com/jquery/jquery/issues/1698
    if (this.state.indeterminate && (isIE11 || isEdge)) {
      this.resetIndeterminate();
      // simulate correct behavior only if onValueChange is used
      // because we cant simulate real native onChange event
      if (this.props.onValueChange && this.input) {
        const checked = !this.input.checked;

        if (this.props.checked === undefined) {
          // in case of uncontrolled mode
          this.input.checked = checked;
        }

        this.props.onValueChange(checked);
      }
    }
  };
}
