import type { Ref } from 'react';
import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';

import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import type { DateInputProps } from '../DateInput';
import { DateInput } from '../DateInput';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { isNonNullable } from '../../lib/utils';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';
import { DateRangePickerLocaleHelper } from './locale';

export type DateRangePickerInputType = 'start' | 'end';

export interface DateRangePickerInputProps extends Omit<DateInputProps, 'value'> {
  type: DateRangePickerInputType;
  value?: string | null;
  optional?: boolean;
}

type DateRangePickerInputWithoutType = Omit<DateRangePickerInputProps, 'type'>;

const DateRangePickerInput = forwardRef((props: DateRangePickerInputProps, ref: Ref<DateInput | null>) => {
  const {
    minDate,
    maxDate,
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
    setFocusInput,
    open,
    close,
    dateRangePickerRef,
    startRef,
    endRef,
  } = useContext(DateRangePickerContext);
  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';
  const locale = useLocaleForControl('DateRangePicker', DateRangePickerLocaleHelper);

  const { isMobile } = useResponsiveLayout();

  useImperativeHandle(ref, () => (isStart ? startRef.current : endRef.current), []);

  useEffect(() => {
    if (isStart && startValue !== props.value) {
      setStartValue(props.value || '');
    } else if (isEnd && endValue !== props.value) {
      setEndValue(props.value || '');
    }
  }, [props.value]);

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
    if (isStart && startValue !== props.value && isNonNullable(startValue)) {
      props.onValueChange?.(startValue);
    }
  }, [startValue]);

  useEffect(() => {
    if (isEnd && endValue !== props.value && isNonNullable(endValue)) {
      props.onValueChange?.(endValue);
    }
  }, [endValue]);

  const commonProps: DateRangePickerInputProps = {
    withIcon: true,
    size,
    minDate,
    maxDate,
    ...props,
    onValueChange: (value) => {
      if (isStart) {
        setStartValue(value || '');
      } else if (isEnd) {
        setEndValue(value || '');
      }
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
      setFocusInput(null);
    },
  };

  switch (props.type) {
    case 'start':
      return (
        <DateInput
          {...commonProps}
          value={props.value || ''}
          data-tid={props['data-tid'] || DateRangePickerDataTids.start}
          aria-label={props['aria-label'] || locale.startDateLabel}
          ref={startRef}
        />
      );
    case 'end':
      return (
        <DateInput
          {...commonProps}
          value={props.value || ''}
          data-tid={props['data-tid'] || DateRangePickerDataTids.end}
          aria-label={props['aria-label'] || locale.endDateLabel}
          ref={endRef}
        />
      );
  }
});

export const DateRangePickerStart = forwardRefAndName(
  'DateRangePickerStart',
  (props: DateRangePickerInputWithoutType, ref: Ref<DateInput>) => (
    <DateRangePickerInput type="start" {...props} ref={ref} />
  ),
);

export const DateRangePickerEnd = forwardRefAndName(
  'DateRangePickerEnd',
  (props: DateRangePickerInputWithoutType, ref: Ref<DateInput>) => (
    <DateRangePickerInput type="end" {...props} ref={ref} />
  ),
);
