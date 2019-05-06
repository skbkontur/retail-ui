import * as React from 'react';
import * as PropTypes from 'prop-types';
import OkIcon from '@skbkontur/react-icons/Ok';
import '../ensureOldIEClassName';
import { Nullable, Override } from '../../typings/utility-types';
import tabListener from '../../lib/events/tabListener';
import { cx as classNames } from 'emotion';
import styles from './Checkbox.less';
import jsStyles from './Checkbox.styles';
import ThemeFactory from '../../lib/theming/ThemeFactory';

const theme = ThemeFactory.getDefaultTheme();

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
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };
  public state = {
    focusedByTab: false,
    indeterminate: this.props.initialIndeterminate || false,
  };

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
    const hasCaption = !!children;

    const rootClass = classNames({
      [styles.root]: true,
      [styles.withoutCaption]: !hasCaption,
      [styles.disabled]: !!props.disabled,
      [jsStyles.root(theme)]: true,
      [jsStyles.checked(theme) || '']: !!props.checked,
      [jsStyles.focus(theme)]: this.state.focusedByTab,
      [jsStyles.warning(theme)]: !!props.warning,
      [jsStyles.error(theme)]: !!props.error,
    });

    const inputProps = {
      ...rest,
      type: 'checkbox',
      className: styles.input,
      onChange: this._handleChange,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      ref: this._inputRef,
    };

    let caption = null;
    if (hasCaption) {
      caption = <div className={styles.caption}>{children}</div>;
    }

    const isIndeterminate = this.state.indeterminate;
    const boxClass = classNames(styles.box, jsStyles.box(theme), isIndeterminate && jsStyles.boxIndeterminate(theme));
    return (
      <label className={rootClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
        <input {...inputProps} />
        <span className={boxClass}>
          {isIndeterminate ? (
            <span className={classNames(styles.indeterminate, jsStyles.indeterminate(theme))} />
          ) : (
            props.checked && (
              <div className={styles.ok}>
                <OkIcon />
              </div>
            )
          )}
        </span>
        {caption}
      </label>
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

  private _handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabListener.isTabPressed) {
          this.setState({ focusedByTab: true });
          tabListener.isTabPressed = false;
        }
      });
    }
  };

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _inputRef = (ref: HTMLInputElement | null) => {
    this.input = ref;
  };

  private _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    if (this.props.onChange) {
      this.props.onChange(event, checked);
    }

    this.resetIndeterminate();
  };
}

export default Checkbox;
