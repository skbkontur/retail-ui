import type { AriaAttributes } from 'react';
import React from 'react';
import { globalObject } from '@skbkontur/global-object';

import type { Override } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { keyListener } from '../../lib/events/keyListener';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';
import { isEdge, isIE11 } from '../../lib/client';
import type { RadioGroupContextType } from '../RadioGroup/RadioGroupContext';
import { RadioGroupContext } from '../RadioGroup/RadioGroupContext';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';

import { styles, globalClasses } from './Radio.styles';

export interface RadioProps<T>
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /** Переводит контрол в состояние валидации "ошибка". */
        error?: boolean;

        /** Переводит контрол в состояние валидации "предупреждение". */
        warning?: boolean;

        /** Задает размер. */
        size?: SizeProp;

        /** Задает состояние фокуса. */
        focused?: boolean;

        /** Задает функцию, которая вызывается при изменении value. */
        onValueChange?: (value: T) => void;

        /** Задает HTML-событие `onmouseenter`.
         * @ignore */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает HTML-событие `onmouseleave`.
         * @ignore */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает HTML-событие `onmouseover`.
         * @ignore */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;

        /** Устанавливает значение. */
        value: T;
      }
    > {}

export interface RadioState {
  focusedByKeyboard: boolean;
}

export const RadioDataTids = {
  root: 'Radio__root',
} as const;

type DefaultProps = Required<Pick<RadioProps<any>, 'focused' | 'size'>>;

/**
 * Радио-кнопки `Radio` используются, когда может быть выбран только один вариант из нескольких.
 */
@rootNode
export class Radio<T> extends React.Component<RadioProps<T>, RadioState> {
  public static __KONTUR_REACT_UI__ = 'Radio';
  public static displayName = 'Radio';

  public state = {
    focusedByKeyboard: false,
  };

  public static defaultProps: DefaultProps = {
    focused: false,
    size: 'small',
  };

  private getProps = createPropsGetter(Radio.defaultProps);

  public static contextType = RadioGroupContext;
  public context: RadioGroupContextType<T> = this.context;

  private inputEl = React.createRef<HTMLInputElement>();
  private setRootNode!: TSetRootNode;
  private theme!: Theme;

  private getRootSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.rootLarge(this.theme);
      case 'medium':
        return styles.rootMedium(this.theme);
      case 'small':
      default:
        return styles.rootSmall(this.theme);
    }
  }

  private getCircleSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.circleLarge(this.theme);
      case 'medium':
        return styles.circleMedium(this.theme);
      case 'small':
      default:
        return styles.circleSmall(this.theme);
    }
  }

  private getCheckedSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.checkedLarge(this.theme);
      case 'medium':
        return styles.checkedMedium(this.theme);
      case 'small':
      default:
        return styles.checkedSmall(this.theme);
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * @public
   */
  public focus() {
    keyListener.isTabPressed = true;
    this.inputEl.current?.focus();
  }

  /**
   * @public
   */
  public blur() {
    this.inputEl.current?.blur();
  }

  public renderMain = (props: CommonWrapperRestProps<RadioProps<T>>) => {
    const {
      disabled = this.context.disabled,
      warning = this.context.warning,
      error = this.context.error,
      size,
      focused,
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
      onValueChange,
      ...rest
    } = props;

    const radioProps = {
      className: cx({
        [styles.circle(this.theme)]: true,
        [this.getCircleSizeClassName()]: true,
        [styles.checked(this.theme)]: this.props.checked,
        [this.getCheckedSizeClassName()]: this.props.checked,
        [styles.focus(this.theme)]: this.getProps().focused || this.state.focusedByKeyboard,
        [styles.error(this.theme)]: error,
        [styles.warning(this.theme)]: warning,
        [styles.disabled(this.theme)]: disabled,
        [styles.checkedDisabled(this.theme)]: this.props.checked && disabled,
        [globalClasses.circle]: true,
      }),
    };

    let value: string | number | undefined;
    if (typeof this.props.value === 'string' || typeof this.props.value === 'number') {
      value = this.props.value;
    }

    const inputProps = {
      ...rest,
      type: 'radio',
      className: styles.input(),
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this.inputEl,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    const labelProps = {
      className: cx(styles.root(this.theme), this.getRootSizeClassName(), {
        [styles.rootChecked(this.theme)]: this.props.checked,
        [styles.rootIE11()]: isIE11 || isEdge,
      }),
      onMouseOver: this.handleMouseOver,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: fixFirefoxModifiedClickOnLabel(this.inputEl),
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      inputProps.suppressHydrationWarning = true;
      labelProps.className = cx(styles.root(this.theme), this.getRootSizeClassName(), {
        [styles.rootChecked(this.theme)]: checked,
        [styles.rootIE11()]: isIE11 || isEdge,
      });
      radioProps.className = cx(radioProps.className, {
        [styles.checked(this.theme)]: checked,
        [this.getCheckedSizeClassName()]: checked,
        [styles.checkedDisabled(this.theme)]: checked && disabled,
      });
    }

    return (
      <label data-tid={RadioDataTids.root} {...labelProps}>
        <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
          <input {...inputProps} />
        </FocusControlWrapper>
        <span {...radioProps}>
          <span className={styles.placeholder()} />
        </span>
        {this.props.children && this.renderCaption()}
      </label>
    );
  };

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderCaption() {
    const captionClassNames = cx({
      [styles.caption(this.theme)]: true,
      [styles.captionDisabled(this.theme)]: !!(this.props.disabled || this.context.disabled),
      [styles.captionIE11()]: isIE11 || isEdge,
    });

    return <div className={captionClassNames}>{this.props.children}</div>;
  }

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.onValueChange?.(this.props.value);

    if (this._isInRadioGroup()) {
      this.context.onSelect(this.props.value);
    }

    this.props.onChange?.(e);
  };

  private handleMouseOver: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseOver?.(e);
  };

  private handleMouseEnter: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseEnter?.(e);
  };

  private handleMouseLeave: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseLeave?.(e);
  };

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.context.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      globalObject.requestAnimationFrame?.(() => {
        if (keyListener.isArrowPressed || keyListener.isTabPressed) {
          this.setState({ focusedByKeyboard: true });
        }
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private resetFocus = () => this.setState({ focusedByKeyboard: false });

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.resetFocus();
    this.props.onBlur?.(e);
  };
}
