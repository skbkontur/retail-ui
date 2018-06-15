

import type { CalendarDateShape } from '../Calendar/CalendarDateShape';

import classNames from 'classnames';
import * as React from 'react';

import { parseDateString } from '../DatePicker/DatePickerHelpers';
import { tryGetValidDateShape } from '../DatePicker/DateShape';
import { isIE, isEdge } from '../ensureOldIEClassName';
import Input from '../Input';
import InputLikeText from '../internal/InputLikeText';
import Icon from '../Icon';

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
import styled from '../internal/styledRender';

let cssStyles;
let jssStyles;
if (process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS) {
  jssStyles = require('./DateInput.styles').default;
} else {
  cssStyles = require('./DateInput.less');
}

export const DateInputConfig = {
  polyfillInput: !isIE && !isEdge
};

export const DateParts = {
  Date: 0,
  Month: 1,
  Year: 2,
  All: 3
};

const DatePartRanges: {
  [number]: [number, number]
} = {
  [DateParts.Date]: [0, 2],
  [DateParts.Month]: [3, 5],
  [DateParts.Year]: [6, 10],
  [DateParts.All]: [0, 10]
};

export type State = {
  selected: number | null,
  editingCharIndex: number,
  date: string | null,
  month: string | null,
  year: string | null,
  minDate: ?CalendarDateShape,
  maxDate: ?CalendarDateShape,
  notify: boolean
};

type Props = {
  value?: string,
  error?: boolean,
  warning?: boolean,
  disabled?: boolean,
  minDate?: ?string,
  maxDate?: ?string,
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
  _inputlikeText: InputLikeText | null = null;
  _divInnerNode: HTMLElement | null = null;
  _isFocused: boolean = false;

  static defaultProps = {
    size: 'small',
    width: 125
  };

  constructor(props: Props) {
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

  componentWillReceiveProps(nextProps: Props) {
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

    if (this.state.notify && !prevState.notify) {
      this.notify();
    }
  }

  /**
   * @public
   */
  blur() {
    this._inputlikeText && this._inputlikeText.blur();
    this._input && this._input.blur();
    this._isFocused = false;
  }

  /**
   * @public
   */
  focus() {
    if (!this.props.disabled) {
      this._inputlikeText && this._inputlikeText.focus();
      this._input && this._input.focus();
      this._isFocused = true;
    }
  }

  /**
   * @public
   */
  blink() {
    if (!this.props.disabled) {
      this._inputlikeText && this._inputlikeText.blink();
      this._input && this._input.blink();
    }
  }

  render = styled(cssStyles, jssStyles, styles => {
    return (
      <div
        className={classNames(
          styles.wrapper,
          this.props.disabled && styles.disabled
        )}
        style={{ width: this.props.width }}
      >
        {DateInputConfig.polyfillInput
          ? /**
             * Internet Explorer looses focus on element, if its containing node
             * would be selected with selectNodeContents
             *
             * Rendering input with mask
             */
            this.renderInputLikeText(styles)
          : this.renderInput(styles)}
        {this.props.withIcon && (
          <span className={styles.icon}>
            <span className={styles.iconInner}>
              <Icon name="Calendar" size={this._getIconSize()} />
            </span>
          </span>
        )}
      </div>
    );
  });

  renderInput(styles: *) {
    const isMaskHidden = this.checkIfMaskHidden();

    return (
      <Input
        width="100%"
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
      />
    );
  }

  renderInputLikeText(styles: *) {
    const { date, month, year, selected } = this.state;
    const isMaskHidden = this.checkIfMaskHidden();
    return (
      <InputLikeText
        width="100%"
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

  _getIconSize = () => {
    if (this.props.size === 'large') {
      return '16px';
    }
    if (this.props.size === 'medium' && Upgrades.isSizeMedium16pxEnabled()) {
      return '16px';
    }
    return '14px';
  };

  handleMouseDown = (event: SyntheticMouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.selectDatePart(DateParts.Date);

    // Firefix prevents focus if mousedown prevented
    if (!this._isFocused) {
      this.focus();
    }
  };

  handleInputClick = (event: SyntheticMouseEvent<HTMLInputElement>) => {
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

  handleDoubleClick = () => {
    this.selectDatePart(DateParts.All);
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

  handlePaste = (e: SyntheticClipboardEvent<HTMLElement>) => {
    e.preventDefault();
    const parsed = tryParseDateString(e.clipboardData.getData('text'));
    if (parsed) {
      this.setState({ ...parsed, selected: DateParts.All });
    }
  };

  getFormattedValue() {
    const { date, month, year } = this.state;
    return dateToMask(date, month, year);
  }

  selectDatePartInInput() {
    if (DateInputConfig.polyfillInput || !this._isFocused) {
      return;
    }

    const { selected } = this.state;
    if (selected == null) {
      removeAllSelections();
      return;
    }

    const range = DatePartRanges[selected];
    if (this._input) {
      this._input.setSelectionRange(...range);
    }
  }

  checkIfMaskHidden() {
    return (
      ![this.state.date, this.state.month, this.state.year].some(Boolean) &&
      this.state.selected == null
    );
  }

  deriveStateFromValue(value: ?string) {
    this.setState(parseValue(value));
  }

  deriveMinDate(minDate: ?string) {
    this.setState({ minDate: tryGetCalendarDateShape(minDate) });
  }

  deriveMaxDate(maxDate: ?string) {
    this.setState({ maxDate: tryGetCalendarDateShape(maxDate) });
  }

  emitChange() {
    const { date, month, year } = this.state;
    const value = formatDate(date, month, year);
    if (this.props.value === value) {
      return;
    }
    if (this.props.onChange) {
      this.props.onChange({ target: { value } }, value);
    }
  }

  createSelectionHandler(index: number) {
    return (event: SyntheticEvent<HTMLElement>) => {
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

  selectAll() {
    if (this._isFocused) {
      this._input && this._input.setSelectionRange(0, 10);
      this._divInnerNode && selectNodeContents(this._divInnerNode);
    }
  }

  notify() {
    this.blink();
    this.setState({ notify: false });
  }
}

function dateToMask(date, month, year) {
  const date_ = date ? date.padEnd(2, maskChar) : maskChar.repeat(2);
  const month_ = month ? month.padEnd(2, maskChar) : maskChar.repeat(2);
  const year_ = year ? year.padEnd(4, maskChar) : maskChar.repeat(4);
  return `${date_}.${month_}.${year_}`;
}

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

const tryGetCalendarDateShape = (dateString: ?string) => {
  return dateString ? tryGetValidDateShape(parseDateString(dateString)) : null;
};

export default DateInput;
