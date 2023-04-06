import React, { useContext, useLayoutEffect, useRef, useState } from 'react';

import { Calendar, CalendarProps } from '../Calendar';
import { CalendarDateShape } from '../Calendar/CalendarDateShape';
import * as CalendarUtils from '../Calendar/calendarUtils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { MobilePopup } from '../../internal/MobilePopup';
import { DateInput } from '../DateInput';
import { Button } from '../Button';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { useEffectWithoutInitCall } from '../../hooks/useEffectWithoutInitCall';

import { DatePickerProps } from './DatePicker';
import { DatePickerLocaleHelper } from './locale';
import { styles } from './MobilePicker.styles';

export const MobilePickerDataTids = {
  input: 'MobilePicker__input',
  today: 'MobilePicker__today',
} as const;

// TODO: это странно, хочется, чтобы был только один набор пропсов
export interface MobilePickerProps {
  error?: boolean;
  warning?: boolean;

  textValue: DatePickerProps['value'];
  textMinDate: DatePickerProps['minDate'];
  textMaxDate: DatePickerProps['maxDate'];
  onTextValueChange: DatePickerProps['onValueChange'];

  internalValue: CalendarProps['value'];
  internalMinDate: CalendarProps['minDate'];
  internalMaxDate: CalendarProps['maxDate'];
  onInternalValueChange: CalendarProps['onValueChange'];

  isHoliday: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
  enableTodayLink?: boolean;

  onCloseRequest?: () => void;
}

export const MobilePicker: React.FC<MobilePickerProps> = (props) => {
  const locale = useLocaleForControl('DatePicker', DatePickerLocaleHelper);

  const originalTheme = useContext(ThemeContext);
  const theme = ThemeFactory.create(
    {
      calendarPaddingX: '16px',
      calendarCellSize: '40px',
      calendarCellBorderRadius: '20px',
      calendarCellFontSize: '16px',
      calendarGridRowSpacing: '8px',
      dateSelectFontSize: '16px',
      dateSelectLineHeight: '20px',
      calendarWrapperHeight: '304px',
    },
    originalTheme,
  );

  const onValueChange = (date: CalendarDateShape) => {
    if (props.onInternalValueChange) {
      props.onInternalValueChange(date);
    }
    if (props.onCloseRequest) {
      props.onCloseRequest();
    }
  };

  const inputRef = useRef<DateInput>(null);
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const calendarRef = useRef<Calendar>(null);
  const [today] = useState(() => CalendarUtils.getTodayDate());
  const onTodayClick = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollToMonth(today.month, today.year);
    }
  };

  useEffectWithoutInitCall(() => {
    if (props.internalValue && calendarRef.current) {
      calendarRef.current.scrollToMonth(props.internalValue.month, props.internalValue.year);
    }
  }, [props.internalValue]);

  return (
    <ThemeContext.Provider value={theme}>
      <MobilePopup
        opened
        headerChildComponent={
          <DateInput
            value={props.textValue || ''}
            width="100%"
            withIcon
            ref={inputRef}
            minDate={props.textMinDate}
            maxDate={props.textMaxDate}
            onValueChange={props.onTextValueChange}
            size="medium"
            warning={props.warning}
            error={props.error}
            data-tid={MobilePickerDataTids.input}
          />
        }
        footerChildComponent={
          props.enableTodayLink && (
            <Button size="medium" onClick={onTodayClick} data-tid={MobilePickerDataTids.today}>
              {locale.today}
            </Button>
          )
        }
        onCloseRequest={props.onCloseRequest}
      >
        <Calendar
          ref={calendarRef}
          value={props.internalValue}
          className={styles.calendarRoot()}
          minDate={props.internalMinDate}
          maxDate={props.internalMaxDate}
          onValueChange={onValueChange}
          _initialMonth={props.internalValue?.month ?? today.month}
          _initialYear={props.internalValue?.year ?? today.year}
          isHoliday={props.isHoliday}
          hasBottomSeparator
        />
      </MobilePopup>
    </ThemeContext.Provider>
  );
};
