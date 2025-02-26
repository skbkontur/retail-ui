import React, { useContext, useEffect } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { useResponsiveLayout } from '../ResponsiveLayout';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export type DateRangePickerFieldType = 'start' | 'end';

export interface DateRangePickerFieldProps extends Omit<DateInputProps, 'value'> {
  type: DateRangePickerFieldType;
  value?: string | null;
  optional?: boolean;
  onValueChange: (value: string) => void;
}
export type DateRangePickerFieldWithTypeProps = Omit<DateRangePickerFieldProps, 'type'>;

export function DateRangePickerField(props: DateRangePickerFieldProps) {
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
      setStartOptional(props.optional || false);
      setStartDisabled(props.disabled || false);
      setMinDate(props.minDate || '');
    } else if (isEnd) {
      setEndValue(props.value || '');
      setEndOptional(props.optional || false);
      setEndDisabled(props.disabled || false);
      setMaxDate(props.maxDate || '');
    }
  }, []);

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

  const commonProps: DateRangePickerFieldProps = {
    withIcon: true,
    size,
    ...props,
    value: props.value,
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
