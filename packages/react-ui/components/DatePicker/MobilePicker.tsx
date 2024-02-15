import React, { useContext, useLayoutEffect, useRef, useState } from 'react';

import { Calendar } from '../Calendar';
import * as CalendarUtils from '../Calendar/CalendarUtils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MobilePopup } from '../../internal/MobilePopup';
import { DateInput } from '../DateInput';
import { Button } from '../Button';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl';
import { useEffectWithoutInitCall } from '../../hooks/useEffectWithoutInitCall';

import { DatePickerProps } from './DatePicker';
import { DatePickerLocaleHelper } from './locale';
import { styles } from './MobilePicker.styles';
import { getMobilePickerTheme } from './getMobilePickerTheme';

export const MobilePickerDataTids = {
  input: 'MobilePicker__input',
  today: 'MobilePicker__today',
} as const;

export interface MobilePickerProps
  extends Pick<
    DatePickerProps,
    | 'error'
    | 'warning'
    | 'value'
    | 'minDate'
    | 'maxDate'
    | 'onValueChange'
    | 'isHoliday'
    | 'enableTodayLink'
    | 'renderDay'
    | 'onStuckMonth'
    | 'onMonthSelect'
    | 'periodStartDate'
    | 'periodEndDate'
  > {
  onCloseRequest?: () => void;
}

export const MobilePicker: React.FC<MobilePickerProps> = (props) => {
  const locale = useLocaleForControl('DatePicker', DatePickerLocaleHelper);

  const theme = getMobilePickerTheme(useContext(ThemeContext));

  const onValueChange = (date: string) => {
    if (props.onValueChange) {
      props.onValueChange(date);
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
    if (props.value && calendarRef.current) {
      const month = +props.value.substring(3, 5);
      const year = +props.value.substring(6);
      calendarRef.current.scrollToMonth(month, year);
    }
  }, [props.value]);

  return (
    <ThemeContext.Provider value={theme}>
      <MobilePopup
        opened
        headerChildComponent={
          <DateInput
            value={props.value || ''}
            width="100%"
            withIcon
            ref={inputRef}
            minDate={props.minDate}
            maxDate={props.maxDate}
            onValueChange={props.onValueChange}
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
          value={props.value}
          className={styles.calendarRoot()}
          minDate={props.minDate}
          maxDate={props.maxDate}
          onValueChange={onValueChange}
          isHoliday={props.isHoliday}
          renderDay={props.renderDay}
          onStuckMonth={props.onStuckMonth}
          onMonthSelect={props.onMonthSelect}
          periodStartDate={props.periodStartDate}
          periodEndDate={props.periodEndDate}
        />
      </MobilePopup>
    </ThemeContext.Provider>
  );
};
