// TODO: Enable this rule in functional components.
import invariant from 'invariant';
import type { AriaAttributes, ClassAttributes, HTMLAttributes, ReactElement } from 'react';
import React from 'react';
import warning from 'warning';
import type { SafeTimer } from '@skbkontur/global-object';
import { globalObject } from '@skbkontur/global-object';

import { isEdge, isIE11 } from '../../lib/client';
import { isKeyBackspace, isKeyDelete, someKeys } from '../../lib/events/keyboard/identifiers';
import { needsPolyfillPlaceholder } from '../../lib/needsPolyfillPlaceholder';
import type { Nullable, Override } from '../../typings/utility-types';
import { InternalMaskedInput } from '../../internal/InternalMaskedInput';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import type { TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';

import type { InputElement, InputElementProps } from './Input.typings';
import { styles } from './Input.styles';
import { InputLayout } from './InputLayout/InputLayout';
import { PolyfillPlaceholder } from './InputLayout/PolyfillPlaceholder';

export const inputTypes = ['password', 'text', 'number', 'tel', 'search', 'time', 'date', 'url', 'email'] as const;

export type InputAlign = 'left' | 'center' | 'right';
export type InputType = (typeof inputTypes)[number];
export type InputIconType = React.ReactNode | (() => React.ReactNode);

export const selectionAllowedTypes: InputType[] = ['text', 'password', 'tel', 'search', 'url'];
export const selectionErrorMessage = (type: InputType, allowedTypes: InputType[] = selectionAllowedTypes) => {
  return `<Input />. Selection is not supported by the type "${type}". Types that support selection: ${allowedTypes
    .map((i) => `"${i}"`)
    .join(', ')}. Reason: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange.`;
};

export const maskForbiddenTypes: InputType[] = ['number', 'date', 'time'];
export const maskAllowedTypes: InputType[] = inputTypes.filter((type) => {
  return !maskForbiddenTypes.includes(type);
});
export const maskErrorMessage = (type: InputType, allowedTypes: InputType[] = maskAllowedTypes) => {
  return `<Input />. Prop "mask" does not support type "${type}". Supported types: ${allowedTypes
    .map((i) => `"${i}"`)
    .join(', ')}.`;
};

export interface InputProps
  extends CommonProps,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<AriaAttributes, 'aria-describedby' | 'aria-controls' | 'aria-label'>,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /**
         * Иконка слева
         * Если `ReactNode` применяются дефолтные стили для иконки
         * Если `() => ReactNode` применяются только стили для позиционирование
         */
        leftIcon?: InputIconType;
        /**
         * Иконка справа
         * Если `ReactNode` применяются дефолтные стили для иконки
         * Если `() => ReactNode` применяются только стили для позиционирование
         */
        rightIcon?: InputIconType;
        /**
         * Состояние валидации при ошибке.
         */
        error?: boolean;
        /**
         * Состояние валидации при предупреждении.
         */
        warning?: boolean;
        /** Режим прозрачной рамки */
        borderless?: boolean;
        /** Выравнивание текста */
        align?: InputAlign;
        /**
         * Паттерн маски. Доступен для типов `text`, `password`, `email`, `tel`, `search`, `url`
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput
         */
        mask?: Nullable<string>;
        /**
         * Символ маски
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput
         */
        maskChar?: Nullable<string>;
        /**
         * Словарь символов-регулярок для задания маски
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput
         * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
         */
        formatChars?: Record<string, string>;
        /**
         * Показывать символы маски
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput
         */
        alwaysShowMask?: boolean;
        /** Размер */
        size?: SizeProp;
        /** onValueChange */
        onValueChange?: (value: string) => void;
        /** Вызывается на label */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается на label */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается на label */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * Тип. Возможные значения: 'password' | 'text' | 'number' | 'tel' | 'search' | 'time' | 'date' | 'url' | 'email'
         * */
        type?: InputType;
        /** Значение */
        value?: string;
        capture?: boolean;

        /**
         * Префикс
         * `ReactNode` перед значением, но после иконки
         */
        prefix?: React.ReactNode;
        /**
         * Суффикс
         * `ReactNode` после значения, но перед правой иконкой
         */
        suffix?: React.ReactNode;
        /** Выделять введенное значение при фокусе. Работает с типами `text`, `password`, `tel`, `search`, `url`. [Документация](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange) */
        selectAllOnFocus?: boolean;
        /**
         * Обработчик неправильного ввода.
         * По-умолчанию, инпут вспыхивает акцентным цветом.
         * Если передан - вызывается переданный обработчик,
         * в таком случае вспыхивание можно вызвать
         * публичным методом инстанса `blink()`.
         *
         * @param value значение инпута.
         */
        onUnexpectedInput?: (value: string) => void;
        /** @ignore */
        corners?: Partial<
          Pick<
            React.CSSProperties,
            'borderTopRightRadius' | 'borderBottomRightRadius' | 'borderBottomLeftRadius' | 'borderTopLeftRadius'
          >
        >;
        /**
         * Элемент заменяет нативный input.
         * Должен иметь пропы `InputElementProps` и тип `InputElement`
         * */
        element?: ReactElement<InputElementProps>;
      }
    > {}

