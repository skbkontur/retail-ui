import React, { useContext } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { CommonProps } from '../../internal/CommonWrapper';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export interface DateRangePickerFieldProps
  extends CommonProps,
    Pick<DateInputProps, 'id' | 'size' | 'style' | 'withIcon' | 'width'> {
  type: 'start' | 'end';
}

export type DateRangePickerFieldWithTypeProps = Omit<DateInputProps, 'type'>;

export const DateRangePickerField: React.FC<DateRangePickerFieldProps> = (props) => {
  const {
    start,
    end,
    minDate,
    maxDate,
    size,
    currentFocus,
    disabled,
    autoFocus,
    warning,
    error,
    startRef,
    endRef,
    calendarRef,
    setEnd,
    setStart,
    setCurrentFocus,
    setShowCalendar,
    onFocus,
    onBlur,
  } = useContext(DateRangePickerContext);

  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';
  const { isMobile } = useResponsiveLayout();

  const handleBlur = () => {
    onBlur?.();

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
    ...props,
    onFocus: handleFocus,
    onClick: handleFocus,
    onBlur: handleBlur,
    onValueChange: handleValueChange,
  };

  switch (props.type) {
    case 'start':
      return (
        <DateInput
          value={start || ''}
          autoFocus={autoFocus}
          disabled={disabled?.[0]}
          error={error?.[0]}
          warning={warning?.[0]}
          ref={startRef}
          data-tid={DateRangePickerDataTids.start}
          {...commonProps}
        />
      );

    case 'end':
      return (
        <DateInput
          value={end || ''}
          disabled={disabled?.[1]}
          error={error?.[1]}
          warning={warning?.[1]}
          ref={endRef}
          data-tid={DateRangePickerDataTids.end}
          {...commonProps}
        />
      );
  }
};
