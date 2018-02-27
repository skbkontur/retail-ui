// @flow

import classNames from 'classnames';
import * as React from 'react';

import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Icon from '../Icon';

const polyfillInput = false;

import {
  clearDatePart,
  updateDatePartBy,
  inputNumber,
  moveSelectionBy,
  setSelection,
  tryParseDateString
} from './DateInputHelpers';
import { DatePart } from './DatePart';
import { MaskedValue } from './MaskedValue';
import { selectNodeContents, removeAllSelections } from './SelectionHelpers';

import styles from './DateInput.less';

export const DateParts = {
  Date: 0,
  Month: 1,
  Year: 2,
  All: 3
};

export type State = {
  selected: number | null,
  editingCharIndex: number,
  date: string | null,
  month: string | null,
  year: string | null
};

type Props = {
  value?: string,
  disabled?: boolean,
  width?: string | number,
  withIcon?: boolean,
  size: 'small' | 'large' | 'medium',
  onBlur?: (SyntheticFocusEvent<HTMLElement>) => void,
  onFocus?: (SyntheticFocusEvent<HTMLElement>) => void,
  onChange?: ({ target: { value: string } }, string) => void,
  onKeyDown?: (SyntheticKeyboardEvent<HTMLElement>) => void
};

class DateInput extends React.Component<Props, State> {
  _input: Input | null = null;
  _node: HTMLElement | null = null;
  _innerNode: HTMLElement | null = null;
  _isFocused: boolean = false;

  static defaultProps = {
    size: 'small'
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: null,
      editingCharIndex: 0,
      ...parseValue(props.value)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setValue(nextProps.value);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevState.date !== this.state.date ||
      prevState.month !== this.state.month ||
      prevState.year !== this.state.year
    ) {
      this.emitChange();
    }

