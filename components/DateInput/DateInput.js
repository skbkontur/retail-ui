// @flow

import classNames from 'classnames';
import * as React from 'react';

import styles from './DateInput.less';

import Icon from '../Icon';
import { DatePart } from './DatePart';
import { MaskedValue } from './MaskedValue';
import * as DIH from './DateInputHelpers';
import { selectNodeContents, removeAllSelections } from './SelectionHelpers';

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
  onBlur?: (SyntheticFocusEvent<HTMLElement>) => void,
  onFocus?: (SyntheticFocusEvent<HTMLElement>) => void,
  onChange?: ({ target: { value: string } }, string) => void
};

class DateInput extends React.Component<Props, State> {
  _node: HTMLElement | null = null;

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

  render() {
    const { date, month, year, selected } = this.state;
    const isEmpty = this.checkIfEmpty();

    return (
      <div
        className={classNames({
          [styles.wrapper]: true,
          [styles.disabled]: this.props.disabled
        })}
      >
        <div
          className={classNames({
            [styles.root]: true,
            [styles.empty]: isEmpty
          })}
          ref={el => (this._node = el)}
          tabIndex={this.props.disabled ? -1 : 0}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.createSelectionHandler(DateParts.Date)}
          onDoubleClick={this.selectAll}
          onPaste={this.handlePaste}
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
        <span className={styles.icon}>
          <Icon name="Calendar" />
        </span>
      </div>
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
    // if (event.key === 'Tab') {
    //   if (event.shiftKey && this.state.selected !== 0) {
    //     event.preventDefault();
    //     this.moveSelection(-1);
    //   }
    //   if (!event.shiftKey && this.state.selected !== 2) {
    //     event.preventDefault();
    //     this.moveSelection(1);
    //   }
    // }

    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.selectAll();
    }
  };

  handlePaste = (e: SyntheticClipboardEvent<HTMLElement>) => {
    const parsed = DIH.tryParseDateString(e.clipboardData.getData('text'));
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
    const value = formatDate(date, month, year);
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
    this.setState(DIH.clearDatePart);
  }

  updateDatePartBy(step: number) {
    this.setState(DIH.updateDatePartBy(step));
  }

  inputValue(key: string) {
    this.setState(DIH.inputNumber(key));
  }

  moveSelection(step: number) {
    this.setState(DIH.moveSelectionBy(step));
  }

  setSelection(index: number | null, cb?: () => void) {
    this.setState(DIH.setSelection(index), cb);
  }

  selectAll = () => {
    this.setSelection(DateParts.All, () => {
      this._node && selectNodeContents(this._node);
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

export default DateInput;
