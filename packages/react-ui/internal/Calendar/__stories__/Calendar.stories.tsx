import React from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { Nullable } from '../../../typings/utility-types';
import { Button } from '../../../components/Button';
import { Gapped } from '../../../components/Gapped';
import { Calendar } from '../Calendar';

export default { title: 'Calendar', parameters: { creevey: { skip: [true] } } };

export const CalendarWithButtonsStory = () => <CalendarWithButtons />;
CalendarWithButtonsStory.storyName = 'CalendarWithButtons';

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
              <Gapped vertical>
                <Calendar ref={(cal) => (this.cal = cal)} value={initialDate} />
                <Gapped vertical>
                  {datesToScroll.map((x) => (
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
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
