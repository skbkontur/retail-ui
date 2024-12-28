import React, { useContext } from 'react';

import { Calendar } from '../Calendar';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MobilePopup } from '../../internal/MobilePopup';

import { styles } from './MobileDateRangePicker.styles';
import { DateRangePickerFrom, DateRangePickerProps, DateRangePickerTo } from './DateRangePicker';
import { DateRangePickerSeparator } from './DateRangePickerSeparator';
import { DateRangePickerContext } from './DateRangePickerContext';
import { getMobileDateRangePickerTheme } from './DateRangePickerTheme';

export interface MobileDateRangePickerProps
  extends Pick<
    DateRangePickerProps,
    | 'error'
    | 'warning'
    | 'value'
    | 'minDate'
    | 'maxDate'
    | 'onValueChange'
    | 'enableTodayLink'
    | 'renderDay'
    | 'onMonthChange'
  > {
  onCalendarPickDay: (date: string) => void;
  onCloseRequest?: () => void;
}

export const MobileDateRangePicker: React.FC<MobileDateRangePickerProps> = (props) => {
  const state = useContext(DateRangePickerContext);
  const theme = getMobileDateRangePickerTheme(useContext(ThemeContext));

  return (
    <ThemeContext.Provider value={theme}>
      <MobilePopup
        opened
        headerChildComponent={
          <div className={styles.inputWrap()}>
            <DateRangePickerFrom width="auto" size="medium" />
            <DateRangePickerSeparator />
            <DateRangePickerTo width="auto" size="medium" />
          </div>
        }
        onCloseRequest={props.onCloseRequest}
      >
        <Calendar
          value={null}
          className={styles.calendarRoot()}
          minDate={props.minDate}
          maxDate={props.maxDate}
          onValueChange={(value) => props.onCalendarPickDay(value)}
          renderDay={props.renderDay}
          onMonthChange={props.onMonthChange}
          ref={state.calendarRef}
        />
      </MobilePopup>
    </ThemeContext.Provider>
  );
};
