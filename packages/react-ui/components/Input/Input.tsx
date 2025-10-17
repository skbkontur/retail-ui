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
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { getRootNode, rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';
import { ClearCrossIcon } from '../../internal/ClearCrossIcon/ClearCrossIcon';
import { catchUnreachableWarning } from '../../lib/typeGuards';
import { withSize } from '../../lib/size/SizeDecorator';

import type { InputElement, InputElementProps } from './Input.typings';
import { styles } from './Input.styles';
import { InputLayout } from './InputLayout/InputLayout';
import { PolyfillPlaceholder } from './InputLayout/PolyfillPlaceholder';

export const inputTypes = ['password', 'text', 'number', 'tel', 'search', 'time', 'date', 'url', 'email'] as const;

export type InputAlign = 'left' | 'center' | 'right';
export type ShowClearIcon = 'auto' | 'always' | 'never';
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
export const calculateClearCrossShowedState = ({
  showClearIcon,
  notEmptyValue,
  focused,
  hovered,
}: {
  showClearIcon: ShowClearIcon;
  notEmptyValue: boolean;
  focused?: boolean;
  hovered?: boolean;
}): boolean => {
  switch (showClearIcon) {
    case 'always':
      return notEmptyValue;
    case 'auto':
      return Boolean((focused || hovered) && notEmptyValue);
    case 'never':
      return false;
    default:
      return catchUnreachableWarning(showClearIcon, false);
  }
};

export interface InputProps
  extends CommonProps,
    Pick<HTMLAttributes<unknown>, 'role'>,
    Pick<AriaAttributes, 'aria-describedby' | 'aria-controls' | 'aria-label'>,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /** Показывать иконку очистки значения в непустом поле:
         * - `always` — всегда показывать иконку
         * - `auto` — показывать иконку при hover/focus
         * - `never` — не показывать иконку
         * При одновременной настройке `showClearIcon` и `rightIcon` показывается иконка очистки.
         * @default never */
        showClearIcon?: ShowClearIcon;

        /** Задает иконку слева.
         * При использовании `ReactNode` применяются дефолтные стили для иконки.
         * При использовании `() => ReactNode` применяются только стили для позиционирования. */
        leftIcon?: InputIconType;

        /** Добавляет иконку справа.
         * При использовании `ReactNode` применяются дефолтные стили для иконки.
         * При использовании `() => ReactNode` применяются только стили для позиционирования. */
        rightIcon?: InputIconType;

        /** Переводит контрол в состояние валидации "ошибка". */
        error?: boolean;

        /** Переводит контрол в состояние валидации "предупреждение". */
        warning?: boolean;

        /** Убирает обводку. */
        borderless?: boolean;

        /** Задает выравнивание контента. */
        align?: InputAlign;

        /** Задает паттерн маски. Доступен для типов `text`, `password`, `email`, `tel`, `search`, `url`
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput. */
        mask?: Nullable<string>;

        /** Устанавливает символ маски.
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput. */
        maskChar?: Nullable<string>;

        /** Задает словарь символов-регулярок для задания маски
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput.
         * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }. */
        formatChars?: Record<string, string>;

        /** Включает показ символов маски.
         * @deprecated Со следующей мажорной версии Input перестанет поддерживать маску. Используйте MaskedInput. */
        alwaysShowMask?: boolean;

        /** Задает размер. */
        size?: SizeProp;

        /** Задает функцию, которая вызывается при изменении значения в инпуте. */
        onValueChange?: (value: string) => void;

        /** @ignore */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

        /** @ignore */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

        /** @ignore */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает тип инпута. */
        type?: InputType;

        /** Задает значение. */
        value?: string;

        ///** */
        capture?: boolean;

        /** Устанавливает префикс `ReactNode` перед значением, но после иконки. */
        prefix?: React.ReactNode;

        /** Устанавливает суффикс `ReactNode` после значения, но перед правой иконкой. */
        suffix?: React.ReactNode;

        /** Определяет, нужно ли выделять введенное значение при фокусе. Работает с типами `text`, `password`, `tel`, `search`, `url`. [Документация](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange) */
        selectAllOnFocus?: boolean;

        /** Задает функцию для обработки ввода.
         * При неправильном вводе инпут по-умолчанию вспыхивает акцентным цветом.
         * Если `onUnexpectedInput` передан - вызывается переданный обработчик b вспыхивание можно вызвать публичным методом инстанса `blink()`.
         * @param {string} value - значение инпута. */
        onUnexpectedInput?: (value: string) => void;

        /** Устанавливает радиус скруглений углов.
         * @ignore */
        corners?: Partial<
          Pick<
            React.CSSProperties,
            'borderTopRightRadius' | 'borderBottomRightRadius' | 'borderBottomLeftRadius' | 'borderTopLeftRadius'
          >
        >;

        /** Устанавливает элемент, заменяющий нативный input. Должен иметь пропы `InputElementProps` и тип `InputElement`. */
        element?: ReactElement<InputElementProps>;
      }
    > {}

