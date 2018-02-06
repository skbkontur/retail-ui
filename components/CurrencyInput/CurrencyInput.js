// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import filterProps from '../filterProps';
import SelectionHelper, { type Selection } from './SelectionHelper';
import CurrencyHelper from './CurrencyHelper';
import CurrencyInputHelper from './CurrencyInputHelper';

const INPUT_PASS_PROPS = {
  align: true,
  autoFocus: true,
  disabled: true,
  error: true,
  placeholder: true,
  size: true,
  warning: true,
  width: true
};

type Props = {
  align?: 'left' | 'center' | 'right',
  autoFocus?: boolean,
  disabled?: boolean,
  error?: boolean,
  fractionDigits?: ?number,
  placeholder?: string,
  size?: 'small' | 'medium' | 'large',
  value: ?number,
  warning?: boolean,
  width?: number | string,
  onBlur?: (e: Event) => void,
  onChange: (e: { target: { value: ?number } }, value: ?number) => void,
  onFocus?: () => void,
  onSubmit?: () => void
};

type State = {
  value: ?number,
  formatted: string,
  selection: Selection
};

export default class CurrencyInput extends Component<Props, State> {
  static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fractionDigits: PropTypes.number,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    value: PropTypes.number,
    warning: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
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
      value !== this.state.value ||
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
      value,
      formatted: CurrencyHelper.format(value, { fractionDigits }),
      selection: SelectionHelper.fromPosition(0)
    };
  }

  _handleMouseUp = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const selection = getInputSelection(event.target);
    const normilized = CurrencyInputHelper.normalizeSelection(
      this.state.formatted,
      selection
    );
    this.setState({ selection: normilized });
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const action = this._getAction(event);

    if (action === Actions.Ignore) {
      return;
    }

    event.preventDefault();
    const selection = this._getSelection(event.target);

    switch (action) {
      case Actions.Submit:
        this.props.onSubmit && this.props.onSubmit();
        return;
      case Actions.Digit:
        this._inputValue(selection.start, selection.end, event.key);
        return;
      case Actions.Separator:
        this._inputValue(selection.start, selection.end, ',');
        return;
      case Actions.Backspace:
        this._inputValue(
          CurrencyInputHelper.moveCursor(this.state.formatted, selection, -1),
          selection.end,
          ''
        );
        return;
      case Actions.Delete:
        this._inputValue(
          selection.start,
          CurrencyInputHelper.moveCursor(this.state.formatted, selection, +1),
          ''
        );
        return;
      case Actions.MoveCursorLeft:
        this._moveCursor(selection, -1);
        return;
      case Actions.MoveCursorRight:
        this._moveCursor(selection, +1);
        return;
      case Actions.ExtendSelectionLeft:
        this._extendSelection(selection, -1);
        return;
      case Actions.ExtendSelectionRight:
        this._extendSelection(selection, +1);
        return;
      case Actions.FullSelection:
        this.setState({
          selection: {
            start: 0,
            end: this.state.formatted.length,
            direction: 'forward'
          }
        });
        return;
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
      this.props.fractionDigits
    );
    if (result) {
      const formatted = result.value;
      const value = CurrencyHelper.parse(formatted);
      const selection = SelectionHelper.fromPosition(result.position);
      this.setState({ value, formatted, selection }, () => {
        if (this.props.value !== value) {
          this.props.onChange({ target: { value } }, value);
        }
      });
    }
  };

  _getAction = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const actions = [
      {
        type: Actions.Submit,
        check: e => e.key === 'Enter'
      },
      {
        type: Actions.ExtendSelectionLeft,
        check: e => e.shiftKey && e.key === 'ArrowLeft'
      },
      {
        type: Actions.ExtendSelectionRight,
        check: e => e.shiftKey && e.key === 'ArrowRight'
      },
      {
        type: Actions.FullSelection,
        check: e => e.ctrlKey && e.key === 'a'
      },
      {
        type: Actions.MoveCursorLeft,
        check: e => e.key === 'ArrowLeft'
      },
      {
        type: Actions.MoveCursorRight,
        check: e => e.key === 'ArrowRight'
      },
      {
        type: Actions.Backspace,
        check: e => e.key === 'Backspace'
      },
      {
        type: Actions.Delete,
        check: e => e.key === 'Delete'
      },
      {
        type: Actions.Separator,
        check: e =>
          e.key === ',' ||
          e.key === '.' ||
          e.keyCode === 188 ||
          e.keyCode === 190
      },
      {
        type: Actions.Digit,
        check: e => /^\d$/.exec(e.key)
      },
      {
        type: Actions.Ignore,
        check: e =>
          e.shiftKey || e.metaKey || e.ctrlKey || e.altKey || e.key === 'Tab'
      }
    ];
    const action = actions.find(x => x.check(event));
    return (action && action.type) || Actions.Unknown;
  };

  _handlePaste = (event: SyntheticClipboardEvent<HTMLInputElement>) => {
    const data = event.clipboardData.getData('text/plain');
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
      event.clipboardData.setData('text/plain', data);
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
      event.clipboardData.setData('text/plain', data);
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

  _handleBlur = (event: Event) => {
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

const Actions = {
  Unknown: 0,
  Ignore: 1,
  ExtendSelectionLeft: 2,
  ExtendSelectionRight: 3,
  MoveCursorLeft: 4,
  MoveCursorRight: 5,
  Backspace: 6,
  Delete: 7,
  Separator: 8,
  Digit: 9,
  Submit: 10,
  FullSelection: 11
};
