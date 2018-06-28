

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import filterProps from '../filterProps';
import { ieVerison } from '../ensureOldIEClassName';

const DateBlocks = [
  { index: 0, start: 0, end: 2 },
  { index: 1, start: 3, end: 5 },
  { index: 2, start: 6, end: 10 }
];

const INPUT_PASS_PROPS = {
  autoFocus: true,
  disabled: true,
  warning: true,
  error: true,
  size: true,
  placeholder: true,

  onInput: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseOver: true
};

type Props = {
  autoFocus?: boolean,
  error?: boolean,
  warning?: boolean,
  disabled?: boolean,
  getInputRef?: (ref: Input) => void,
  onBlur?: (e: SyntheticFocusEvent<HTMLElement>) => void,
  onSubmit?: () => void,
  onChange: (value: string) => void,
  onFocus?: () => void,
  opened: boolean,
  placeholder?: string,
  size: 'small' | 'medium' | 'large',
  value: string,
  onInput: *,
  onKeyDown: *,
  onKeyPress: *,
  onKeyUp: *,
  onMouseEnter: *,
  onMouseLeave: *,
  onMouseOver: *
};

const isIE8 = ieVerison === 8;

export default class DateInput extends Component<Props> {
  static propTypes = {
    getInputRef: PropTypes.func,
    opened: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func
  };

  _input: ?Input;
  _focused: boolean = false;
  _icon: ?HTMLElement;
  _cursorPosition: number = 0;

  render() {
    const maskChar = this.props.withMask ? '_' : null;
    return (
      <Input
        {...filterProps(this.props, INPUT_PASS_PROPS)}
        mask="99.99.9999"
        maskChar={maskChar}
        maxLength={12}
        value={this.props.value}
        width="100%"
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onChange={this._handleChange}
        onMouseUp={this._handleClick}
        onKeyDown={this._handleKeyDown}
        onPaste={this._handleInputPaste}
        ref={this.getInputRef}
      />
    );
  }

  componentDidMount() {
    if (this.props.getInputRef && this._input) {
      this.props.getInputRef(this._input);
    }
  }

  _setCursorPosition = cursorPosition => {
    this._input &&
      this._input.setSelectionRange(cursorPosition, cursorPosition);
  };

  _selectCurrentBlock = (input: HTMLInputElement) => {
    if (trim(this.props.value) === '') {
      this._selectBlock(this._getSelectedBlock(0));
      return;
    }
    const { start, end } = getInputSelection(input);
    if (start !== end) {
      return;
    }
    this._selectBlock(this._getSelectedBlock(start));
  };

