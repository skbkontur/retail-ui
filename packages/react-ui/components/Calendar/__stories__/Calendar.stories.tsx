import React, { useState } from 'react';

import { Calendar } from '../Calendar';
import { Story } from '../../../typings/stories';
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
