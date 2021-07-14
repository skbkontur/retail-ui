import React from 'react';

import { InternalDateTransformer } from '../../../lib/date/InternalDateTransformer';
import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../../components/Button';
import { Gapped } from '../../../components/Gapped';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Calendar } from '../Calendar';

export default { title: 'Calendar', parameters: { creevey: { skip: [true] } } };

export const Simple = () => (
  <Calendar minDate={{ year: 2017, month: 10, date: 13 }} maxDate={{ year: 2018, month: 3, date: 15 }} />
);
Simple.storyName = 'simple';

export const LocaleContextProvider = () => (
  <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
    <Calendar />
  </LocaleContext.Provider>
);
LocaleContextProvider.storyName = 'LocaleContext.Provider';

export const CalendarWithButtonsStory = () => <CalendarWithButtons />;
CalendarWithButtonsStory.storyName = 'CalendarWithButtons';

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
    <Calendar
      isHoliday={date => {
        return date.isWeekend || holidays.includes(InternalDateTransformer.dateToInternalString(date));
      }}
    />
  );
};
CalendarWithHolidays.storyName = 'Calendar with holidays';

const initialDate = { year: 2018, month: 0, date: 1 };
const datesToScroll = [
  { year: 2017, month: 5, date: 1 },
  { year: 2017, month: 10, date: 1 },
  { year: 2017, month: 11, date: 1 },
  { year: 2018, month: 0, date: 1 },
  { year: 2018, month: 1, date: 1 },
  { year: 2018, month: 2, date: 1 },
  { year: 2018, month: 5, date: 1 },
];

class CalendarWithButtons extends React.Component {
  private cal: Nullable<Calendar>;

  public render() {
    return (
      <Gapped vertical>
        <Calendar ref={cal => (this.cal = cal)} value={initialDate} />
        <Gapped vertical>
          {datesToScroll.map(x => (
            <Button
              key={x.year + '-' + x.month + '-' + x.date}
              width={240}
              onClick={() => {
                if (this.cal) {
                  this.cal.scrollToMonth(x.month, x.year);
                }
              }}
            >
              Scroll to: {x.date + '-' + (1 + x.month) + '-' + x.year}
            </Button>
          ))}
        </Gapped>
      </Gapped>
    );
  }
}
