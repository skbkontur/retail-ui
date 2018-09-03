import * as React from 'react';
import * as PropTypes from 'prop-types';

import Input, { InputProps } from '../Input';

import SelectionHelper, {
  Selection,
  SelectionDirection
} from './SelectionHelper';
import CurrencyHelper from './CurrencyHelper';
import CurrencyInputHelper from './CurrencyInputHelper';
import {
  CURRENCY_INPUT_ACTIONS,
  extractAction
} from './CurrencyInputKeyboardActions';
import { Nullable, Override } from '../../typings/utility-types';

export type CurrencyInputProps = Override<
  InputProps,
  {
    value: Nullable<number>;
    fractionDigits?: Nullable<number>;
    signed?: boolean;
    onChange: (
      e: { target: { value: Nullable<number> } },
      value: Nullable<number>
    ) => void;
    onSubmit?: () => void;
    onFocus?: () => void;
  }
>;

export interface CurrencyInputState {
  formatted: string;
  selection: Selection;
}

export default class CurrencyInput extends React.Component<
  CurrencyInputProps,
  CurrencyInputState
> {
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
    onSubmit: PropTypes.func
  };

  public static defaultProps = {
    align: 'right',
    fractionDigits: 2,
    value: null
  };

  private _input: Nullable<Input>;
  private _focused: boolean = false;
  private _tempSelectionForOnChange: Selection = SelectionHelper.fromPosition(
    0
  );

  constructor(props: CurrencyInputProps, context: any) {
    super(props, context);
    this.state = this._getState(props.value, props.fractionDigits);
  }

  public componentWillReceiveProps(nextProps: CurrencyInputProps) {
    const { value, fractionDigits } = nextProps;
    if (
      value !== CurrencyHelper.parse(this.state.formatted) ||
      fractionDigits !== this.props.fractionDigits
    ) {
      const state = this._getState(value, fractionDigits);
      this.setState(state);
    }
  }

  public render() {
    const { fractionDigits, signed, onSubmit, ...rest } = this.props;
    const placeholder =
      this.props.placeholder == null
        ? CurrencyHelper.format(0, {
            fractionDigits: this.props.fractionDigits
          })
        : this.props.placeholder;

    return (
      <Input
        {...rest}
        value={this.state.formatted}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseUp={this._handleMouseUp}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        onPaste={this._handlePaste}
        onCopy={this._handleCopy}
        onCut={this._handleCut}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOver={this.props.onMouseOver}
        ref={this._handleRef}
        placeholder={placeholder}
      />
    );
  }

  public componentDidUpdate() {
    if (this._focused) {
      const { start, end } = this.state.selection;
      if (this._input) {
        this._input.setSelectionRange(start, end);
      }
    }
  }

  public focus = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  public blur = () => {
    if (this._input) {
      this._input.blur();
    }
  };

  private _getState(value: Nullable<number>, fractionDigits: Nullable<number>) {
    return {
      formatted: CurrencyHelper.format(value, { fractionDigits }),
      selection: SelectionHelper.fromPosition(0)
    };
  }

  private _handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    const selection = getInputSelection(event.target);
    const normilized = CurrencyInputHelper.normalizeSelection(
      this.state.formatted,
      selection
    );
    this.setState({ selection: normilized });
  };

  private _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const selection = this._getSelection(event.target);
    this._tempSelectionForOnChange = selection;

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
        this._inputValue(
          CurrencyInputHelper.moveCursor(this.state.formatted, selection, -1),
          selection.end,
          ''
        );
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Delete: {
        this._inputValue(
          selection.start,
          CurrencyInputHelper.moveCursor(this.state.formatted, selection, +1),
          ''
        );
        return;
      }
      case CURRENCY_INPUT_ACTIONS.MoveCursorLeft: {
        this._moveCursor(selection, -1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.MoveCursorRight: {
        this._moveCursor(selection, +1);
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
        this._extendSelection(selection, -1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionRight: {
        this._extendSelection(selection, +1);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.FullSelection: {
        this.setState({
          selection: SelectionHelper.forward(0, this.state.formatted.length)
        });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionToStart: {
        this.setState({
          selection: SelectionHelper.backward(0, selection.start)
        });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionToEnd: {
        const inputEnd = this.state.formatted.length;
        this.setState({
          selection: SelectionHelper.forward(selection.start, inputEnd)
        });
        return;
      }
    }
  };

  private _getSelection = (input: EventTarget): Selection => {
    const selection = getInputSelection(input);
    return {
      start: selection.start,
      end: selection.end,
      direction: this.state.selection.direction
    };
  };

  private _moveCursor = (selection: Selection, step: number) => {
    const position = CurrencyInputHelper.moveCursor(
      this.state.formatted,
      selection,
      step
    );
    this.setState({ selection: SelectionHelper.fromPosition(position) });
  };

  private _extendSelection = (selection: Selection, step: number) => {
    const extended = CurrencyInputHelper.extendSelection(
      this.state.formatted,
      selection,
      step
    );
    this.setState({ selection: extended });
  };

  private _inputValue = (start: number, end: number, value: string) => {
    const result = CurrencyInputHelper.safeInsert(
      this.state.formatted,
      start,
      end,
      value,
      this.props.fractionDigits,
      !this.props.signed
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

  private _getOnChangeDelta = (value: string) => {
    const selection = this._tempSelectionForOnChange;
    const oldValue = this.state.formatted;
    if (selection.start !== selection.end) {
      return value.substring(
        selection.start,
        value.length - (oldValue.length - selection.end)
      );
    } else if (value.length > oldValue.length) {
      return value.substr(selection.start, value.length - oldValue.length);
    }
    return null;
  };

  private _handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    const selection = this._tempSelectionForOnChange;
    const delta = this._getOnChangeDelta(value);
    if (
      delta != null &&
      !this._inputValue(selection.start, selection.end, delta)
    ) {
      this.setState({ selection });
    }
  };

  private _handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const data = event.clipboardData.getData('text');
    const selection = this._getSelection(event.target);
    this._inputValue(selection.start, selection.end, data);
    event.preventDefault();
  };

  private _handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const selection = this._getSelection(event.target);
    if (selection.start !== selection.end) {
      const substring = this.state.formatted.substring(
        selection.start,
        selection.end
      );
      const data = CurrencyHelper.formatForClipboard(substring);
      event.clipboardData.setData('text', data);
    }
    event.preventDefault();
  };

  private _handleCut = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const selection = this._getSelection(event.target);
    if (selection.start !== selection.end) {
      const substring = this.state.formatted.substring(
        selection.start,
        selection.end
      );
      const data = CurrencyHelper.formatForClipboard(substring);
      event.clipboardData.setData('text', data);
      this._inputValue(selection.start, selection.end, '');
    }
    event.preventDefault();
  };

  private _handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this._focused = true;
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private _handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this._focused = false;
    const value = CurrencyHelper.parse(this.state.formatted);
    const state = this._getState(value, this.props.fractionDigits);
    this.setState(state);
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private _handleRef = (ref: Nullable<Input>) => {
    this._input = ref;
  };
}

function getInputSelection(input: EventTarget): Selection {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }
  return {
    start: input.selectionStart!,
    end: input.selectionEnd!,
    direction: input.selectionDirection as SelectionDirection
  };
}
