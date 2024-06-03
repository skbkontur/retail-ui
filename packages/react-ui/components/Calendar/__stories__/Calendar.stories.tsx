import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Calendar } from '../Calendar';
import { Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { LocaleContext } from '../../../lib/locale';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';

export default {
    title: 'Date/Calendar',
    component: Calendar,
};

export const CalendarWithBottomSeparator: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');

  return <Calendar value={date} onValueChange={setDate} />;
};
CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';

export const CalendarWithMinMaxDate: Story = () => {
  const [min, setMin] = React.useState('02.07.2017');
  const [max, setMax] = React.useState('30.01.2020');

  return (
    <Gapped vertical gap={10}>
      <label>
        Начало периода: <input type="text" value={min} placeholder="min" onChange={(e) => setMin(e.target.value)} />
      </label>
      <label>
        Окончание периода: <input type="text" value={max} placeholder="max" onChange={(e) => setMax(e.target.value)} />
      </label>
      <LocaleContext.Provider
        value={{
          locale: { DatePicker: { order: InternalDateOrder.DMY, separator: InternalDateSeparator.Dot } },
        }}
      >
        <Calendar value="02.07.2017" minDate={min} maxDate={max} onValueChange={action('pick')} />
      </LocaleContext.Provider>
    </Gapped>
  );
};
CalendarWithMinMaxDate.storyName = 'Calendar with min max date';

export const ScrollsCalendarOnDateChange: Story = () => {
  const [date, setDate] = useState('01.01.2001');

  return (
    <>
      <button data-tid="change-date-button" onClick={() => setDate('12.12.2012')}>
        set new date
      </button>
      <Calendar value={date} onValueChange={setDate} />
    </>
  );
};
ScrollsCalendarOnDateChange.storyName = 'Scrolls Calendar on date change';
