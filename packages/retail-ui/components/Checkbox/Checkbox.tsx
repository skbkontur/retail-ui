import * as React from 'react';
import * as PropTypes from 'prop-types';
import OkIcon from '@skbkontur/react-icons/Ok';
import { Nullable, Override } from '../../typings/utility-types';
import tabListener from '../../lib/events/tabListener';
import { cx } from '../../lib/theming/Emotion';
import { isEdge, isIE } from '../ensureOldIEClassName';
import jsStyles, { classes } from './Checkbox.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';

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
    /** onChange */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
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
class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  public static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  public state = {
    focusedByTab: false,
    indeterminate: this.props.initialIndeterminate || false,
  };

  private theme!: ITheme;
  private input: Nullable<HTMLInputElement>;

  public componentDidMount = () => {
    if (this.state.indeterminate && this.input) {
      this.input.indeterminate = true;
    }
  };

  public componentWillReceiveProps(nextProps: CheckboxProps) {
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
      onChange,
      style,
      className,
      type,
      initialIndeterminate,
      ...rest
    } = props;

    const rootClass = cx(classes.root, jsStyles.root(this.theme), {
      [classes.disabled]: !!props.disabled,
      [jsStyles.disabled(this.theme)]: !!props.disabled,
      [jsStyles.checked(this.theme)]: !!props.checked,
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
      caption = <div className={jsStyles.caption(this.theme)}>{children}</div>;
    }

    const isIndeterminate = this.state.indeterminate;
    const boxClass = cx(classes.box, jsStyles.box(this.theme), {
      [jsStyles.boxIndeterminate(this.theme)]: isIndeterminate,
    });

    const box = (
      <span className={boxClass}>
        {(isIndeterminate && <span className={jsStyles.indeterminate(this.theme)} />) || (props.checked && <OkIcon />)}
      </span>
    );

    return (
      <label className={rootClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
        <input {...inputProps} />
        {isIE || isEdge ? <span className={jsStyles.boxWrapperIE11(this.theme)}>{box}</span> : box}
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
    if (this.props.onChange) {
      this.props.onChange(event, checked);
    }

    this.resetIndeterminate();
  };
}

export default Checkbox;
