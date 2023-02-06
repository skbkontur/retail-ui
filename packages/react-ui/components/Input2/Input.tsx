// TODO: Enable this rule in functional components.
/* eslint-disable @typescript-eslint/no-unused-vars */
import invariant from 'invariant';
import React from 'react';
import raf from 'raf';

import { isIE11 } from '../../lib/client';
import { isKeyBackspace, isKeyDelete, someKeys } from '../../lib/events/keyboard/identifiers';
import { needsPolyfillPlaceholder } from '../../lib/needsPolyfillPlaceholder';
import { Nullable, Override } from '../../typings/utility-types';
import { MaskedInput } from '../../internal/MaskedInput';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import {
  RootView,
  LeftContentView,
  RightContentView,
  LeftIconView,
  RightIconView,
  PrefixView,
  SuffixView,
  CenterContentView,
  PlaceholderView,
  InputView,
} from './views';
import { InputContext } from './InputContext';

export type InputSize = 'small' | 'medium' | 'large';
export type InputAlign = 'left' | 'center' | 'right';
export type InputType = 'password' | 'text';
export type InputIconType = React.ReactNode | (() => React.ReactNode);

export interface InputProps
  extends CommonProps,
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
        /** Паттерн маски */
        mask?: Nullable<string>;
        /** Символ маски */
        maskChar?: Nullable<string>;
        /**
         * Словарь символов-регулярок для задания маски
         * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
         */
        formatChars?: Record<string, string>;
        /** Показывать символы маски */
        alwaysShowMask?: boolean;
        /** Размер */
        size?: InputSize;
        /** onValueChange */
        onValueChange?: (value: string) => void;
        /** Вызывается на label */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается на label */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
        /** Вызывается на label */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
        /** Тип */
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
        /** Выделять введенное значение при фокусе */
        selectAllOnFocus?: boolean;
        /**
         * Обработчик неправильного ввода.
         * По-умолчанию, инпут вспыхивает синим.
         * Если передан - вызывается переданный обработчик,
         * в таком случае вспыхивание можно вызвать
         * публичным методом инстанса `blink()`.
         *
         * @param value значение инпута.
         */
        onUnexpectedInput?: (value: string) => void;
      }
    > {}

export interface InputState {
  blinking: boolean;
  focused: boolean;
  needsPolyfillPlaceholder: boolean;
}

export type InputViewType = React.FC;

export const InputDataTids = {
  root: 'Input__root',
} as const;

type DefaultProps = Required<Pick<InputProps, 'size'>>;

/**
 * Интерфейс пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 *  Все пропсы кроме перечисленных, `className` и `style` передаются в `<input>`
 */
@rootNode
export class Input extends React.Component<InputProps, InputState> {
  public static __KONTUR_REACT_UI__ = 'Input';

  public static defaultProps: DefaultProps = {
    size: 'small',
  };

  public state: InputState = {
    needsPolyfillPlaceholder,
    blinking: false,
    focused: false,
  };

  private selectAllId: number | null = null;
  private blinkTimeout = 0;
  private input: HTMLInputElement | null = null;
  private setRootNode!: TSetRootNode;

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
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
      this.blinkTimeout = window.setTimeout(this.cancelBlink, 150);
    });
  }

  /**
   * @public
   * @param {number} start
   * @param {number} end
   */
  public setSelectionRange(start: number, end: number) {
    if (!this.input) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (document.activeElement !== this.input) {
      this.focus();
    }

    this.input.setSelectionRange(start, end);
  }

  public render(): JSX.Element {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  /**
   * @public
   */
  public selectAll = (): void => {
    if (this.input) {
      this.setSelectionRange(0, this.input.value.length);
    }
  };

  private delaySelectAll = (): number => (this.selectAllId = raf(this.selectAll));

  private cancelDelayedSelectAll = (): void => {
    if (this.selectAllId) {
      raf.cancel(this.selectAllId);
      this.selectAllId = null;
    }
  };

  private cancelBlink = (callback?: () => void): void => {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
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

  private renderMain = (props: CommonWrapperRestProps<InputProps>) => {
    return (
      <InputContext.Provider
        value={{
          ...props,
          ...this.state,
          handleBlur: this.handleBlur,
          handleChange: this.handleChange,
          handleFocus: this.handleFocus,
          handleKeyDown: this.handleKeyDown,
          handleKeyPress: this.handleKeyPress,
          handleMaskedValueChange: this.handleMaskedValueChange,
          handleUnexpectedInput: this.handleUnexpectedInput,
          refInput: this.refInput,
        }}
      >
        <RootView>
          <LeftContentView>
            <LeftIconView />
            <PrefixView />
          </LeftContentView>
          <CenterContentView>
            <InputView />
            <PlaceholderView />
          </CenterContentView>
          <RightContentView>
            <SuffixView />
            <RightIconView />
          </RightContentView>
        </RootView>
      </InputContext.Provider>
    );
  };

  private refInput = (element: HTMLInputElement | MaskedInput | null) => {
    if (element instanceof MaskedInput) {
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
      // https://github.com/facebook/react/issues/7769
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

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };
}
