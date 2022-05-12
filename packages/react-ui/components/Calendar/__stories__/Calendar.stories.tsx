import React from 'react';
import { action } from '@storybook/addon-actions';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { InternalDateTransformer } from '../../../lib/date/InternalDateTransformer';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Calendar } from '../Calendar';

export default { title: 'Calendar' };

export const Simple = () => (
  <Calendar value={{ year: 2022, month: 5, date: 12 }} onPick={action('pick')} enableTodayLink />
);
Simple.storyName = 'simple';

export const LocaleContextProvider = () => (
  <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
    <Calendar value={null} onPick={action('pick')} enableTodayLink />
  </LocaleContext.Provider>
);
LocaleContextProvider.storyName = 'LocaleContext.Provider';

export const CalendarWithHolidays = () => {
  const holidays: string[] = [];

  do {
    holidays.push(
      InternalDateTransformer.dateToInternalString({
        date: Math.round(31 * Math.random()),
        month: Math.round(12 * Math.random()),
        year: new Date().getFullYear(),
      }),
    );
  } while (holidays.length < 100);

  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <div
            style={{
              height: '100%',
              width: '100%',
              background: theme.prototype.constructor.name === 'DarkTheme' ? '#333' : '#fff',
            }}
          >
            <Calendar
              value={null}
              onPick={action('pick')}
              isHoliday={(date) => {
                return date.isWeekend || holidays.includes(InternalDateTransformer.dateToInternalString(date));
              }}
            />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};
CalendarWithHolidays.storyName = 'Calendar with holidays';