export interface InputState {
  blinking: boolean;
  focused: boolean;
  hovered: boolean;
  needsPolyfillPlaceholder: boolean;
  clearCrossShowed: boolean;
}

export const InputDataTids = {
  root: 'Input__root',
  clearCross: 'Input__clearCross',
} as const;

type DefaultProps = Required<Pick<InputProps, 'type' | 'showClearIcon'>>;

/**
 * Поле ввода `Input` дает возможность указать значение с помощью клавиатуры.
 *
 * Используйте поле ввода для коротких текстовых или цифровых значений без предсказуемого формата.
 *
 *  Если вводимое значение имеет определенный формат, используйте специальную версию поля:
 * * Поле с паролем PasswordInput.
 * * Поле с валютой CurrencyInput.
 * * Поле с маской MaskedInput.
 * * Автополе FxInput.
 *
 * Интерфейс пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 */
@rootNode
@withSize
export class Input extends React.Component<InputProps, InputState> {
  public static __KONTUR_REACT_UI__ = 'Input';
  public static displayName = 'Input';

  public static defaultProps: DefaultProps = {
    type: 'text',
    showClearIcon: 'never',
  };
  private size!: SizeProp;

  private getProps = createPropsGetter(Input.defaultProps);

  private selectAllId: number | null = null;
  private theme!: Theme;
  private blinkTimeout: SafeTimer;
  public input: HTMLInputElement | null = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  private getClearCrossShowed = ({
    focused,
    hovered,
    hasInitialValue,
  }: {
    focused?: boolean;
    hovered?: boolean;
    hasInitialValue?: boolean;
  }): boolean => {
    if (this.props.disabled) {
      return false;
    }
    return calculateClearCrossShowedState({
      showClearIcon: this.getProps().showClearIcon,
      notEmptyValue: Boolean(this.input?.value || hasInitialValue),
      focused,
      hovered,
    });
  };

  public state: InputState = {
    needsPolyfillPlaceholder,
    blinking: false,
    focused: false,
    hovered: false,
    clearCrossShowed: this.getClearCrossShowed({
      focused: false,
      hasInitialValue: Boolean(this.props.value || this.props.defaultValue),
    }),
  };

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
      showClearIcon,
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
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
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

    const getRightIcon = () => {
      return this.state.clearCrossShowed ? (
        <ClearCrossIcon data-tid={InputDataTids.clearCross} size={this.size} onClick={this.handleClearInput} />
      ) : (
        rightIcon
      );
    };
    return (
      <InputLayout
        leftIcon={leftIcon}
        rightIcon={getRightIcon()}
        prefix={prefix}
        suffix={suffix}
        labelProps={labelProps}
        context={{ disabled: Boolean(disabled), focused, size: this.size }}
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
    switch (this.size) {
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

  private handleClearInput = () => {
    if (this.input) {
      this.input.value = '';
    }

    this.setState({ clearCrossShowed: false });

    if (this.props.onValueChange) {
      this.props.onValueChange('');
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

    this.setState({
      clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: this.state.hovered }),
    });
  };

  private handleMouseEnter = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    this.setState({
      hovered: true,
      clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: true }),
    });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };
  private handleMouseLeave = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    this.setState({
      hovered: false,
      clearCrossShowed: this.getClearCrossShowed({ focused: this.state.focused, hovered: false }),
    });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      focused: true,
      clearCrossShowed: this.getClearCrossShowed({ focused: true, hovered: this.state.hovered }),
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
    const showClearIcon = this.props.showClearIcon;
    if (showClearIcon && getRootNode(this)?.contains(event.relatedTarget)) {
      this.setState({ focused: false });
    } else {
      const clearCrossShowed = this.getClearCrossShowed({ focused: false, hovered: this.state.hovered });
      this.setState({
        focused: false,
        clearCrossShowed,
      });
      this.props.onBlur?.(event);
    }
  };
}
