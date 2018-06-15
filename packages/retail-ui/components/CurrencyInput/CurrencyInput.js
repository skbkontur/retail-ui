

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import filterProps from '../filterProps';
import SelectionHelper, { type Selection } from './SelectionHelper';
import CurrencyHelper from './CurrencyHelper';
import CurrencyInputHelper from './CurrencyInputHelper';
import {
  CURRENCY_INPUT_ACTIONS,
  extractAction
} from './CurrencyInputKeyboardActions';

const INPUT_PASS_PROPS = {
  align: true,
  autoFocus: true,
  borderless: true,
  disabled: true,
  error: true,
  placeholder: true,
  size: true,
  warning: true,
  leftIcon: true,
  width: true
};

type Props = {
  align?: 'left' | 'center' | 'right',
  autoFocus?: boolean,
  borderless?: boolean,
  disabled?: boolean,
  error?: boolean,
  fractionDigits?: ?number,
  leftIcon?: Node,
  placeholder?: string,
  signed?: boolean,
  size?: 'small' | 'medium' | 'large',
  value: ?number,
  warning?: boolean,
  width?: number | string,
  onBlur?: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  onChange: (e: { target: { value: ?number } }, value: ?number) => void,
  onFocus?: () => void,
  onSubmit?: () => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onMouseEnter?: (event: SyntheticMouseEvent<>) => void,
  onMouseLeave?: (event: SyntheticMouseEvent<>) => void,
  onMouseOver?: (event: SyntheticMouseEvent<>) => void
};

type State = {
  formatted: string,
  selection: Selection
};

export default class CurrencyInput extends Component<Props, State> {
  static propTypes = {
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

  static defaultProps = {
    align: 'right',
    fractionDigits: 2,
    value: null
  };

  _input: ?Input;
  _focused: boolean = false;

  constructor(props: Props, context: *) {
    super(props, context);
    this.state = this._getState(props.value, props.fractionDigits);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { value, fractionDigits } = nextProps;
    if (
      value !== CurrencyHelper.parse(this.state.formatted) ||
      fractionDigits !== this.props.fractionDigits
    ) {
      const state = this._getState(value, fractionDigits);
      this.setState(state);
    }
  }

  render() {
    const placeholder =
      this.props.placeholder == null
        ? CurrencyHelper.format(0, {
            fractionDigits: this.props.fractionDigits
          })
        : this.props.placeholder;

    return (
      <Input
        {...filterProps(this.props, INPUT_PASS_PROPS)}
        value={this.state.formatted}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseUp={this._handleMouseUp}
        onKeyDown={this._handleKeyDown}
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

  componentDidUpdate() {
    if (this._focused) {
      const { start, end } = this.state.selection;
      this._input && this._input.setSelectionRange(start, end);
    }
  }

  _getState(value: ?number, fractionDigits: ?number) {
    return {
      formatted: CurrencyHelper.format(value, { fractionDigits }),
      selection: SelectionHelper.fromPosition(0)
    };
  }

  _handleMouseUp = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    const selection = getInputSelection(event.target);
    const normilized = CurrencyInputHelper.normalizeSelection(
      this.state.formatted,
      selection
    );
    this.setState({ selection: normilized });
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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

    event.preventDefault();
    const selection = this._getSelection(event.target);

    switch (action) {
      case CURRENCY_INPUT_ACTIONS.Submit: {
        this.props.onSubmit && this.props.onSubmit();
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Digit: {
        this._inputValue(selection.start, selection.end, event.key);
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Separator: {
        this._inputValue(selection.start, selection.end, ',');
        return;
      }
      case CURRENCY_INPUT_ACTIONS.Minus: {
        this._inputValue(selection.start, selection.end, '-');
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
          selection: {
            start: 0,
            end: this.state.formatted.length,
            direction: 'forward'
          }
        });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionToBegin: {
        this.setState({ selection: SelectionHelper.toBegin(selection.start) });
        return;
      }
      case CURRENCY_INPUT_ACTIONS.ExtendSelectionToEnd: {
        const inputEnd = this.state.formatted.length;
        this.setState({
          selection: SelectionHelper.toEnd(selection.start, inputEnd)
        });
        return;
      }
    }
  };

  _getSelection = (input): Selection => {
    const selection = getInputSelection(input);
    return {
      start: selection.start,
      end: selection.end,
      direction: this.state.selection.direction
    };
  };

  _moveCursor = (selection: Selection, step: number) => {
    const position = CurrencyInputHelper.moveCursor(
      this.state.formatted,
      selection,
      step
    );
    this.setState({ selection: SelectionHelper.fromPosition(position) });
  };

  _extendSelection = (selection: Selection, step: number) => {
    const extended = CurrencyInputHelper.extendSelection(
      this.state.formatted,
      selection,
      step
    );
    this.setState({ selection: extended });
  };

  _inputValue = (start: number, end: number, value: string) => {
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
        const value = CurrencyHelper.parse(formatted);
        if (this.props.value !== value) {
          this.props.onChange({ target: { value } }, value);
        }
      });
    }
  };

  _handlePaste = (event: SyntheticClipboardEvent<HTMLInputElement>) => {
    const data = event.clipboardData.getData('text');
    const selection = this._getSelection(event.target);
    this._inputValue(selection.start, selection.end, data);
    event.preventDefault();
  };

  _handleCopy = (event: SyntheticClipboardEvent<HTMLInputElement>) => {
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

  _handleCut = (event: SyntheticClipboardEvent<HTMLInputElement>) => {
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

  _handleFocus = event => {
    this._focused = true;
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  _handleBlur = event => {
    this._focused = false;
    const value = CurrencyHelper.parse(this.state.formatted);
    const state = this._getState(value, this.props.fractionDigits);
    this.setState(state);
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  _handleRef = (ref: ?Input) => {
    this._input = ref;
  };
}

function getInputSelection(input): Selection {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }
  return {
    start: input.selectionStart,
    end: input.selectionEnd,
    direction: input.selectionDirection
  };
}
