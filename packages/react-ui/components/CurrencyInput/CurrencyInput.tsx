import type { AriaAttributes } from 'react';
import React from 'react';
import warning from 'warning';
import debounce from 'lodash.debounce';
import { globalObject } from '@skbkontur/global-object';

import { isNonNullable, isNullable } from '../../lib/utils';
import { isIE11 } from '../../lib/client';
import type { InputProps } from '../Input';
import { Input } from '../Input';
import type { Nullable, Override } from '../../typings/utility-types';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isInstanceOf } from '../../lib/isInstanceOf';
import { scrollInputCaretIntoView } from '../../lib/scrollInputCaretIntoView';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';

import { MAX_SAFE_DIGITS } from './constants';
import type { Selection, SelectionDirection } from './SelectionHelper';
import { SelectionHelper } from './SelectionHelper';
import { CurrencyHelper } from './CurrencyHelper';
import { CurrencyInputHelper } from './CurrencyInputHelper';
import { CURRENCY_INPUT_ACTIONS, extractAction } from './CurrencyInputKeyboardActions';

export interface CurrencyInputProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Override<
      Omit<InputProps, 'showClearIcon'>,
      {
        /** Значение поля. */
        value?: Nullable<number>;

        /** Убирает лишние нули после запятой. */
        hideTrailingZeros?: boolean;

        /** Устанавливает минимальное количество отображаемых знаков после запятой. Если fractionDigits=15, то в целой части допускается только **0**. */
        fractionDigits?: Nullable<number>;

        /** Разрешает вводить в поле символ минуса для отрицательных значений. */
        signed?: boolean;

        /** Допустимое количество цифр целой части до запятой.
         * Если передан **0**, то в целой части допускается только **0**. */
        integerDigits?: Nullable<number>;

        /** Событие изменения `value`. */
        onValueChange: (value: Nullable<number>) => void;

        /** Событие отправки формы. */
        onSubmit?: () => void;
      }
    > {}

export interface CurrencyInputState {
  formatted: string;
  selection: Selection;
  focused: boolean;
}

export const CurrencyInputDataTids = {
  root: 'CurrencyInput__root',
} as const;

type DefaultProps = Required<
  Pick<CurrencyInputProps, 'align' | 'fractionDigits' | 'hideTrailingZeros' | 'value' | 'inputMode'>
>;

/** Поле для денежных сумм. */
@rootNode
export class CurrencyInput extends React.PureComponent<CurrencyInputProps, CurrencyInputState> {
  public static __KONTUR_REACT_UI__ = 'CurrencyInput';
  public static displayName = 'CurrencyInput';

  public static defaultProps: DefaultProps = {
    align: 'right',
    fractionDigits: 2,
    hideTrailingZeros: false,
    value: null,
    inputMode: 'decimal',
  };

  private getProps = createPropsGetter(CurrencyInput.defaultProps);
  private validateProps(props: CurrencyInputProps): void {
    warning(
      isNumeric(props.value) || isNullable(props.value),
      '[CurrencyInput]: Prop `value` is not a valid number. Received value is `' + props.value + '`.',
    );
    warning(
      props.maxLength === undefined,
      `[CurrencyInput]: Prop 'maxLength' has been deprecated. See 'integerDigits' and 'fractionDigits'`,
    );
    warning(
      (props.integerDigits || 0) + (props.fractionDigits || 0) <= MAX_SAFE_DIGITS,
      `[CurrencyInput]: Sum of 'integerDigits' and 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}.` +
        `\nSee CurrencyInput documentation`,
    );
  }

  public state: CurrencyInputState = {
    ...this.getState(this.getProps().value, this.getProps().fractionDigits, this.getProps().hideTrailingZeros),
    focused: false,
  };

  private input: Nullable<Input>;
  private tempSelectionForOnChange: Selection = SelectionHelper.fromPosition(0);
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidMount(): void {
    this.validateProps(this.getProps());
  }

