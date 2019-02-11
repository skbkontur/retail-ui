import * as React from 'react';
import classNames from 'classnames';

import CalendarIcon from '@skbkontur/react-icons/Calendar';

import { CalendarDateShape } from '../Calendar/CalendarDateShape';
import { parseDateString } from '../DatePicker/DatePickerHelpers';
import { tryGetValidDateShape } from '../DatePicker/DateShape';
import { isIE, isEdge } from '../ensureOldIEClassName';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';

import { parseValue, formatDate } from './DateInputHelpers/dateFormat';
import { fillEmptyParts } from './DateInputHelpers/fillEmptyParts';
import { maskChar } from './DateInputHelpers/maskChar';
import { extractAction, Actions } from './DateInputKeyboardActions';
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
import Upgrades from '../../lib/Upgrades';

import { Nullable } from '../../typings/utility-types';
import styles from './DateInput.less';

export const DateInputConfig = {
  polyfillInput: !isIE && !isEdge
};

export const DateParts = {
  Date: 0,
  Month: 1,
  Year: 2,
  All: 3
};

const DatePartRanges: { [key: number]: [number, number] } = {
  [DateParts.Date]: [0, 2],
  [DateParts.Month]: [3, 5],
  [DateParts.Year]: [6, 10],
  [DateParts.All]: [0, 10]
};

export interface DateInputState {
  selected: number | null;
  editingCharIndex: number;
  date: string | null;
  month: string | null;
  year: string | null;
  minDate: Nullable<CalendarDateShape>;
  maxDate: Nullable<CalendarDateShape>;
  notify: boolean;
}

export interface DateInputProps {
  value?: string;
  error?: boolean;
  warning?: boolean;
  disabled?: boolean;
  minDate?: Nullable<string>;
  maxDate?: Nullable<string>;
  width?: string | number;
  withIcon?: boolean;
  size?: 'small' | 'large' | 'medium';
  onBlur?: (x0: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (x0: React.FocusEvent<HTMLElement>) => void;
  onChange?: (x0: { target: { value: string } }, x1: string) => void;
  onKeyDown?: (x0: React.KeyboardEvent<HTMLElement>) => void;
}

export type DateInputSetStateCallBack = ((
  prevState: Readonly<DateInputState>,
  props?: DateInputProps
) => DateInputState | Pick<DateInputState, keyof DateInputState> | null);

class DateInput extends React.Component<DateInputProps, DateInputState> {
  public static defaultProps = {
    size: 'small',
    width: 125
  };

  private _input: Input | null = null;
  private _inputlikeText: InputLikeText | null = null;
  private _divInnerNode: HTMLElement | null = null;
  private _isFocused: boolean = false;

  constructor(props: DateInputProps) {
    super(props);
    this.state = {
      selected: null,
      editingCharIndex: 0,
      ...parseValue(props.value),
      minDate: tryGetCalendarDateShape(props.minDate),
      maxDate: tryGetCalendarDateShape(props.maxDate),
      notify: false
    };
  }

  public componentWillReceiveProps(nextProps: DateInputProps) {
    if (this.props !== nextProps) {
      this.deriveStateFromValue(nextProps.value);
    }
    if (this.props.minDate !== nextProps.minDate) {
      this.deriveMinDate(nextProps.minDate);
    }
    if (this.props.maxDate !== nextProps.maxDate) {
      this.deriveMaxDate(nextProps.maxDate);
    }
  }

  public componentDidUpdate(
    prevProps: DateInputProps,
    prevState: DateInputState
  ) {
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

    if (this.state.notify && !prevState.notify) {
      this.notify();
    }
  }

  /**
   * @public
   */
  public blur() {
    if (this._inputlikeText) {
      this._inputlikeText.blur();
    }
    if (this._input) {
      this._input.blur();
    }
    this._isFocused = false;
  }

  /**
   * @public
   */
  public focus() {
    if (!this.props.disabled) {
      if (this._inputlikeText) {
        this._inputlikeText.focus();
      }
      if (this._input) {
        this._input.focus();
      }
      this._isFocused = true;
    }
  }

