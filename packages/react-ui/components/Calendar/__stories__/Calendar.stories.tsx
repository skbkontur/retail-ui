import React, { CSSProperties, useState } from 'react';
import { ShapeCircleMIcon } from '@skbkontur/icons/ShapeCircleMIcon';

import { delay } from '../../../lib/utils';
import { Calendar, CalendarProps } from '../Calendar';
import { Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { CalendarMonthChangeInfo } from '../';
import { Gapped } from '../../Gapped';
import { LocaleContext } from '../../../lib/locale';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';

export default { title: 'Calendar' };

export const CalendarWithBottomSeparator: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');

  return <Calendar value={date} onValueChange={setDate} />;
};

CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';
CalendarWithBottomSeparator.parameters = {
  creevey: {
    skip: {
      reason: "8px and 2022 themes don't affect the bottom separator",
      in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark)\b)/,
    },
  },
};

export const CalendarWithPeriod: Story = () => {
  const [min, setMin] = React.useState('05.08.2022');
  const [max, setMax] = React.useState('30.08.2022');
  const [periodStartDate, setPeriodStartDate] = React.useState('10.08.2022');
  const [periodEndDate, setPeriodEndDate] = React.useState('20.08.2022');
  const [focus, setFocus] = useState<'periodStartDate' | 'periodEndDate'>('periodStartDate');

  const getFocusStyle = (type: 'periodStartDate' | 'periodEndDate') =>
    focus === type ? { background: '#80A6FF' } : {};

  const periodClearing = () => {
    setFocus('periodStartDate');
    setPeriodStartDate('');
    setPeriodEndDate('');
  };

  const onValueChange = (date: string) => {
    if (focus === 'periodEndDate') {
      setPeriodEndDate(date);
      setFocus('periodStartDate');
    }
    if (focus === 'periodStartDate') {
      setPeriodStartDate(date);
      setFocus('periodEndDate');
    }
  };

  return (
    <Gapped vertical gap={10}>
      <label>
        Свободные дни с: <input type="text" value={min} placeholder="min" onChange={(e) => setMin(e.target.value)} />
      </label>
      <label>
        Свободные дни до: <input type="text" value={max} placeholder="max" onChange={(e) => setMax(e.target.value)} />
      </label>
      <label>
        Начало периода:
        <input
          type="text"
          style={getFocusStyle('periodStartDate')}
          onClick={() => setFocus('periodStartDate')}
          value={periodStartDate}
          onChange={(e) => setPeriodStartDate(e.target.value)}
        />
      </label>
      <label>
        Окончание периода:
        <input
          type="text"
          onClick={() => setFocus('periodEndDate')}
          style={getFocusStyle('periodEndDate')}
          value={periodEndDate}
          onChange={(e) => setPeriodEndDate(e.target.value)}
        />
      </label>
      <LocaleContext.Provider
        value={{
          locale: { DatePicker: { order: InternalDateOrder.DMY, separator: InternalDateSeparator.Dot } },
        }}
      >
        <button onClick={periodClearing}>Очистить период</button>
        <div>
          <Calendar
            value={periodStartDate || periodEndDate}
            data-tid="calendar_with_period"
            periodStartDate={periodStartDate}
            periodEndDate={periodEndDate}
            minDate={periodStartDate && !periodEndDate ? periodStartDate : min}
            maxDate={!periodStartDate && periodEndDate ? periodEndDate : max}
            onValueChange={onValueChange}
          />
        </div>
      </LocaleContext.Provider>
    </Gapped>
  );
};
CalendarWithPeriod.storyName = 'Calendar with period';
CalendarWithPeriod.parameters = {
  creevey: {
    captureElement: '[data-tid="calendar_with_period"]',
    skip: { 'logic is covered with unit tests': { in: /^(?!\bchrome\b)/ } },
  },
};

const customDayItem: CalendarProps['renderDay'] = (date, defaultProps, RenderDefault) => {
  const [dd] = date.split('.').map(Number);

  const isEven = (num: number): boolean => num % 2 === 0;

  return (
    <RenderDefault {...defaultProps}>
      <div>{isEven(dd) ? <ShapeCircleMIcon /> : dd}</div>
    </RenderDefault>
  );
};

export const CalendarWithCustomDates: Story = () => {
  return <Calendar value={'12.05.2022'} renderDay={customDayItem} />;
};

CalendarWithCustomDates.parameters = {
  creevey: {
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
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
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
  },
};

export const CalendarWithMonthChangeHandle: Story = () => {
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2017);
  const [value, setValue] = useState('02.12.2017');

  const onMonthChange = (changeInfo: CalendarMonthChangeInfo): void => {
    console.log('onMonthChange', changeInfo);
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
      <Calendar value={value} onValueChange={setValue} onMonthChange={onMonthChange} />
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
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
    tests: {
      async 'month and year change when selecting day'() {
        await this.browser
          .actions({ bridge: true })
          .click(this.browser.findElement({ css: '[data-tid~="DayCellView__root"]' }))
          .perform();
        await delay(2000);

        await this.expect(await this.takeScreenshot()).matchImage('month and year change when selecting day');
      },
    },
  },
};
