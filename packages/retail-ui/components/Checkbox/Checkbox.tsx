import React from 'react';
import PropTypes from 'prop-types';

import { Nullable, Override } from '../../typings/utility-types';
import { tabListener } from '../../lib/events/tabListener';
import { cx } from '../../lib/theming/Emotion';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';
import { OkIcon, SquareIcon } from '../internal/icons/16px';
import { isEdge, isFirefox, isIE11 } from '../../lib/utils';

import { classes, jsStyles } from './Checkbox.styles';

export type CheckboxProps = Override<
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
>;

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
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  /**
   * @public
   */
  public focus() {
    tabListener.isTabPressed = true;
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.input) {
      this.input.blur();
    }
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

  private renderMain() {
    const props = this.props;
    const {
      children,
      error,
      warning,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onValueChange,
      style,
      className,
      type,
      initialIndeterminate,
      ...rest
    } = props;
    const isIndeterminate = this.state.indeterminate;

    const rootClass = cx(classes.root, jsStyles.root(this.theme), {
      [jsStyles.rootFallback()]: isIE11 || isEdge,
      [classes.disabled]: !!props.disabled,
      [jsStyles.disabled(this.theme)]: !!props.disabled,
      [jsStyles.checked(this.theme)]: !!props.checked,
      [jsStyles.indeterminate(this.theme)]: isIndeterminate,
      [jsStyles.focus(this.theme)]: this.state.focusedByTab,
      [jsStyles.warning(this.theme)]: !!props.warning,
      [jsStyles.error(this.theme)]: !!props.error,
    });

    const inputProps = {
      ...rest,
      type: 'checkbox',
      className: jsStyles.input(this.theme),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      ref: this.inputRef,
    };

    let caption = null;
    if (children) {
      const captionClass = cx(jsStyles.caption(this.theme), {
        [jsStyles.captionIE11()]: isIE11 || isEdge,
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    const iconClass = cx({
      [jsStyles.iconUnchecked()]: !props.checked && !isIndeterminate,
      [jsStyles.iconFixBaseline()]: isFirefox || isIE11 || isEdge,
    });

    const box = (
      <span className={cx(classes.box, jsStyles.box(this.theme))}>
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
  }

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
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.setState({ focusedByTab: false });
  };

  private inputRef = (ref: HTMLInputElement | null) => {
    this.input = ref;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    if (this.props.onValueChange) {
      this.props.onValueChange(checked);
    }
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    this.resetIndeterminate();
  };
}
