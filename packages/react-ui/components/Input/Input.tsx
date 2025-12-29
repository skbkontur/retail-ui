// TODO: Enable this rule in functional components.
import invariant from 'invariant';
import type { AriaAttributes, ClassAttributes, HTMLAttributes, ReactElement } from 'react';
import React, { createRef } from 'react';
import warning from 'warning';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject';
import { isKeyBackspace, isKeyDelete, someKeys } from '../../lib/events/keyboard/identifiers';
import type { Override } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { getRootNode, rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';
import { ClearCrossIcon } from '../../internal/ClearCrossIcon/ClearCrossIcon';
import { catchUnreachableWarning } from '../../lib/typeGuards';
import { blink } from '../../lib/blink';
import { withSize } from '../../lib/size/SizeDecorator';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

import type { InputElement, InputElementProps } from './Input.typings';
import { getStyles } from './Input.styles';
import { InputLayout } from './InputLayout/InputLayout';

export const inputTypes = ['password', 'text', 'number', 'tel', 'search', 'time', 'date', 'url', 'email'] as const;

export type InputAlign = 'left' | 'center' | 'right';
export type ShowClearIcon = 'auto' | 'always' | 'never';
export type InputType = (typeof inputTypes)[number];
export type InputIconType = React.ReactNode | (() => React.ReactNode);

export const selectionAllowedTypes: InputType[] = ['text', 'password', 'tel', 'search', 'url'];
export const selectionErrorMessage = (type: InputType, allowedTypes: InputType[] = selectionAllowedTypes): string => {
  return `<Input />. Selection is not supported by the type "${type}". Types that support selection: ${allowedTypes
    .map((i) => `"${i}"`)
    .join(', ')}. Reason: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange.`;
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
        /** Показывает иконку очистки значения в заполненном поле.
         * @default never */
        showClearIcon?: ShowClearIcon;

        /** Добавляет иконку слева.
         * При использовании `ReactNode` применяются дефолтные стили для иконки.
         * При использовании `() => ReactNode` применяются только стили для позиционирования. */
        leftIcon?: InputIconType;

        /** Добавляет иконку справа.
         * При использовании `ReactNode` применяются дефолтные стили для иконки.
         * При использовании `() => ReactNode` применяются только стили для позиционирования. */
        rightIcon?: InputIconType;

        /** Меняет визуальное отображение поля на состояние «ошибка». Может быть полезен при разработке собственной валидации, если вы не используете пакет [React UI Validations](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_displaying-getting-started--docs). */
        error?: boolean;

        /** Меняет визуальное отображение поля на состояние «предупреждение». Может быть полезен при разработке собственной валидации, если вы не используете пакет [React UI Validations](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_displaying-getting-started--docs). */
        warning?: boolean;

        /** Убирает обводку поля. */
        borderless?: boolean;

        /** Выравнивает контент внутри поля. */
        align?: InputAlign;

        /** Задаёт размер.
         * @default small
         */
        size?: SizeProp;

        /** Задаёт функцию, которая вызывается при изменении значения `value` в поле. */
        onValueChange?: (value: string) => void;

        /** @ignore */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

        /** @ignore */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

        /** @ignore */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задаёт тип поля ввода. */
        type?: InputType;

        /** Задаёт значение внутри поля. */
        value?: string;

        /** Устанавливает префикс `ReactNode` перед значением, но после иконки. */
        prefix?: React.ReactNode;

        /** Устанавливает суффикс `ReactNode` после значения, но перед правой иконкой. */
        suffix?: React.ReactNode;

        /** Выделяет введённое значение при фокусе в поле. Работает с типами `text`, `password`, `tel`, `search`, `url`. */
        selectAllOnFocus?: boolean;

        /** Устанавливает обработчик на случай некорректного ввода.
         * Если передан onUnexpectedInput, он будет вызван при ошибке, а эффект мигания можно запустить вручную через публичный метод blink.
         * @param {string} value - значение поля. */
        onUnexpectedInput?: (value: string) => void;

        /** Устанавливает радиус скруглений углов.
         * @ignore */
        corners?: Partial<
          Pick<
            React.CSSProperties,
            'borderTopRightRadius' | 'borderBottomRightRadius' | 'borderBottomLeftRadius' | 'borderTopLeftRadius'
          >
        >;

        /** Устанавливает элемент, заменяющий нативный input. Должен иметь пропсы `InputElementProps` и тип `InputElement`. */
        element?: ReactElement<InputElementProps>;
      }
    > {}

export interface InputState {
  focused: boolean;
  hovered: boolean;
  clearCrossShowed: boolean;
}

export const InputDataTids = {
  root: 'Input__root',
  clearCross: 'Input__clearCross',
} as const;

type DefaultProps = Required<Pick<InputProps, 'type' | 'showClearIcon'>>;

/**
 * Поле ввода позволяет ввести или отредактировать значение.
 */
@withRenderEnvironment
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
  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  public input: HTMLInputElement | null = null;
  public labelRef = createRef<HTMLLabelElement>();
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
    focused: false,
    hovered: false,
    clearCrossShowed: this.getClearCrossShowed({
      focused: false,
      hasInitialValue: Boolean(this.props.value || this.props.defaultValue),
    }),
  };

  public componentWillUnmount() {
    this.cancelDelayedSelectAll();
  }

  /** Программно устанавливает фокус на поле.
   * Появляется фокусная рамка, элемент получает клавиатурные события и воспринимается как текущий элемент для чтения скринридерами.
   * @public
   */
  public focus(): void {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input.focus();
  }

  /** Программно снимает фокус с поля.
   * @public
   */
  public blur(): void {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input.blur();
  }

  /** Возвращает DOM-узел поля ввода.
   * @public
   */
  public getNode(): HTMLInputElement | null {
    return this.input;
  }

  /** Кратковременно визуально подсвечивает поле ввода, чтобы привлечь внимание пользователя.
   * @public
   */
  public blink(): void {
    blink({ el: this.labelRef.current, blinkColor: this.theme.inputBlinkColor });
  }

  /** start - инициирует последовательное изменение числового значения: начинает повторяющееся увеличение/уменьшение, обычно используется при удерживании кнопки «+» или «−» для числового Input. end - останавливает ранее запущенное числоизменение, инициируемое numberStart.
   * [Документация](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
   * @public
   * @param {number} start
   * @param {number} end
   */
  public setSelectionRange(start: number, end: number): void {
    // https://github.com/facebook/react/issues/7769
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    if (!selectionAllowedTypes.includes(this.getProps().type)) {
      warning(false, selectionErrorMessage(this.getProps().type));

      return;
    }

    if (!this.input) {
      warning(false, 'Cannot call "setSelectionRange" on unmounted Input');
      return;
    }

    if (this.globalObject.document?.activeElement !== this.input) {
      this.focus();
    }

    this.input?.setSelectionRange(start, end);
  }

  public render(): JSX.Element {
    this.styles = getStyles(this.emotion);

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
   * Переводит фокус в поле (если ещё не в фокусе) и выделяет весь текст в нём.
   * Работает с типами `text`, `password`, `tel`, `search`, `url`.
   * @public
   */
  public selectAll = (): void => this._selectAll();

  public delaySelectAll = (): number | null => {
    return (this.selectAllId = this.globalObject.requestAnimationFrame?.(this._selectAll) ?? null);
  };

  private _selectAll = (): void => {
    if (this.input) {
      this.setSelectionRange(0, this.input.value.length);
    }
  };

  private cancelDelayedSelectAll = (): void => {
    if (this.selectAllId) {
      this.globalObject.cancelAnimationFrame?.(this.selectAllId);
      this.selectAllId = null;
    }
  };

  private getInput = (inputProps: InputElementProps & ClassAttributes<HTMLInputElement>) => {
    if (this.props.element) {
      return React.cloneElement(this.props.element, inputProps);
    }

    return React.createElement('input', inputProps);
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
      size,
      placeholder,
      selectAllOnFocus,
      disabled,
      onUnexpectedInput,
      prefix,
      suffix,
      corners,
      'aria-describedby': ariaDescribedby,
      'aria-controls': ariaControls,
      'aria-label': ariaLabel,
      element,
      showClearIcon,
      ...rest
    } = props;

    const { focused } = this.state;

    const labelProps = {
      className: this.cx(this.styles.root(this.theme), this.getSizeClassName(), {
        [this.styles.focus(this.theme)]: focused && !warning && !error,
        [this.styles.hovering(this.theme)]: !focused && !disabled && !warning && !error && !borderless,
        [this.styles.borderless()]: borderless && !focused,
        [this.styles.disabled(this.theme)]: disabled,
        [this.styles.warning(this.theme)]: warning,
        [this.styles.error(this.theme)]: error,
      }),
      'aria-controls': ariaControls,
      style: { width, ...corners },
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseOver,
      ref: this.labelRef,
    };

    const inputProps: InputElementProps & ClassAttributes<HTMLInputElement> = {
      ...rest,
      className: this.cx(this.styles.input(this.theme), {
        [this.styles.inputFocus(this.theme)]: focused,
        [this.styles.inputDisabled(this.theme)]: disabled,
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
      placeholder,
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
      </InputLayout>
    );
  };

  private getSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.cx({
          [this.styles.sizeLarge(this.theme)]: true,
        });
      case 'medium':
        return this.cx({
          [this.styles.sizeMedium(this.theme)]: true,
        });
      case 'small':
      default:
        return this.cx({
          [this.styles.sizeSmall(this.theme)]: true,
        });
    }
  }

  private refInput = (element: HTMLInputElement | InputElement | null) => {
    if (element && 'input' in element) {
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
      this.input && this.selectAll();
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
