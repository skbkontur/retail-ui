// @flow

import classNames from 'classnames';
import * as React from 'react';

import styles from './DateInput.less';

import Icon from '../Icon';
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
import InputLikeText from '../internal/InputLikeText';

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
  _node: HTMLElement | null = null;
  _innerNode: HTMLElement | null = null;

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
  }

  /**
   * @public
   */
  blur() {
    this._node && this._node.blur();
  }

  /**
   * @public
   */
  focus() {
    if (!this.props.disabled && this._node) {
      this._node.focus();
    }
  }

  render() {
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
        onMouseDown={this.createSelectionHandler(DateParts.Date)}
        onPaste={this.handlePaste}
      >
        <div
          ref={el => (this._innerNode = el)}
          onDoubleClick={this.selectAll}
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

  handleFocus = (event: SyntheticFocusEvent<HTMLElement>) => {
    this.setSelection(0);
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLElement>) => {
    this.setSelection(null, removeAllSelections);
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
      this.selectAll();
    }
  };

  handlePaste = (e: SyntheticClipboardEvent<HTMLElement>) => {
    const parsed = tryParseDateString(e.clipboardData.getData('text'));
    if (parsed) {
      this.setState(parsed);
    }
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
      this.setSelection(index);
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

  setSelection(index: number | null, cb?: () => void) {
    this.setState(setSelection(index), cb);
  }

  selectAll = () => {
    this.setSelection(DateParts.All, () => {
      this._innerNode && selectNodeContents(this._innerNode);
    });
  };
}

const parseValue = value => {
  const [date = null, month = null, year = null] = (value || '').split('.');
  return { date, month, year };
};

const formatDate = (date, month, year) => {
  return `${date || ''}.${month || ''}.${year || ''}`;
};

const trimTrailingDots = (value: string) => value.replace(/\.*$/, '');

export default DateInput;
