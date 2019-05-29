// tslint:disable:jsx-no-lambda
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Nullable } from '../../../typings/utility-types';
import Button from '../../Button';
import Gapped from '../../Gapped';
import LocaleProvider, { LangCodes } from '../../LocaleProvider';
import Calendar from '../Calendar';

storiesOf('Calendar', module)
  .add('simple', () => (
    <Calendar minDate={{ year: 2017, month: 10, date: 13 }} maxDate={{ year: 2018, month: 3, date: 15 }} />
  ))
  .add('LocaleProvider', () => (
    <LocaleProvider langCode={LangCodes.en_EN}>
      <Calendar />
    </LocaleProvider>
  ))
  .add('CalendarWithButtons', () => <CalendarWithButtons />)
  .add('Calendar with holidays', () => {
    const holidays = new Array(10);
    const today = new Date();

    for (let index = 0; index < holidays.length; index++) {
      const day = new Date(today.setDate(today.getDate() + 1 + index).valueOf());
      const element = {
        date: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
      };

      holidays[index] = element;
    }

    return <Calendar holidays={holidays as any} />;
  });

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
