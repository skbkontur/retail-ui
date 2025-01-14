import React, { useContext } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { isGreater } from '../../lib/date/comparison';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export interface DateRangePickerFieldProps extends DateInputProps {
  type: 'start' | 'end';
}

export const DateRangePickerField: React.FC<DateRangePickerFieldProps> = (props) => {
  const {
    start,
    end,
    autoFocus,
    minDate,
    maxDate,
    size,
    currentFocus,
    startRef,
    endRef,
    calendarRef,
    setEnd,
    setStart,
    setCurrentFocus,
    setShowCalendar,
    onFocus,
    onBlur
  } = useContext(DateRangePickerContext);

  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';
  const { isMobile } = useResponsiveLayout();

  const swapStartAndEndIfNeeded = () => {
    if (start && end && isGreater(start, end)) {
      setEnd(start);
      setStart(end);
    }
  };

  const handleBlur = () => {
    onBlur?.();
    swapStartAndEndIfNeeded();

    if (!currentFocus) {
      return;
    }

    if (!isMobile) {
      setCurrentFocus(null);
    }
  };

  const handleFocus = () => {
    onFocus?.();
    setCurrentFocus(props.type);
    setShowCalendar(true);

    const period = isStart ? start : end;

    if (period) {
      const [, month, year] = period.split('.').map(Number);

      if (month) {
        calendarRef.current?.scrollToMonth(month, year);
      }
    }
  };

  const handleValueChange = (value: string) => {
    if (isStart) {
      setStart(value);
    }

    if (isEnd) {
      setEnd(value);
    }
  };

  const commonProps: DateInputProps = {
    minDate,
    maxDate,
    size,
    withIcon: true,
    onFocus: handleFocus,
    onClick: handleFocus,
    onBlur: handleBlur,
    onValueChange: handleValueChange,
    ...props,
  };

  switch (props.type) {
    case 'start':
      return (
        <DateInput
          value={start || ''}
          autoFocus={autoFocus}
          ref={startRef}
          data-tid={DateRangePickerDataTids.start}
          {...commonProps}
        />
      );

    case 'end':
      return <DateInput value={end || ''} ref={endRef} data-tid={DateRangePickerDataTids.end} {...commonProps} />;
  }
};