  _handleClick = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    if (this._focused) {
      // $FlowIgnore
      this._selectCurrentBlock(event.target);
    }
  };

  _handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (this._checkIfBadKeyDownEvent(event)) {
      return;
    }
    if (this._isVerticalArrows(event)) {
      event.preventDefault();
      this._handleVerticalKey(event);
    }
    if (!isIE8 && this._isHorizontalArrows(event)) {
      event.preventDefault();
      this._moveSelectionBlock(event);
    }
    if (this._isSeparatorKey(event)) {
      event.preventDefault();
      this._handleSeparatorKey(event);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onSubmit && this.props.onSubmit();
    }
  };

  _handleInputPaste = (event: SyntheticClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData('text').trim();
    const re = /([\d\_]{1,2}).([\d\_]{1,2}).([\d\_]{4})/;
    const execData = re.exec(text);
    if (!execData) {
      return;
    }
    const [, day, month, year] = execData;
    const nextValue = [day, month, year]
      .filter(Boolean)
      .map(pad2)
      .join('.');

    if (this.props.onChange) {
      this.props.onChange(nextValue);
    }
    setTimeout(() => {
      this._input && this._input.setSelectionRange(0, 12);
    }, 100);
  };

  _checkIfBadKeyDownEvent = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
  ) => {
    const AllowedKeys = [
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      '.',
      ',',
      ' '
    ];
    return !AllowedKeys.includes(event.key);
  };

  _isVerticalArrows = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    return event.key === 'ArrowUp' || event.key === 'ArrowDown';
  };

  _isHorizontalArrows = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    return event.key === 'ArrowLeft' || event.key === 'ArrowRight';
  };

  _isSeparatorKey = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    return [' ', ',', '.'].includes(event.key);
  };

  _moveSelectionBlock = event => {
    const { start } = getInputSelection(event.currentTarget);
    const currentSelectedBlock = this._getSelectedBlock(start);
    const step = event.key === 'ArrowLeft' ? -1 : 1;
    const nextSelectedBlockIndex = Math.max(
      Math.min(currentSelectedBlock.index + step, 2),
      0
    );
    this._selectBlock(DateBlocks[nextSelectedBlockIndex]);
  };

  _selectBlock = ({ index, start, end }) => {
    setTimeout(() => {
      this._input && this._input.setSelectionRange(start, end);
    }, 10);
  };

  _handleSeparatorKey = event => {
    const re = /([\d\_]{0,2}).?([\d\_]{0,2}).?([\d\_]{0,4})/;
    const { start } = getInputSelection(event.currentTarget);
    if (start !== 1 && start !== 4) {
      return;
    }
    const [, day = '', month = '', year = ''] = re.exec(
      this.props.value.replace('_', '')
    );

    let nextValue = [day, month, year]
      .filter(Boolean)
      .map(pad2)
      .join('.');

    if (nextValue.length < 7) {
      nextValue += '.';
    }

    if (this.props.onChange) {
      this.props.onChange(nextValue);
    }
    this._moveSelectionBlock(event);
  };

  _getSelectedBlock = cursorPosition => {
    return cursorPosition < 3
      ? DateBlocks[0]
      : cursorPosition < 6
        ? DateBlocks[1]
        : DateBlocks[2];
  };

  _handleChange = (
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string
  ) => {
    const isBackspace = trim(this.props.value).length >= trim(value).length;

    this.props.onChange(value);

    const { currentTarget } = event;
    if (!isBackspace && !isIE8) {
      setTimeout(() => {
        const start = getInputSelection(currentTarget).start;
        if (start === 3 || start === 6) {
          this._selectBlock(this._getSelectedBlock(start));
        }
      }, 100);
    }
  };

  _handleVerticalKey = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const dateValue = event.currentTarget.value;

    const isValid = /\d{2}.\d{2}.\d{4}/.test(dateValue);
    if (!isValid) {
      return;
    }

    const { start } = getInputSelection(event.currentTarget);
    const selectedBlock = this._getSelectedBlock(start);

    let step = 0;
    if (event.key === 'ArrowUp') {
      step = 1;
    }
    if (event.key === 'ArrowDown') {
      step = -1;
    }

    let [day, month, year] = dateValue.split('.');
    day = Number(day);
    month = Number(month) - 1;
    year = Number(year);

    let date;
    switch (selectedBlock.index) {
      case 0:
        date = new Date(Date.UTC(year, month, day + step));
        break;
      case 1:
        date = new Date(Date.UTC(year, month + step, day));
        break;
      case 2:
        date = new Date(Date.UTC(year + step, month, day));
        break;
      default:
        throw new TypeError('Unexpected block index ' + selectedBlock.index);
    }

    const newDay = date.getUTCDate();
    const newMonth = date.getUTCMonth() + 1;
    const newYear = date.getUTCFullYear();
    const newDate = [newDay, newMonth, newYear]
      .filter(Boolean)
      .map(pad2)
      .join('.');

    this.props.onChange(newDate);
    this._selectBlock(selectedBlock);
  };

  _handleFocus = event => {
    this._focused = true;
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  _handleBlur = e => {
    this._focused = false;
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  getInputRef = (ref: ?Input) => {
    this._input = ref;
  };

  getIconRef = (ref: ?HTMLElement) => {
    this._icon = ref;
  };
}

const pad2 = v => v.toString().padStart(2, '0');

function trim(str) {
  return str.replace(/[\_\.]/g, '');
}

/**
 * imported from http://stackoverflow.com/questions/4928586/ddg#4931963
 */
function getInputSelection(el) {
  let start = 0;
  let end = 0;

  if (
    typeof el.selectionStart === 'number' &&
    typeof el.selectionEnd === 'number'
  ) {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else if (document.selection) {
    // eslint-disable-next-line flowtype/no-weak-types
    const range = (document: any).selection.createRange();

    if (range && range.parentElement() === el) {
      const len = el.value.length;
      const normalizedValue = el.value.replace(/\r\n/g, '\n');

      // Create a working TextRange that lives only in the input
      const textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      const endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart('character', -len);
        start += normalizedValue.slice(0, start).split('\n').length - 1;

        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd('character', -len);
          end += normalizedValue.slice(0, end).split('\n').length - 1;
        }
      }
    }
  }

  return {
    start,
    end
  };
}
