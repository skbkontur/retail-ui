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
    disabled,
    autoFocus,
    warning,
    error,
    dateRangePickerRef,
    startRef,
    endRef,
    setEnd,
    setStart,
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
    onFocus: () => {
      open(props.type);
      onFocus?.();
    },
    onBlur: (e) => {
      if (isMobile) {
        return;
      }
      const nextFocusedElement = e.relatedTarget;
      if (!dateRangePickerRef.current?.contains(nextFocusedElement)) {
        close();
      }
      onBlur?.();
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
};
