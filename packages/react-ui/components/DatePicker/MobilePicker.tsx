import React, { useContext, useLayoutEffect, useRef, useState } from 'react';

import { MobilePopup } from '../../internal/MobilePopup/index.js';
import { useLocaleForControl } from '../../lib/locale/useLocaleForControl.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { Button } from '../Button/index.js';
import { getMonthInHumanFormat, getTodayDate } from '../Calendar/CalendarUtils.js';
import { Calendar } from '../Calendar/index.js';
import { DateInput } from '../DateInput/index.js';
import type { DatePickerProps } from './DatePicker.js';
import { getMobilePickerTheme } from './getMobilePickerTheme.js';
import { DatePickerLocaleHelper } from './locale/index.js';
import { getStyles } from './MobilePicker.styles.js';

export const MobilePickerDataTids = {
  input: 'MobilePicker__input',
  today: 'MobilePicker__today',
} as const;

export interface MobilePickerProps extends Pick<
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
  | 'onMonthChange'
> {
  onCloseRequest?: () => void;
}

export const MobilePicker: React.FC<MobilePickerProps> = (props) => {
  const locale = useLocaleForControl('DatePicker', DatePickerLocaleHelper);
  const styles = useStyles(getStyles);
  const theme = getMobilePickerTheme(useContext(ThemeContext));

  const calendarRef = useRef<Calendar>(null);
  const inputRef = useRef<DateInput>(null);

  const [{ month: monthNative, year }] = useState(() => getTodayDate());
  const month = getMonthInHumanFormat(monthNative);

  const onValueChange = (date: string) => {
    props.onValueChange?.(date);
    props.onCloseRequest?.();
  };

  useLayoutEffect(() => {
    // fix DateInput flushSync warning in React 18
    setTimeout(() => {
      inputRef.current?.focus();
    });
  }, []);

  const onTodayClick = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollToMonth(month, year);
    }
  };

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
          onMonthChange={props.onMonthChange}
        />
      </MobilePopup>
    </ThemeContext.Provider>
  );
};
