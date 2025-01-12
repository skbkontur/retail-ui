import React, { useContext } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { isGreater } from '../../lib/date/comparison';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export interface DateRangePickerFieldProps extends DateInputProps {
  type: 'start' | 'end';
  optional?: boolean;
}

export const DateRangePickerField: React.FC<DateRangePickerFieldProps> = (props) => {
  const {
    periodStart,
    periodEnd,
    minDate,
    maxDate,
    size,
    currentFocus,
    fromRef,
    toRef,
    calendarRef,
    setPeriodEnd,
    setPeriodStart,
    setCurrentFocus,
    setShowCalendar,
  } = useContext(DateRangePickerContext);

  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';
  const { isMobile } = useResponsiveLayout();

  const swapStartAndEndIfNeeded = () => {
    if (periodStart && periodEnd && isGreater(periodStart, periodEnd)) {
      setPeriodEnd(periodStart);
      setPeriodStart(periodEnd);
    }
  };

  const handleBlur = () => {
    swapStartAndEndIfNeeded();

    if (!currentFocus) {
      return;
    }

    if (setCurrentFocus && !isMobile) {
      setCurrentFocus(null);
    }
  };

  const handleFocus = () => {
    setCurrentFocus(props.type);
    setShowCalendar(true);

    const period = isStart ? periodStart : periodEnd;

    if (period) {
      const [, month, year] = period.split('.').map(Number);

      if (month) {
        calendarRef.current?.scrollToMonth(month, year);
      }
    }
  };

  const handleValueChange = (value: string) => {
    if (isStart) {
      setPeriodStart(value);
    }

    if (isEnd) {
      setPeriodEnd(value);
    }
  };

  const commonProps: DateInputProps = {
    minDate,
    maxDate,
    size: props.size || size,
    withIcon: true,
    onFocus: handleFocus,
    onClick: handleFocus,
    onBlur: handleBlur,
    onValueChange: handleValueChange,
    ...props,
  };

  switch (props.type) {
    case 'start':
      return <DateInput value={periodStart} ref={fromRef} data-tid={DateRangePickerDataTids.start} {...commonProps} />;

    case 'end':
      return <DateInput value={periodEnd} ref={toRef} data-tid={DateRangePickerDataTids.end} {...commonProps} />;
  }
};