  public componentDidUpdate(prevProps: CurrencyInputProps, prevState: CurrencyInputState) {
    const { value, fractionDigits, hideTrailingZeros } = this.getProps();
    this.validateProps(this.getProps());

    if (
      (isNumeric(value) && Number(value) !== CurrencyHelper.parse(prevState.formatted)) ||
      prevProps.fractionDigits !== fractionDigits
    ) {
      this.setState(this.getState(value, fractionDigits, hideTrailingZeros));
    }
    if (isNonNullable(prevProps.value) && isNullable(value)) {
      this.setState({ formatted: '' });
    }
    if (this.state.focused && this.input) {
      const { start, end } = this.state.selection;

      this.input.setSelectionRange(start, end);
    }
    if (prevState.selection !== this.state.selection) {
      this.scrollInput();
    }
  }

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<CurrencyInputProps>) => {
    const { fractionDigits, signed, onSubmit, integerDigits, hideTrailingZeros, ...rest } = props;

    return (
      <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
        <Input
          data-tid={CurrencyInputDataTids.root}
          {...rest}
          align={this.getProps().align}
          value={this.state.formatted}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseUp={this.handleMouseUp}
          onKeyDown={this.handleKeyDown}
          onValueChange={this.handleValueChange}
          onPaste={this.handlePaste}
          onCopy={this.handleCopy}
          onCut={this.handleCut}
          aria-label={this.props['aria-label']}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          onMouseOver={this.props.onMouseOver}
          ref={this.refInput}
          placeholder={this.state.focused ? '' : getPlaceholder(props)}
        />
      </FocusControlWrapper>
    );
  };

  /** Программно устанавливает фокус на поле.
   * Появляется фокусная рамка, элемент получает клавиатурные события и воспринимается как текущий элемент для чтения скринридерами.
   * @public
   */
  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  /** Программно снимает фокус с кнопки.
   * @public
   */
  public blur = () => {
    if (this.input) {
      this.input.blur();
    }
  };

  private getState(value: Nullable<number>, fractionDigits: Nullable<number>, hideTrailingZeros: boolean) {
    return {
      formatted: CurrencyHelper.format(value, { fractionDigits, hideTrailingZeros }),
      selection: SelectionHelper.fromPosition(0),
    };
  }

  private setSelectionFromEvent(event: React.MouseEvent<HTMLInputElement>) {
    const selection = getInputSelectionFromEvent(event.target);
    const normilized = CurrencyInputHelper.normalizeSelection(this.state.formatted, selection);
    this.setState({ selection: normilized });
  }

  // for IE11
  private readonly debouncedSetSelectionFromEvent = debounce(this.setSelectionFromEvent, 300);

  private handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    if (isIE11) {
      event.persist();
      this.debouncedSetSelectionFromEvent(event);
    } else {
      this.setSelectionFromEvent(event);
    }
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const selection = this.getSelection(event.target);
    this.tempSelectionForOnChange = selection;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    const action = extractAction(event);

    if (action === CURRENCY_INPUT_ACTIONS.Ignore) {
      return;
    }

    if (action !== CURRENCY_INPUT_ACTIONS.Unknown) {
      event.preventDefault();
    }

    switch (action) {
      case CURRENCY_INPUT_ACTIONS.Submit: {
        if (this.props.onSubmit) {
          this.props.onSubmit();
        }
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Backspace: {
        this.inputValue(CurrencyInputHelper.moveCursor(this.state.formatted, selection, -1), selection.end, '');
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Delete: {
        this.inputValue(selection.start, CurrencyInputHelper.moveCursor(this.state.formatted, selection, +1), '');
        return;
      }
      case CURRENCY_INPUT_ACTIONS.MoveCursorLeft: {
        this.moveCursor(selection, -1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.MoveCursorRight: {
        this.moveCursor(selection, +1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Home: {
        this.setState({ selection: SelectionHelper.fromPosition(0) });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.End: {
        const end = this.state.formatted.length;
        this.setState({ selection: SelectionHelper.fromPosition(end) });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionLeft: {
        this.extendSelection(selection, -1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionRight: {
        this.extendSelection(selection, +1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.FullSelection: {
        this.setState({
          selection: SelectionHelper.forward(0, this.state.formatted.length),
        });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionToStart: {
        this.setState({
          selection: SelectionHelper.backward(0, selection.start),
        });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionToEnd: {
        const inputEnd = this.state.formatted.length;
        this.setState({
          selection: SelectionHelper.forward(selection.start, inputEnd),
        });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Comma: {
        this.inputValue(selection.start, selection.end, ',');
        return;
      }
    }
  };

  private scrollInput = () => {
    const node = this.input?.getNode();
    if (node) {
      scrollInputCaretIntoView(node, this.state.selection);
    }
  };

  private getSelection = (input: EventTarget): Selection => {
    const selection = getInputSelectionFromEvent(input);
    return {
      start: selection.start,
      end: selection.end,
      direction: this.state.selection.direction,
    };
  };

  private moveCursor = (selection: Selection, step: number) => {
    const position = CurrencyInputHelper.moveCursor(this.state.formatted, selection, step);
    this.setState({ selection: SelectionHelper.fromPosition(position) });
  };

  private extendSelection = (selection: Selection, step: number) => {
    const extended = CurrencyInputHelper.extendSelection(this.state.formatted, selection, step);
    this.setState({ selection: extended });
  };

  private inputValue = (start: number, end: number, value: string) => {
    const result = CurrencyInputHelper.safeInsert(this.state.formatted, start, end, value, {
      integerDigits: this.props.integerDigits,
      fractionDigits: this.getProps().fractionDigits,
      unsigned: !this.props.signed,
    });
    if (result) {
      const formatted = result.value;
      const selection = SelectionHelper.fromPosition(result.position);
      this.setState({ formatted, selection }, () => {
        const parsedValue = CurrencyHelper.parse(formatted);
        if (this.props.value !== parsedValue) {
          this.props.onValueChange(parsedValue);
        }
      });
      return true;
    }

    if (this.input) {
      this.input.blink();
    }
    return false;
  };

  private getOnChangeDelta = (value: string) => {
    const selection = this.tempSelectionForOnChange;
    const oldValue = this.state.formatted;
    if (selection.start !== selection.end) {
      return value.substring(selection.start, value.length - (oldValue.length - selection.end));
    } else if (value.length > oldValue.length) {
      return value.substr(selection.start, value.length - oldValue.length);
    }
    return null;
  };

  private handleValueChange = (value: string): void => {
    const selection = this.tempSelectionForOnChange;
    const delta = this.getOnChangeDelta(value);
    if (isNonNullable(delta) && !this.inputValue(selection.start, selection.end, delta)) {
      this.setState({ selection });
    }
  };

  private handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const data = event.clipboardData.getData('text');
    const selection = this.getSelection(event.target);
    this.inputValue(selection.start, selection.end, data);
    event.preventDefault();
    this.props.onPaste?.(event);
  };

  private handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const selection = this.getSelection(event.target);
    if (selection.start !== selection.end) {
      const substring = this.state.formatted.substring(selection.start, selection.end);
      const data = CurrencyHelper.formatForClipboard(substring);
      event.clipboardData.setData('text', data);
    }
    event.preventDefault();
  };

  private handleCut = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const selection = this.getSelection(event.target);
    if (selection.start !== selection.end) {
      const substring = this.state.formatted.substring(selection.start, selection.end);
      const data = CurrencyHelper.formatForClipboard(substring);
      event.clipboardData.setData('text', data);
      this.inputValue(selection.start, selection.end, '');
    }
    event.preventDefault();
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { selectionStart, selectionEnd, selectionDirection } = event.target;
    const valueLength = event.target.value.length;

    const selection = {
      start: selectionStart !== selectionEnd ? selectionStart || 0 : selectionStart || valueLength,
      end: selectionEnd !== selectionStart ? selectionEnd || 0 : selectionEnd || valueLength,
      direction: (selectionDirection as SelectionDirection) || 'none',
    };

    this.setState({
      focused: true,
      selection,
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private resetFocus = () => {
    const value = CurrencyHelper.parse(this.state.formatted);

    this.setState({
      ...this.getState(value, this.getProps().fractionDigits, this.getProps().hideTrailingZeros),
      focused: false,
    });
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.resetFocus();
    this.props.onBlur?.(event);
  };

  private refInput = (element: Nullable<Input>) => {
    this.input = element;
  };
}

function getInputSelectionFromEvent(input: EventTarget): Selection {
  if (!isInstanceOf(input, globalObject.HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }

  return {
    start: input.selectionStart ?? 0,
    end: input.selectionEnd ?? 0,
    direction: input.selectionDirection as SelectionDirection,
  };
}

function isNumeric(value: unknown): value is number | string {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number);
}

const getPlaceholder = (props: CurrencyInputProps) => {
  if (isNullable(props.placeholder)) {
    return CurrencyHelper.format(0, {
      fractionDigits: props.fractionDigits,
      hideTrailingZeros: props.hideTrailingZeros,
    });
  }

  return props.placeholder;
};
