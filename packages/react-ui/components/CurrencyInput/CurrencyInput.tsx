import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import debounce from 'lodash.debounce';

import { isIE11 } from '../../lib/client';
import { Input, InputProps } from '../Input';
import { Nullable, Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { TSetRootNode, rootNode } from '../../lib/rootNode';

import { MAX_SAFE_DIGITS } from './constants';
import { Selection, SelectionDirection, SelectionHelper } from './SelectionHelper';
import { CurrencyHelper } from './CurrencyHelper';
import { CurrencyInputHelper } from './CurrencyInputHelper';
import { CURRENCY_INPUT_ACTIONS, extractAction } from './CurrencyInputKeyboardActions';

type CurrencyInputInterface = {
  /** Отрицательные значения */
  signed?: boolean;
  /**
   * Допустимое кол-во цифр целой части.
   * Если передан **0**, или `fractionDigits=15`, то и в целой части допускается только **0**.
   */
  integerDigits?: Nullable<number>;
  /** Вызывается при изменении `value` */
  onValueChange: (value: Nullable<number>) => void;
  /** onSubmit */
  onSubmit?: () => void;
};

type PropsMergedWithInputProps = Override<InputProps, CurrencyInputInterface>;

export type CurrencyInputProps = Override<PropsMergedWithInputProps, Partial<DefaultProps>> & CommonProps;

export type CurrencyInputState = {
  formatted: string;
  selection: Selection;
  focused: boolean;
};

type DefaultProps = {
  align: InputProps['align'];
  /** Кол-во цифр после зяпятой */
  fractionDigits: Nullable<number>;
  /** Убрать лишние нули после запятой */
  hideTrailingZeros: boolean;
  /** Значение */
  value: Nullable<number>;
};

type CurrencyInputComponentProps = Override<CurrencyInputProps, DefaultProps>;

/**
 * Поле для денежных сумм (и других числовых значений).
 * Принимает любые свойства `Input`.
 *
 * Максимальная длина числа - **15 цифр** (с десятичным разделителем в любом месте).
 * <br/>
 * Если `fractionDigits=15`, то в целой части допускается **0**.
 */
@rootNode
export class CurrencyInput extends React.PureComponent<CurrencyInputComponentProps, CurrencyInputState> {
  public static __KONTUR_REACT_UI__ = 'CurrencyInput';

  public static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    autoFocus: PropTypes.bool,
    borderless: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fractionDigits: PropTypes.number,
    hideTrailingZeros: PropTypes.bool,
    leftIcon: PropTypes.element,
    placeholder: PropTypes.string,
    signed: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    value: PropTypes.number,
    warning: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onBlur: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  public static defaultProps: DefaultProps = {
    align: 'right',
    fractionDigits: 2,
    hideTrailingZeros: false,
    value: null,
  };

  public state: CurrencyInputState = {
    ...this.getState(this.props.value, this.props.fractionDigits, this.props.hideTrailingZeros),
    focused: false,
  };

  private input: Nullable<Input>;
  private tempSelectionForOnChange: Selection = SelectionHelper.fromPosition(0);
  private setRootNode!: TSetRootNode;

  public componentDidMount(): void {
    const { maxLength, integerDigits, fractionDigits } = this.props;
    warning(
      maxLength === undefined,
      `[CurrencyInput]: Prop 'maxLength' has been deprecated. See 'integerDigits' and 'fractionDigits'`,
    );
    warning(
      (integerDigits || 0) + (fractionDigits || 0) <= MAX_SAFE_DIGITS,
      `[CurrencyInput]: Sum of 'integerDigits' and 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}.` +
        `\nSee https://tech.skbkontur.ru/react-ui/#/CurrencyInput?id=why15`,
    );
  }

  public componentDidUpdate(prevProps: CurrencyInputProps, prevState: CurrencyInputState) {
    const { value, fractionDigits, hideTrailingZeros } = this.props;
    if (value !== CurrencyHelper.parse(prevState.formatted) || prevProps.fractionDigits !== fractionDigits) {
      this.setState(this.getState(value, fractionDigits, hideTrailingZeros));
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
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<CurrencyInputProps>) => {
    const { fractionDigits, signed, onSubmit, integerDigits, hideTrailingZeros, ...rest } = props;
    const placeholder =
      this.props.placeholder == null
        ? CurrencyHelper.format(0, { fractionDigits, hideTrailingZeros })
        : this.props.placeholder;

    return (
      <Input
        {...rest}
        value={this.state.formatted}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseUp={this.handleMouseUp}
        onKeyDown={this.handleKeyDown}
        onValueChange={this.handleValueChange}
        onPaste={this.handlePaste}
        onCopy={this.handleCopy}
        onCut={this.handleCut}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
        ref={this.refInput}
        placeholder={this.state.focused ? '' : placeholder}
      />
    );
  };

  /**
   * @public
   */
  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  /**
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
    }
  };

  private scrollInput = () => {
    const node = this.input?.getNode();
    if (!node || node.scrollWidth === node.clientWidth) {
      return;
    }
    const PAD = 1;
    const SHIFT = 3;

    const selection = this.state.selection;
    const selected = selection.start !== selection.end;
    const position = selected && selection.direction === 'forward' ? selection.end : selection.start;
    const charsCount = this.state.formatted.length;
    const charWidth = node.scrollWidth / charsCount;
    const frame = Math.ceil(node.clientWidth / charWidth);
    const frameStart = Math.ceil(node.scrollLeft / charWidth);
    const frameEnd = frameStart + frame;

    if (position < frameStart + PAD) {
      node.scrollLeft = (position - SHIFT) * charWidth;
    }
    if (position > frameEnd - PAD) {
      node.scrollLeft = (position - frame + SHIFT) * charWidth;
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
      fractionDigits: this.props.fractionDigits,
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
    if (delta != null && !this.inputValue(selection.start, selection.end, delta)) {
      this.setState({ selection });
    }
  };

  private handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const data = event.clipboardData.getData('text');
    const selection = this.getSelection(event.target);
    this.inputValue(selection.start, selection.end, data);
    event.preventDefault();
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
    const valueLenght = event.target.value.length;

    const selection = {
      start: selectionStart !== selectionEnd ? selectionStart || 0 : selectionStart || valueLenght,
      end: selectionEnd !== selectionStart ? selectionEnd || 0 : selectionEnd || valueLenght,
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

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = CurrencyHelper.parse(this.state.formatted);

    this.setState({
      ...this.getState(value, this.props.fractionDigits, this.props.hideTrailingZeros),
      focused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private refInput = (element: Nullable<Input>) => {
    this.input = element;
  };
}

function getInputSelectionFromEvent(input: EventTarget): Selection {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }

  return {
    start: input.selectionStart!,
    end: input.selectionEnd!,
    direction: input.selectionDirection as SelectionDirection,
  };
}
