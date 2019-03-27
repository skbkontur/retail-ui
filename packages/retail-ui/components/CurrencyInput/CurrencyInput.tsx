import * as React from 'react';
import * as PropTypes from 'prop-types';

import Input, { InputProps } from '../Input';

import SelectionHelper, { Selection, SelectionDirection } from './SelectionHelper';
import CurrencyHelper from './CurrencyHelper';
import CurrencyInputHelper from './CurrencyInputHelper';
import { CURRENCY_INPUT_ACTIONS, extractAction } from './CurrencyInputKeyboardActions';
import { Nullable, Override } from '../../typings/utility-types';

export type CurrencyInputProps = Override<
  InputProps,
  {
    /** Значение */
    value: Nullable<number>;
    /** Кол-во цифр после зяпятой */
    fractionDigits?: Nullable<number>;
    /** Отрицательные значения */
    signed?: boolean;
    /** onChange */
    onChange: (e: { target: { value: Nullable<number> } }, value: Nullable<number>) => void;
    /** onSubmit */
    onSubmit?: () => void;
  }
>;

export interface CurrencyInputState {
  formatted: string;
  selection: Selection;
  focused: boolean;
}

/**
 * Поле для денежных сумм (и других числовых значений).
 * Принимает любые свойства `Input`
 */
export default class CurrencyInput extends React.Component<CurrencyInputProps, CurrencyInputState> {
  public static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    autoFocus: PropTypes.bool,
    borderless: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fractionDigits: PropTypes.number,
    leftIcon: PropTypes.element,
    placeholder: PropTypes.string,
    signed: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    value: PropTypes.number,
    warning: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  public static defaultProps = {
    align: 'right',
    fractionDigits: 2,
    value: null,
  };

  public state: CurrencyInputState = {
    ...this.getState(this.props.value, this.props.fractionDigits),
    focused: false,
  };

  private input: Nullable<Input>;
  private tempSelectionForOnChange: Selection = SelectionHelper.fromPosition(0);

  public componentWillReceiveProps(nextProps: CurrencyInputProps) {
    const { value, fractionDigits } = nextProps;
    if (value !== CurrencyHelper.parse(this.state.formatted) || fractionDigits !== this.props.fractionDigits) {
      const state = this.getState(value, fractionDigits);
      this.setState(state);
    }
  }

  public componentDidUpdate() {
    if (this.state.focused && this.input) {
      const { start, end } = this.state.selection;

      this.input.setSelectionRange(start, end);
    }
  }

  public render() {
    const { fractionDigits, signed, onSubmit, mainInGroup, ...rest } = this.props;
    const placeholder =
      this.props.placeholder == null
        ? CurrencyHelper.format(0, {
            fractionDigits: this.props.fractionDigits,
          })
        : this.props.placeholder;

    return (
      <Input
        {...rest}
        value={this.state.formatted}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseUp={this.handleMouseUp}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
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
  }

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

  private getState(value: Nullable<number>, fractionDigits: Nullable<number>) {
    return {
      formatted: CurrencyHelper.format(value, { fractionDigits }),
      selection: SelectionHelper.fromPosition(0),
    };
  }

  private handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    const selection = getInputSelection(event.target);
    const normilized = CurrencyInputHelper.normalizeSelection(this.state.formatted, selection);
    this.setState({ selection: normilized });
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

  private getSelection = (input: EventTarget): Selection => {
    const selection = getInputSelection(input);
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
    const result = CurrencyInputHelper.safeInsert(
      this.state.formatted,
      start,
      end,
      value,
      this.props.fractionDigits,
      !this.props.signed,
    );
    if (result) {
      const formatted = result.value;
      const selection = SelectionHelper.fromPosition(result.position);
      this.setState({ formatted, selection }, () => {
        const parsedValue = CurrencyHelper.parse(formatted);
        if (this.props.value !== parsedValue) {
          this.props.onChange({ target: { value: parsedValue } }, parsedValue);
        }
      });
      return true;
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

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selection = this.tempSelectionForOnChange;
    const delta = this.getOnChangeDelta(event.target.value);
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
      ...this.getState(value, this.props.fractionDigits),
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

function getInputSelection(input: EventTarget): Selection {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }
  return {
    start: input.selectionStart!,
    end: input.selectionEnd!,
    direction: input.selectionDirection as SelectionDirection,
  };
}