  /**
   * @public
   */
  public blink() {
    if (!this.props.disabled) {
      if (this._inputlikeText) {
        this._inputlikeText.blink();
      }
      if (this._input) {
        this._input.blink();
      }
    }
  }

  public render() {
    return DateInputConfig.polyfillInput
      ? /**
         * Internet Explorer looses focus on element, if its containing node
         * would be selected with selectNodeContents
         *
         * Rendering input with mask
         */
        this.renderInputLikeText()
      : this.renderInput();
  }

  private renderInput() {
    const isMaskHidden = this.checkIfMaskHidden();

    return (
      <Input
        width={this.props.width}
        ref={el => (this._input = el)}
        size={this.props.size}
        disabled={this.props.disabled}
        error={this.props.error}
        warning={this.props.warning}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleInputClick}
        onDoubleClick={this.handleDoubleClick}
        onPaste={this.handlePaste}
        value={isMaskHidden ? '' : this.getFormattedValue()}
        rightIcon={this.renderIcon()}
      />
    );
  }

  private renderInputLikeText() {
    const { date, month, year, selected } = this.state;
    const isMaskHidden = this.checkIfMaskHidden();
    return (
      <InputLikeText
        width={this.props.width}
        ref={el => (this._inputlikeText = el)}
        size={this.props.size}
        disabled={this.props.disabled}
        error={this.props.error}
        warning={this.props.warning}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onPaste={this.handlePaste}
        rightIcon={this.renderIcon()}
      >
        {!isMaskHidden && (
          <div
            ref={el => (this._divInnerNode = el)}
            onDoubleClick={this.createSelectionHandler(DateParts.All)}
            className={styles.root}
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
            <span
              className={classNames(styles.delimiter, year && styles.filled)}
            >
              .
            </span>
            <DatePart
              selected={selected === DateParts.Year}
              onMouseDown={this.createSelectionHandler(DateParts.Year)}
            >
              <MaskedValue value={year} length={4} />
            </DatePart>
          </div>
        )}
      </InputLikeText>
    );
  }

  private _getIconSize = () => {
    if (this.props.size === 'large') {
      return '16px';
    }
    if (this.props.size === 'medium' && Upgrades.isSizeMedium16pxEnabled()) {
      return '16px';
    }
    return '14px';
  };

  private handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    if (this.props.disabled) {
      return;
    }
    event.preventDefault();
    this.selectDatePart(DateParts.Date);

