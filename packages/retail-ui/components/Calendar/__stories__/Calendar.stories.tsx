// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '../Calendar';
import Button from '../../Button';
import Gapped from '../../Gapped';
import { Nullable } from '../../../typings/utility-types';

storiesOf('Calendar', module)
  .add('simple', () => (
    <Calendar
      minDate={{ year: 2017, month: 10, date: 13 }}
      maxDate={{ year: 2018, month: 3, date: 15 }}
    />
  ))
  .add('CalendarWithButtons', () => <CalendarWithButtons />);

const initialDate = { year: 2018, month: 0, date: 1 };
const datesToScroll = [
  { year: 2017, month: 5, date: 1 },
  { year: 2017, month: 10, date: 1 },
  { year: 2017, month: 11, date: 1 },
  { year: 2018, month: 0, date: 1 },
  { year: 2018, month: 1, date: 1 },
  { year: 2018, month: 2, date: 1 },
  { year: 2018, month: 5, date: 1 }
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
