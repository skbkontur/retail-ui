import React, { useContext } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { CommonProps } from '../../internal/CommonWrapper';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export type DateRangePickerFieldType = 'start' | 'end';

export interface DateRangePickerFieldProps
  extends CommonProps,
    Pick<DateInputProps, 'id' | 'size' | 'style' | 'withIcon' | 'width'> {
  type: DateRangePickerFieldType;
}

export type DateRangePickerFieldWithTypeProps = Omit<DateRangePickerFieldProps, 'type'>;

export function DateRangePickerField(props: DateRangePickerFieldProps) {
  const {
    start,
    end,
    minDate,
    maxDate,
    size,
    disabled,
    autoFocus,
    warning,
    error,
    dateRangePickerRef,
    startRef,
    endRef,
    setEnd,
    setStart,
    setFocusField,
    open,
    close,
    onFocus,
    onBlur,
  } = useContext(DateRangePickerContext);
  const { isMobile } = useResponsiveLayout();

  const commonProps: DateInputProps = {
    minDate,
    maxDate,
    size,
    withIcon: true,
    ...props,
    onClick: () => {
      const isDisabled = props.type === 'start' ? disabled?.[0] : disabled?.[1];
      if (isDisabled) {
        return;
      }
      open(props.type);
    },
    onFocus: (e) => {
      open(props.type);
      onFocus?.(e);
    },
    onBlur: (e) => {
      if (isMobile) {
        return;
      }
      const nextFocusedElement = e.relatedTarget;
      if (!dateRangePickerRef.current?.contains(nextFocusedElement)) {
        close();
      }
      setFocusField(null);
      onBlur?.(e);
    },
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
          data-tid={DateRangePickerDataTids.start}
          onValueChange={setStart}
          ref={startRef}
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
          data-tid={DateRangePickerDataTids.end}
          onValueChange={setEnd}
          ref={endRef}
          {...commonProps}
        />
      );
  }
}
