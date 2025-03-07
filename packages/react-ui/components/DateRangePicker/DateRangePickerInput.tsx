import React, { useContext, useEffect } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export type DateRangePickerInputType = 'start' | 'end';

export interface DateRangePickerInputProps extends Omit<DateInputProps, 'value'> {
  type: DateRangePickerInputType;
  value?: string | null;
  optional?: boolean;
  onValueChange: (value: string) => void;
}
export type DateRangePickerInputWithTypeProps = Omit<DateRangePickerInputProps, 'type'>;

export function DateRangePickerInput(props: DateRangePickerInputProps) {
  const {
    startValue,
    endValue,
    size,
    setStartValue,
    setStartOptional,
    setStartDisabled,
    setEndValue,
    setEndOptional,
    setEndDisabled,
    setMinDate,
    setMaxDate,
    setFocusField,
    open,
    close,
    dateRangePickerRef,
    startRef,
    endRef,
  } = useContext(DateRangePickerContext);
  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';
  const { isMobile } = useResponsiveLayout();

  useEffect(() => {
    if (isStart) {
      setStartValue(props.value || '');
    } else if (isEnd) {
      setEndValue(props.value || '');
    }
  }, []);

  useEffect(() => {
    if (isStart) {
      setStartOptional(props.optional || false);
      setStartDisabled(props.disabled || false);
      setMinDate(props.minDate || '');
    } else if (isEnd) {
      setEndOptional(props.optional || false);
      setEndDisabled(props.disabled || false);
      setMaxDate(props.maxDate || '');
    }
  }, [props.optional, props.disabled, props.minDate, props.maxDate]);

  useEffect(() => {
    if (isStart && startValue !== null) {
      props.onValueChange(startValue);
    }
  }, [startValue]);

  useEffect(() => {
    if (isEnd && endValue !== null) {
      props.onValueChange(endValue);
    }
  }, [endValue]);

  const commonProps: DateRangePickerInputProps = {
    withIcon: true,
    size,
    ...props,
    onValueChange: (value) => {
      if (isStart) {
        setStartValue(value || '');
      } else if (isEnd) {
        setEndValue(value || '');
      }
      props.onValueChange(value);
    },
    onClick: () => {
      if (props.disabled) {
        return;
      }
      open(props.type);
    },
    onFocus: (e) => {
      open(props.type);
      props.onFocus?.(e);
    },
    onBlur: (e) => {
      props.onBlur?.(e);

      if (isMobile) {
        return;
      }
      const nextFocusedElement = e.relatedTarget;
      if (!dateRangePickerRef.current?.contains(nextFocusedElement)) {
        close();
      }
      setFocusField(null);
    },
  };

  switch (props.type) {
    case 'start':
      return (
        <DateInput {...commonProps} value={props.value || ''} data-tid={DateRangePickerDataTids.start} ref={startRef} />
      );

    case 'end':
      return (
        <DateInput {...commonProps} value={props.value || ''} data-tid={DateRangePickerDataTids.end} ref={endRef} />
      );
  }
}
