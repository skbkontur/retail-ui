import React, { forwardRef, Ref, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import type { PropsWithoutRef } from 'react';

import { DateInput, DateInputProps } from '../DateInput';
import { useResponsiveLayout } from '../ResponsiveLayout';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerDataTids } from './DateRangePicker';

export type DateRangePickerInputType = 'start' | 'end';

export interface DateRangePickerInputProps extends Omit<DateInputProps, 'value'> {
  type: DateRangePickerInputType;
  value?: string | null;
  optional?: boolean;
  onValueChange: (value: string) => void;
}

type DateRangePickerInputWithoutType = Omit<DateRangePickerInputProps, 'type'>;

const DateRangePickerInput = forwardRef(
  (props: PropsWithoutRef<DateRangePickerInputProps>, ref: Ref<DateInput | null>) => {
    const {
      startValue,
      endValue,
      size,
      focusInput,
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
    } = useContext(DateRangePickerContext);
    const isStart = props.type === 'start';
    const isEnd = props.type === 'end';
    const startRef = useRef<DateInput>(null);
    const endRef = useRef<DateInput>(null);
    const innerRef = isStart ? startRef : endRef;
    const { isMobile } = useResponsiveLayout();

    useImperativeHandle(ref, () => innerRef.current, []);

    useEffect(() => {
      if (!focusInput) {
        return;
      }

      // fix DateInput flushSync warning in React 18
      setTimeout(() => {
        if (focusInput === 'start') {
          startRef.current?.focus();
        } else if (focusInput === 'end') {
          endRef.current?.focus();
        }
      });
    }, [focusInput]);

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
        setFocusInput(null);
      },
    };

    switch (props.type) {
      case 'start':
        return (
          <DateInput
            {...commonProps}
            value={props.value || ''}
            data-tid={DateRangePickerDataTids.start}
            ref={startRef}
          />
        );

      case 'end':
        return (
          <DateInput {...commonProps} value={props.value || ''} data-tid={DateRangePickerDataTids.end} ref={endRef} />
        );
    }
  },
);

export const DateRangePickerStart = forwardRefAndName(
  'DateRangePickerStart',
  (props: PropsWithoutRef<DateRangePickerInputWithoutType>, ref: Ref<DateInput>) => (
    <DateRangePickerInput type="start" {...props} ref={ref} />
  ),
);

export const DateRangePickerEnd = forwardRefAndName(
  'DateRangePickerEnd',
  (props: PropsWithoutRef<DateRangePickerInputWithoutType>, ref: Ref<DateInput>) => (
    <DateRangePickerInput type="end" {...props} ref={ref} />
  ),
);