    // Firefix prevents focus if mousedown prevented
    if (!this._isFocused) {
      this.focus();
    }
  };

  private handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const { start, end } = getInputSelection(event.target);
    const blockToSelect =
      start !== end
        ? DateParts.All
        : start < 3
          ? DateParts.Date
          : start < 6
            ? DateParts.Month
            : DateParts.Year;
    this.selectDatePart(blockToSelect);
  };

  private handleDoubleClick = () => {
    this.selectDatePart(DateParts.All);
  };

  private handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    this._isFocused = true;

    this.selectDatePart(DateParts.Date);
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    this._isFocused = false;

    // event have to be persisted
    // as props.onBlur would be called in async way
    event.persist();

    // both setStates would be batched
    // because this handler was called by
    // react synthetic event
    this.setState(setSelection(null));
    this.setState(
      state => {
        const hasDateEntry = state.date || state.month || state.year;
        return hasDateEntry ? fillEmptyParts(state) : {};
      },
      () => {
        removeAllSelections();
        if (this.props.onBlur) {
          this.props.onBlur(event);
        }
      }
    );
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    const action = extractAction(event);

    if (action !== Actions.Ignore) {
      event.preventDefault();
    }

    if (action === Actions.MoveSelectionLeft) {
      this.moveSelection(-1);
    }

    if (action === Actions.MoveSelectionRight) {
      this.moveSelection(1);
    }

    if (action === Actions.Increment) {
      this.updateDatePartBy(1);
    }

    if (action === Actions.Decrement) {
      this.updateDatePartBy(-1);
    }

    if (action === Actions.Digit) {
      this.inputValue(event.key);
    }

    if (action === Actions.ClearSelection) {
      this.clearDatePart();
    }

    if (action === Actions.FullSelection) {
      this.selectDatePart(DateParts.All);
    }

    if (action === Actions.WrongInput) {
      this.blink();
    }
  };

  private handlePaste = (e: React.ClipboardEvent<HTMLElement>) => {
    e.preventDefault();
    const parsed = tryParseDateString(e.clipboardData.getData('text'));
    if (parsed) {
      this.setState({ ...parsed, selected: DateParts.All });
    }
  };

  private getFormattedValue() {
    const { date, month, year } = this.state;
    return dateToMask(date, month, year);
  }

  private selectDatePartInInput() {
    if (DateInputConfig.polyfillInput || !this._isFocused) {
      return;
    }

    const { selected } = this.state;
    if (selected == null) {
      removeAllSelections();
      return;
    }

    const [start, end] = DatePartRanges[selected];
    if (this._input) {
      this._input.setSelectionRange(start, end);
    }
  }

  private checkIfMaskHidden() {
    return (
      ![this.state.date, this.state.month, this.state.year].some(Boolean) &&
      this.state.selected == null
    );
  }

  private deriveStateFromValue(value: Nullable<string>) {
    this.setState(parseValue(value));
  }

  private deriveMinDate(minDate: Nullable<string>) {
    this.setState({ minDate: tryGetCalendarDateShape(minDate) });
  }

  private deriveMaxDate(maxDate: Nullable<string>) {
    this.setState({ maxDate: tryGetCalendarDateShape(maxDate) });
  }

  private emitChange() {
    const { date, month, year } = this.state;
    const value = formatDate(date, month, year);
    if (this.props.value === value) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  private createSelectionHandler(index: number) {
    return (event: React.SyntheticEvent<HTMLElement>) => {
      if (this.props.disabled) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this._inputlikeText) {
        this._inputlikeText.focus();
      }

      this.selectDatePart(index);
    };
  }

  private clearDatePart() {
    this.setState(clearDatePart);
  }

  private updateDatePartBy(step: number) {
    this.setState(updateDatePartBy(step));
  }

  private inputValue(key: string) {
    this.setState(inputNumber(key));
  }

  private moveSelection(step: number) {
    this.setState(moveSelectionBy(step));
  }

  private selectDatePart(index: number | null, cb?: () => void) {
    this.setState(setSelection(index), cb);
  }

  private selectAll() {
    if (this._isFocused) {
      if (this._input) {
        this._input.setSelectionRange(0, 10);
      }
      if (this._divInnerNode) {
        selectNodeContents(this._divInnerNode);
      }
    }
  }

  private notify() {
    this.blink();
    this.setState({ notify: false });
  }

  private renderIcon = () => {
    const iconStyles = classNames({
      [styles.icon]: true,
      [styles.disabled]: this.props.disabled
    });

    if (this.props.withIcon) {
      return () => (
        <span className={iconStyles}>
          <CalendarIcon size={this._getIconSize()} />
        </span>
      );
    }
  };
}

function dateToMask(
  date: string | null,
  month: string | null,
  year: string | null
) {
  const date_ = date ? date.padEnd(2, maskChar) : maskChar.repeat(2);
  const month_ = month ? month.padEnd(2, maskChar) : maskChar.repeat(2);
  const year_ = year ? year.padEnd(4, maskChar) : maskChar.repeat(4);
  return `${date_}.${month_}.${year_}`;
}

function getInputSelection(input: EventTarget) {
  if (!(input instanceof HTMLInputElement)) {
    throw new Error('input is not HTMLInputElement');
  }
  return {
    start: input.selectionStart!,
    end: input.selectionEnd!,
    direction: input.selectionDirection!
  };
}

const tryGetCalendarDateShape = (dateString: Nullable<string>) => {
  return dateString ? tryGetValidDateShape(parseDateString(dateString)) : null;
};

export default DateInput;
