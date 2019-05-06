import * as React from 'react';
import * as PropTypes from 'prop-types';
import '../ensureOldIEClassName';
import { Nullable, Override } from '../../typings/utility-types';
import styles from './Radio.less';
import { cx as classNames } from 'emotion';
import jsStyles from './Radio.styles';
import ThemeFactory from '../../lib/theming/ThemeFactory';

const theme = ThemeFactory.getDefaultTheme();

export interface SyntheticRadioEvent<T> {
  target: {
    id: Nullable<string>;
    name: Nullable<string>;
    checked: Nullable<boolean>;
    disabled: Nullable<boolean>;
    value: T;
  };
}

export type RadioProps<T> = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    /** Состояние ошибки */
    error?: boolean;
    /** Состояние Предупреждения */
    warning?: boolean;
    /** Состояние фокуса */
    focused?: boolean;
    /** Состояние нажатия */
    pressed?: boolean;
    /** Состояние hover */
    hovered?: boolean;
    /** Состояние active */
    active?: boolean;
    /** onChange */
    onChange?: (event: SyntheticRadioEvent<T>, value: T) => void;
    /** onChange */
    onMouseEnter?: (event: SyntheticRadioEvent<T>) => void;
    /** onChange */
    onMouseLeave?: (event: SyntheticRadioEvent<T>) => void;
    /** onChange */
    onMouseOver?: (event: SyntheticRadioEvent<T>) => void;
    /** Значение */
    value: T;
  }
>;

/**
 * Радиокнопка.
 *
 * Если находится внутри компонента **RadioGroup**, то наследует
 * параметры `checked`, `name` и `onChange`. Также наследует состояния
 * `disabled`, `error` и `warning`
 *
 * ```js
 * type SyntheticRadioEvent<T> = {
 * target: {
 *    id: ?string,
 *    name: ?string,
 *    checked: ?boolean,
 *    disabled: ?boolean,
 *    value: T
 *  }
 * };
 * ```
 */
class Radio<T> extends React.Component<RadioProps<T>> {
  public static contextTypes = {
    activeItem: PropTypes.any,
    onSelect: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
  };

  public static defaultProps = {
    focused: false,
  };

  public static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    focused: PropTypes.bool,
    hovered: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    pressed: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.any.isRequired,
    warning: PropTypes.bool,
    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  private _node: Nullable<HTMLInputElement> = null;

  public render() {
    const {
      active,
      children,
      disabled = this.context.disabled,
      warning = this.context.warning,
      error = this.context.error,
      focused,
      pressed,
      hovered,
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
      onChange,

      className,
      style,

      ...rest
    } = this.props;

    let radioClassNames = classNames({
      [styles.radio]: true,
      [jsStyles.radio(theme)]: true,
      [styles.checked]: this.props.checked,
      [jsStyles.checked(theme)]: this.props.checked,
      [styles.focus]: this.props.focused,
      [jsStyles.focus(theme)]: this.props.focused,
      [styles.error]: error,
      [jsStyles.error(theme)]: error,
      [styles.warning]: warning,
      [jsStyles.warning(theme)]: warning,
      [styles.disabled]: disabled,
      [jsStyles.disabled(theme)]: disabled,
    });

    let value: string | number | undefined;
    if (typeof this.props.value === 'string' || typeof this.props.value === 'number') {
      value = this.props.value;
    }

    const inputProps = {
      ...rest,
      type: 'radio',
      className: styles.input,
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this._ref,
      onChange: this._handleChange,
      onMouseOver: () => {
        if (this.props.onMouseOver) {
          this.props.onMouseOver(createSyntheticEvent(this.props));
        }
      },
      onMouseEnter: () => {
        if (this.props.onMouseEnter) {
          this.props.onMouseEnter(createSyntheticEvent(this.props));
        }
      },
      onMouseLeave: () => {
        if (this.props.onMouseLeave) {
          this.props.onMouseLeave(createSyntheticEvent(this.props));
        }
      },
    };

    const labelProps = {
      className: styles.root,
      onMouseOver: this._handleMouseOver,
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave,
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      radioClassNames = classNames(radioClassNames, checked && classNames(styles.checked, jsStyles.checked(theme)));
    }

    return (
      <label {...labelProps}>
        <input {...inputProps} />
        <span className={radioClassNames}>
          <span className={styles.placeholder} />
        </span>
        {this.props.children && this.renderLabel()}
      </label>
    );
  }

  /**
   * @public
   */
  public focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderLabel() {
    const labelClassNames = classNames({
      [styles.label]: true,
      [jsStyles.label(theme)]: true,
      [styles.labelDisabled]: !!this.props.disabled,
    });

    return <div className={labelClassNames}>{this.props.children}</div>;
  }

  private _ref = (element: HTMLInputElement) => {
    this._node = element;
  };

  private _handleChange = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
    if (this._isInRadioGroup()) {
      this.context.onSelect(event, event.target.value);
    }
  };

  private _handleMouseOver = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onMouseOver) {
      this.props.onMouseOver(event);
    }
  };

  private _handleMouseEnter = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  private _handleMouseLeave = () => {
    const event = createSyntheticEvent(this.props);
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };
}

function createSyntheticEvent<T>({ value, id, name, checked, disabled }: RadioProps<T>): SyntheticRadioEvent<T> {
  const target = {
    value,
    id,
    name,
    checked,
    disabled,
  };
  const syntheticEvent = {
    target,
  };
  return syntheticEvent;
}

export default Radio;
