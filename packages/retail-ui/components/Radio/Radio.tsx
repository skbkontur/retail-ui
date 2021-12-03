import * as React from 'react';
import * as PropTypes from 'prop-types';
import '../ensureOldIEClassName';
import { Nullable, Override } from '../../typings/utility-types';
import styles from './Radio.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Radio.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';

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
  public static __KONTUR_REACT_UI__ = 'Radio';

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

  private theme!: ITheme;
  private node: Nullable<HTMLInputElement> = null;

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
    if (this.node) {
      this.node.focus();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this.node) {
      this.node.blur();
    }
  }

  private renderMain() {
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

    let radioClassNames = cx({
      [styles.radio]: true,
      [jsStyles.radio(this.theme)]: true,
      [styles.checked]: this.props.checked,
      [jsStyles.checked(this.theme)]: this.props.checked,
      [styles.focus]: this.props.focused,
      [jsStyles.focus(this.theme)]: this.props.focused,
      [styles.error]: error,
      [jsStyles.error(this.theme)]: error,
      [styles.warning]: warning,
      [jsStyles.warning(this.theme)]: warning,
      [styles.disabled]: disabled,
      [jsStyles.disabled(this.theme)]: disabled,
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
      onClick: this.handleLabelClick,
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      radioClassNames = cx(radioClassNames, checked && cx(styles.checked, jsStyles.checked(this.theme)));
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

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderLabel() {
    const labelClassNames = cx({
      [styles.label]: true,
      [jsStyles.label(this.theme)]: true,
      [styles.labelDisabled]: !!(this.props.disabled || this.context.disabled),
    });

    return <div className={labelClassNames}>{this.props.children}</div>;
  }

  private _ref = (element: HTMLInputElement) => {
    this.node = element;
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

  private handleLabelClick: React.MouseEventHandler<HTMLLabelElement> = e =>
    fixFirefoxModifiedClickOnLabel(this.node, e);
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
