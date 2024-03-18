import React, { CSSProperties, useState } from 'react';

import { delay } from '../../../lib/utils';
import { Calendar } from '../Calendar';
import { Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { CalendarMonthChangeInfo } from '../';

export default { title: 'Calendar' };

export const CalendarWithBottomSeparator: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');

  return <Calendar value={date} onValueChange={setDate} />;
};
CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';
CalendarWithBottomSeparator.parameters = {
  creevey: {
    skip: {
      "8px and 2022 themes don't affect the bottom separator": {
        in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark)\b)/,
      },
    },
  },
};

const CustomDayItem: React.FC<{ date: string }> = ({ date }) => {
  const isEven = (num: number): boolean => num % 2 === 0;
  const [day] = date.split('.').map(Number);

  return <div>{isEven(day) ? '#' : day}</div>;
};

export const CalendarWithCustomDates: Story = () => {
  return <Calendar value={'12.05.2022'} renderDay={(date) => <CustomDayItem date={date} />} />;
};

CalendarWithCustomDates.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome|firefox)\b)/ },
    },
  },
};

export const CalendarWithCustomCellSize: Story = () => {
  return (
    <ThemeContext.Provider
      value={ThemeFactory.create({
        calendarCellSize: '50px',
      })}
    >
      <Calendar value={'12.05.2022'} />;
    </ThemeContext.Provider>
  );
};

CalendarWithCustomCellSize.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome|firefox)\b)/ },
    },
  },
};

const CustomDay: React.FC<{ date: string }> = ({ date }) => {
  const [day, month, year] = date.split('.').map(Number);
  const isCustomDate = day === 2 && month === 1 && year === 2018;
  return isCustomDate ? <div data-tid="CustomDayItem">{day}</div> : <div>{day}</div>;
};

export const CalendarWithMonthChangeHandle: Story = () => {
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2017);
  const [value, setValue] = useState('02.12.2017');

  const onMonthChange = (changeInfo: CalendarMonthChangeInfo): void => {
    setMonth(changeInfo.month);
    setYear(changeInfo.year);
  };

  const containerWithInfoStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginLeft: '64px',
    width: '450px',
    textAlign: 'center',
  };
  const containersStyle: CSSProperties = { display: 'flex', flexDirection: 'column' };
  const monthYearStyle: CSSProperties = { border: '1px #c2b8b8 solid' };

  return (
    <div style={{ display: 'flex' }}>
      <Calendar
        value={value}
        onValueChange={setValue}
        onMonthChange={onMonthChange}
        renderDay={(date) => <CustomDay date={date} />}
      />
      <div style={containerWithInfoStyle}>
        <div style={containersStyle}>
          <span>Отображаемый месяц</span>
          <span style={monthYearStyle}>{month}</span>
        </div>
        <div style={containersStyle}>
          <span>Отображаемый год</span>
          <span style={monthYearStyle}>{year}</span>
        </div>
      </div>
    </div>
  );
};
CalendarWithMonthChangeHandle.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome|firefox)\b)/ },
    },
    tests: {
      async 'month and year change when selecting day'() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-tid~="CustomDayItem"]' }))
          .perform();
        await delay(2000);

        await this.expect(await this.takeScreenshot()).matchImage('month and year change when selecting day');
      },
    },
  },
};
