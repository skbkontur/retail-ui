import React, { useContext, useEffect } from 'react';

import { DateInput, DateInputProps } from '../DateInput';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export interface DateRangePickerFieldProps extends DateInputProps {
  type: 'start' | 'end';
  optional?: boolean;
}

export const DateRangePickerField: React.FC<DateRangePickerFieldProps> = (props) => {
  const state = useContext(DateRangePickerContext);

  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';

  useEffect(() => {
    switch (state.currentFocus) {
      case 'start':
        state.fromRef?.current?.focus();
        return;
      case 'end':
        state.toRef?.current?.focus();
        return;
      case null:
      default:
        if (state.setShowCalendar) {
          state.setShowCalendar(false);
        }
    }
  }, [state.currentFocus]);

  const handleBlur = () => {
    if (state.currentFocus === null) {
      return;
    }

    if (state.setCurrentFocus) {
      state.setCurrentFocus(null);
    }
  };

  const handleFocus = () => {
    if (state.setCurrentFocus) {
      state.setCurrentFocus(props.type);
    }

    if (state.setShowCalendar) {
      state.setShowCalendar(true);
    }

    const period = isStart ? state.periodStart : state.periodEnd;

    if (period) {
      const [, month, year] = period.split('.').map(Number);

      if (month && state.calendarRef) {
        state.calendarRef?.current?.scrollToMonth(month - 1, year);
      }
    }
  };

  const handleChange = (value: string) => {
    if (isStart && state.setPeriodStart) {
      state.setPeriodStart(value);
      return;
    }

    if (isEnd && state.setPeriodEnd) {
      state.setPeriodEnd(value);
      return;
    }
  };

  return (
    <DateInput
      value={isStart ? state.periodStart : state.periodEnd}
      withIcon
      size={props.size || state.size}
      minDate={isStart ? state.minDate : state.maxDate}
      disabled={props.disabled}
      onFocus={handleFocus}
      onClick={handleFocus}
      onBlur={handleBlur}
      onValueChange={handleChange}
      data-tid={isStart ? DateRangePickerDataTids.from : DateRangePickerDataTids.to}
      ref={isStart ? state.fromRef : state.toRef}
      {...props}
    />
  );
};
