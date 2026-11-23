import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import type { Ref } from 'react';

import { MIN_FULLDATE, MAX_FULLDATE } from '../../lib/date/constants.js';
import { forwardRefAndName } from '../../lib/forwardRefAndName.js';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl.js';
import { isNonNullable } from '../../lib/utils.js';
import { DateInput } from '../DateInput/index.js';
import type { DateInputProps } from '../DateInput/index.js';
import { useResponsiveLayout } from '../ResponsiveLayout/index.js';
import { DateRangePickerDataTids } from './DateRangePicker.js';
import { DateRangePickerContext } from './DateRangePickerContext.js';
import { DateRangePickerLocaleHelper } from './locale/index.js';

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
    startRef,
    endRef,
  } = useContext(DateRangePickerContext);
  const isStart = props.type === 'start';
  const isEnd = props.type === 'end';
  const locale = useLocaleForControl('DateRangePicker', DateRangePickerLocaleHelper);

  const { isMobile } = useResponsiveLayout();

  useImperativeHandle<DateInput | null, DateInput | null>(ref, () => (isStart ? startRef.current : endRef.current), []);

  const valueFromPropsRef = useRef(props.value);
  const currentValue = isStart ? startValue : endValue;

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
      setMinDate(props.minDate || MIN_FULLDATE);
    } else if (isEnd) {
      setEndOptional(props.optional || false);
      setEndDisabled(props.disabled || false);
      setMaxDate(props.maxDate || MAX_FULLDATE);
    }
  }, [props.optional, props.disabled, props.minDate, props.maxDate]);

  useEffect(() => {
    // Если контролируемый `value` изменился в этом же коммите, то внутреннее состояние устарело:
    // сообщать о нём наверх нельзя, иначе значение из пропа и внутреннее значение перезаписывают
    // друг друга и обновления зацикливаются (React error #185).
    const isValueChangedFromProps = valueFromPropsRef.current !== props.value;
    valueFromPropsRef.current = props.value;

    if (isValueChangedFromProps) {
      return;
    }

    if (currentValue !== props.value && isNonNullable(currentValue)) {
      props.onValueChange?.(currentValue);
    }
  }, [currentValue, props.value]);

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
    onClick: (e) => {
      if (props.disabled) {
        return;
      }
      open(props.type);
      props.onClick?.(e);
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
      const isFocusStart = startRef.current?.getRootNode()?.contains(nextFocusedElement);
      const isFocusEnd = endRef.current?.getRootNode()?.contains(nextFocusedElement);

      if (!isFocusStart && !isFocusEnd) {
        close();
        setFocusInput(null);
      }
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