export interface InputState {
  blinking: boolean;
  focused: boolean;
  needsPolyfillPlaceholder: boolean;
}

export const InputDataTids = {
  root: 'Input__root',
} as const;

type DefaultProps = Required<Pick<InputProps, 'size' | 'type'>>;

/**
 * Интерфейс пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 *  Все пропсы кроме перечисленных, `className` и `style` передаются в `<input>`
 */
@rootNode
export class Input extends React.Component<InputProps, InputState> {
  public static __KONTUR_REACT_UI__ = 'Input';
  public static displayName = 'Input';

  public static defaultProps: DefaultProps = {
    size: 'small',
    type: 'text',
  };

  private getProps = createPropsGetter(Input.defaultProps);

  public state: InputState = {
    needsPolyfillPlaceholder,
    blinking: false,
    focused: false,
  };

  private selectAllId: number | null = null;
  private theme!: Theme;
  private blinkTimeout: SafeTimer;
  public input: HTMLInputElement | null = null;
  private setRootNode!: TSetRootNode;

  private outputMaskError() {
    warning(!(this.props.mask && this.canBeUsedWithMask), maskErrorMessage(this.getProps().type));
  }

  public componentDidMount() {
    this.outputMaskError();
  }

  public componentDidUpdate(prevProps: Readonly<InputProps>) {
    if (this.props.type !== prevProps.type || this.props.mask !== prevProps.mask) {
      this.outputMaskError();
    }
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      globalObject.clearTimeout(this.blinkTimeout);
    }
    this.cancelDelayedSelectAll();
  }

  /**
   * @public
   */
  public focus() {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input.focus();
  }

  /**
   * @public
   */
  public blur() {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input.blur();
  }

  /**
   * @public
   */
  public getNode() {
    return this.input;
  }

  /**
   * @public
   */
  public blink() {
    if (this.blinkTimeout) {
      this.cancelBlink(() => {
        // trigger reflow to restart animation
        // @see https://css-tricks.com/restart-css-animation/#article-header-id-0
        void (this.input && this.input.offsetWidth);
        this.blink();
      });
      return;
    }
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = globalObject.setTimeout(this.cancelBlink, 150);
    });
  }

  /**
   * @public
   * @param {number} start
   * @param {number} end
   */
  public setSelectionRange(start: number, end: number) {
    // https://github.com/facebook/react/issues/7769
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    if (!selectionAllowedTypes.includes(this.getProps().type)) {
      warning(false, selectionErrorMessage(this.getProps().type));

      return;
    }

    if (!this.input) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (globalObject.document?.activeElement !== this.input) {
      this.focus();
    }
    if (this.props.mask && this.props.value && this.props.value?.length < this.props.mask.length) {
      globalObject.setTimeout(() => {
        this.input?.setSelectionRange(start, end);
      }, 150);
    } else {
      this.input?.setSelectionRange(start, end);
    }
  }

  public get isMaskVisible(): boolean {
    const { mask, alwaysShowMask } = this.props;
    const { focused } = this.state;
    return Boolean(mask && (focused || alwaysShowMask));
  }

  public render(): JSX.Element {
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

  private get canBeUsedWithMask() {
    return maskForbiddenTypes.includes(this.getProps().type);
  }

  /**
   * Работает с типами `text`, `password`, `tel`, `search`, `url`
   * [Документация](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
   * @public
   */
  public selectAll = (): void => this._selectAll();

  public delaySelectAll = (): number | null => {
    return (this.selectAllId = globalObject.requestAnimationFrame?.(this._selectAll) ?? null);
  };

  private _selectAll = (): void => {
    if (this.input) {
      this.setSelectionRange(0, this.input.value.length);
    }
  };

  private cancelDelayedSelectAll = (): void => {
    if (this.selectAllId) {
      globalObject.cancelAnimationFrame?.(this.selectAllId);
      this.selectAllId = null;
    }
  };

  private cancelBlink = (callback?: () => void): void => {
    if (this.blinkTimeout) {
      globalObject.clearTimeout(this.blinkTimeout);
      this.blinkTimeout = 0;
      if (this.state.blinking) {
        this.setState({ blinking: false }, callback);
        return;
      }
    }
    if (callback) {
      callback();
    }
  };

  private getInput = (inputProps: InputElementProps & ClassAttributes<HTMLInputElement>) => {
    if (this.props.element) {
      return React.cloneElement(this.props.element, inputProps);
    }

    return this.props.mask && !this.canBeUsedWithMask
      ? this.renderMaskedInput(inputProps, this.props.mask)
      : React.createElement('input', inputProps);
  };

  private renderMain = (props: CommonWrapperRestProps<InputProps>) => {
    const {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onKeyDown,
      onKeyPress,
      onValueChange,
      width,
      error,
      role,
      warning,
      leftIcon,
      rightIcon,
      borderless,
      value,
      align,
      type,
      mask,
      maskChar,
      alwaysShowMask,
      size,
      placeholder,
      selectAllOnFocus,
      disabled,
      onUnexpectedInput,
      prefix,
      suffix,
      formatChars,
      corners,
      'aria-describedby': ariaDescribedby,
      'aria-controls': ariaControls,
      'aria-label': ariaLabel,
      element,
      ...rest
    } = props;

    const { blinking, focused } = this.state;

    const labelProps = {
      className: cx(styles.root(this.theme), this.getSizeClassName(), {
        [styles.focus(this.theme)]: focused && !warning && !error,
        [styles.hovering(this.theme)]: !focused && !disabled && !warning && !error && !borderless,
        [styles.blink(this.theme)]: blinking,
        [styles.borderless()]: borderless && !focused,
        [styles.disabled(this.theme)]: disabled,
        [styles.warning(this.theme)]: warning,
        [styles.error(this.theme)]: error,
        [styles.focusFallback(this.theme)]: focused && (isIE11 || isEdge),
        [styles.warningFallback(this.theme)]: warning && (isIE11 || isEdge),
        [styles.errorFallback(this.theme)]: error && (isIE11 || isEdge),
      }),
      'aria-controls': ariaControls,
      style: { width, ...corners },
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
    };

    const inputProps: InputElementProps & ClassAttributes<HTMLInputElement> = {
      ...rest,
      className: cx(styles.input(this.theme), {
        [styles.inputFocus(this.theme)]: focused,
        [styles.inputDisabled(this.theme)]: disabled,
      }),
      value,
      role,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onBlur: this.handleBlur,
      style: { textAlign: align },
      ref: this.refInput,
      type,
      placeholder: !this.isMaskVisible && !needsPolyfillPlaceholder ? placeholder : undefined,
      disabled,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
    };

    const input = (
      <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>{this.getInput(inputProps)}</FocusControlWrapper>
    );

    return (
      <InputLayout
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        prefix={prefix}
        suffix={suffix}
        labelProps={labelProps}
        context={{ disabled: Boolean(disabled), focused, size }}
      >
        {input}
        {this.state.needsPolyfillPlaceholder && (
          <PolyfillPlaceholder
            isMaskVisible={this.isMaskVisible}
            value={value}
            defaultValue={this.props.defaultValue}
            align={align}
          >
            {placeholder}
          </PolyfillPlaceholder>
        )}
      </InputLayout>
    );
  };

  private renderMaskedInput(inputProps: React.InputHTMLAttributes<HTMLInputElement>, mask: string) {
    return (
      <InternalMaskedInput
        {...inputProps}
        mask={mask}
        maskChar={this.props.maskChar}
        alwaysShowMask={this.props.alwaysShowMask}
        formatChars={this.props.formatChars}
        onChange={this.props.onChange}
        onValueChange={this.handleMaskedValueChange}
        onUnexpectedInput={this.handleUnexpectedInput}
      />
    );
  }

  private getSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return cx({
          [styles.sizeLarge(this.theme)]: true,
          [styles.sizeLargeFallback(this.theme)]: isIE11 || isEdge,
        });
      case 'medium':
        return cx({
          [styles.sizeMedium(this.theme)]: true,
          [styles.sizeMediumFallback(this.theme)]: isIE11 || isEdge,
        });
      case 'small':
      default:
        return cx({
          [styles.sizeSmall(this.theme)]: true,
          [styles.sizeSmallFallback(this.theme)]: isIE11 || isEdge,
        });
    }
  }

  private refInput = (element: HTMLInputElement | InternalMaskedInput | InputElement | null) => {
    if (element instanceof InternalMaskedInput || (element && 'input' in element)) {
      this.input = element.input;
    } else {
      this.input = element;
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (needsPolyfillPlaceholder) {
      const fieldIsEmpty = event.target.value === '';
      if (this.state.needsPolyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ needsPolyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      focused: true,
    });

    if (this.props.selectAllOnFocus) {
      this.input && !isIE11 ? this.selectAll() : this.delaySelectAll();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const isDeleteKey = someKeys(isKeyBackspace, isKeyDelete)(e);

    if (!e.currentTarget.value && isDeleteKey && !e.repeat) {
      this.handleUnexpectedInput();
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }

    if (this.props.maxLength === event.currentTarget.value.length) {
      this.handleUnexpectedInput(event.currentTarget.value);
    }
  };

  private handleMaskedValueChange = (value: string) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  private handleUnexpectedInput = (value: string = this.props.value || '') => {
    if (this.props.onUnexpectedInput) {
      this.props.onUnexpectedInput(value);
    } else {
      this.blink();
    }
  };

  private resetFocus = () => this.setState({ focused: false });

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.resetFocus();
    this.props.onBlur?.(event);
  };
}