    if (this.state.selected === DateParts.All) {
      this.selectAll();
    } else {
      this.selectDatePartInInput();
    }
  }

  /**
   * @public
   */
  blur() {
    this._node && this._node.blur();
    this._input && this._input.blur();
  }

  /**
   * @public
   */
  focus() {
    if (!this.props.disabled) {
      this._node && this._node.focus();
      this._input && this._input.focus();
    }
  }

  render() {
    /**
     * Internet Explorer looses focus on element, if its containing node
     * would be selected with selectNodeContents
     *
     * Rendering input with mask
     */
    if (polyfillInput) {
      return this.renderInputLikeText();
    }
    return this.renderInput();
  }

  renderInput() {
    const isEmpty = this.checkIfEmpty();

    return (
      <Input
        width={this.props.width}
        ref={el => {
          this._input = el;
        }}
        size={this.props.size}
        disabled={this.props.disabled}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        onPaste={this.handlePaste}
        value={isEmpty ? '' : this.getFormattedValue()}
        rightIcon={
          this.props.withIcon ? (
            <Icon
              name="Calendar"
              color={this.props.disabled ? 'inherit' : '#333'}
            />
          ) : null
        }
      />
    );
  }

  renderInputLikeText() {
    const { date, month, year, selected } = this.state;
    const isEmpty = this.checkIfEmpty();
    return (
      <InputLikeText
        width={this.props.width}
        innerRef={el => {
          this._node = el;
        }}
        size={this.props.size}
        disabled={this.props.disabled}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onPaste={this.handlePaste}
      >
        <div
          ref={el => (this._innerNode = el)}
          onDoubleClick={this.createSelectionHandler(DateParts.All)}
          className={classNames({
            [styles.root]: true,
            [styles.empty]: isEmpty
          })}
        >
          <DatePart
            selected={selected === DateParts.Date}
            onMouseDown={this.createSelectionHandler(DateParts.Date)}
          >
            <MaskedValue value={date} length={2} />
          </DatePart>
          <span
            className={classNames(styles.delimiter, month && styles.filled)}
          >
            .
          </span>
          <DatePart
            selected={selected === DateParts.Month}
            onMouseDown={this.createSelectionHandler(DateParts.Month)}
          >
            <MaskedValue value={month} length={2} />
          </DatePart>
          <span className={classNames(styles.delimiter, year && styles.filled)}>
            .
          </span>
          <DatePart
            selected={selected === DateParts.Year}
            onMouseDown={this.createSelectionHandler(DateParts.Year)}
          >
            <MaskedValue value={year} length={4} />
          </DatePart>
        </div>
        {this.props.withIcon && (
          <span className={styles.icon}>
            <span className={styles.iconInner}>
              <Icon name="Calendar" />
            </span>
          </span>
        )}
      </InputLikeText>
    );
  }

  handleMouseDown = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.selectDatePart(DateParts.Date);

    // Firefix prevents focus if mousedown prevented
    if (!this._isFocused) {
      this.focus();
    }
  };

  handleClick = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    const { start } = getInputSelection(event.target);
    const blockToSelect =
      start < 3 ? DateParts.Date : start < 6 ? DateParts.Month : DateParts.Year;
    this.selectDatePart(blockToSelect);
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLElement>) => {
    this._isFocused = true;

    this.selectDatePart(DateParts.Date);
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLElement>) => {
    this._isFocused = false;

    this.selectDatePart(null, removeAllSelections);
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.moveSelection(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.moveSelection(1);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.updateDatePartBy(1);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.updateDatePartBy(-1);
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      this.inputValue(event.key);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      this.clearDatePart();
    }

    // Not covered by guides
    if (event.key === 'Tab') {
      if (event.shiftKey && this.state.selected !== 0) {
        event.preventDefault();
        this.moveSelection(-1);
      }
      if (!event.shiftKey && this.state.selected !== 2) {
        event.preventDefault();
        this.moveSelection(1);
      }
    }

    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.selectDatePart(DateParts.All);
    }
  };

  handlePaste = (e: SyntheticClipboardEvent<HTMLElement>) => {
    const parsed = tryParseDateString(e.clipboardData.getData('text'));
    if (parsed) {
      this.setState({
        ...parsed,
        selected: DateParts.All
      });
    }
  };

  getFormattedValue = () => {
    const { date, month, year } = this.state;
    const date_ = date ? date : '__';
    const month_ = month ? month : '__';
    const year_ = year ? year : '____';
    return `${date_}.${month_}.${year_}`;
  };

  selectDatePartInInput = () => {
    if (polyfillInput) {
      return;
    }

    if (!this._isFocused) {
      return;
    }

    const { selected } = this.state;

    if (selected == null) {
      removeAllSelections();
      return;
    }

    let range;
    switch (selected) {
      case DateParts.Date:
        range = [0, 2];
        break;
      case DateParts.Month:
        range = [3, 5];
        break;
      case DateParts.Year:
        range = [6, 10];
        break;
      case DateParts.All:
        range = [0, 10];
        break;
      default:
        range = [0, 0];
    }

    this._input && this._input.setSelectionRange(...range);
  };

  checkIfEmpty() {
    return (
      ![this.state.date, this.state.month, this.state.year].some(Boolean) &&
      this.state.selected == null
    );
  }

  setValue = (value: ?string) => {
    this.setState(parseValue(value));
  };

  emitChange = () => {
    const { date, month, year } = this.state;
    const value = trimTrailingDots(formatDate(date, month, year));
    if (this.props.value === value) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  };

  createSelectionHandler = (index: number) => {
    return (event: SyntheticEvent<HTMLElement>) => {
      if (this.props.disabled) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (this._node) {
        this._node.focus();
      }
      this.selectDatePart(index);
    };
  };

  clearDatePart() {
    this.setState(clearDatePart);
  }

  updateDatePartBy(step: number) {
    this.setState(updateDatePartBy(step));
  }

  inputValue(key: string) {
    this.setState(inputNumber(key));
  }

  moveSelection(step: number) {
    this.setState(moveSelectionBy(step));
  }

  selectDatePart(index: number | null, cb?: () => void) {
    this.setState(setSelection(index), cb);
  }

  selectAll = () => {
    if (this._isFocused) {
      this._input && this._input.setSelectionRange(0, 10);
      this._innerNode && selectNodeContents(this._innerNode);
    }
  };
}

const parseValue = value => {
  const re = /(\d{1,2})?\.?(\d{1,2})?\.?(\d{1,4})?/;
  const match = re.exec(value || '');
  const [date = null, month = null, year = null] = match.slice(1);
  return { date, month, year };
};

const formatDate = (date, month, year) => {
  return `${date || ''}.${month || ''}.${year || ''}`;
};

const trimTrailingDots = (value: string) => value.replace(/\.*$/, '');

function getInputSelection(input) {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }
  return {
    start: input.selectionStart,
    end: input.selectionEnd,
    direction: input.selectionDirection
  };
}

export default DateInput;
