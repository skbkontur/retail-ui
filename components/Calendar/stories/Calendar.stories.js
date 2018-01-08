import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '../Calendar';
import Button from '../../Button';
import Gapped from '../../Gapped';

storiesOf('Calendar', module)
  .add('simple', () => <Calendar />)
  .add('CalendarWithButtons', () => <CalendarWithButtons />);

const initialDate = new Date(2018, 0, 1);
const datesToScroll = [
  new Date(2017, 5, 1),
  new Date(2017, 10, 1),
  new Date(2017, 11, 1),
  new Date(2018, 1, 1),
  new Date(2018, 2, 1),
  new Date(2018, 5, 1)
];

class CalendarWithButtons extends React.Component {
  render() {
    return (
      <Gapped vertical>
        <Calendar ref={cal => (this.cal = cal)} date={initialDate} />
        <Gapped vertical>
          {datesToScroll.map(x => (
            <Button
              key={x.toDateString()}
              width={240}
              onClick={() => this.cal.scrollToDate(x)}
            >
              Scroll to: {x.toLocaleDateString()}
            </Button>
          ))}
        </Gapped>
      </Gapped>
    );
  }
}
