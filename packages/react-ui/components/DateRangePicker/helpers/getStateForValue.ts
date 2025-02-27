import { DateRangePickerFieldType } from '../DateRangePickerField';
import { isLess, isGreater, isLessOrEqual, isGreaterOrEqual } from '../../../lib/date/comparison';
import { MIN_FULLDATE, MAX_FULLDATE } from '../../../lib/date/constants';

interface DateRangeState {
  start: string;
  end: string;
  focus: DateRangePickerFieldType | null;
  isOpen: true;
}

const defaultContextOptions = {
  currentStart: '',
  currentEnd: '',
  minDate: MIN_FULLDATE,
  maxDate: MAX_FULLDATE,
};

export function getStateForValue(
  currentFocus: DateRangePickerFieldType | null,
  value = '',
  contextOptions = {},
): DateRangeState {
  const { currentStart, currentEnd, minDate, maxDate } = { ...defaultContextOptions, ...contextOptions };

  let start = currentStart;
  let end = currentEnd;
  let focus = currentFocus;
  let isOpen = true;

  if ((minDate && isLess(value, minDate)) || (maxDate && isGreater(value, maxDate))) {
    return {
      start,
      end,
      focus,
      isOpen,
    };
  }

  const handleInitialPeriod = (date: string) => {
    if (currentFocus === 'start') {
      start = date;
      focus = 'end';
    } else {
      end = date;
      focus = 'start';
    }
  };

  const handlePartialPeriod = (date: string) => {
    if (currentFocus === 'start') {
      if (currentStart) {
        start = date;
        focus = 'end';
        return;
      }

      if (currentEnd && isGreater(date, currentEnd)) {
        start = date;
        end = '';
        focus = 'end';
        return;
      }

      start = date;
      isOpen = false;
    } else if (currentFocus === 'end') {
      if (currentEnd) {
        end = date;
        focus = 'start';
        return;
      }

      if (currentStart && isLess(date, currentStart)) {
        start = date;
        end = '';
        focus = 'end';
        return;
      }

      end = date;
      isOpen = false;
    }
  };

  const handleFullPeriod = (date: string) => {
    if (currentFocus === 'start') {
      if (currentEnd && isLessOrEqual(date, currentEnd)) {
        start = date;
        isOpen = false;
      } else {
        start = date;
        end = '';
        focus = 'end';
      }
    } else if (currentFocus === 'end') {
      if (currentStart && isGreaterOrEqual(date, currentStart)) {
        end = date;
        isOpen = false;
      } else {
        start = date;
        end = '';
        focus = 'end';
      }
    }
  };

  if (!currentStart && !currentEnd) {
    handleInitialPeriod(value);
  } else if ((currentStart && !currentEnd) || (!currentStart && currentEnd)) {
    handlePartialPeriod(value);
  } else {
    handleFullPeriod(value);
  }

  return {
    start,
    end,
    focus,
    isOpen,
  };
}
