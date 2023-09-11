import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { LocaleContext } from '../../../lib/locale';
import { Calendar } from '../Calendar';
import { delay } from '../../../lib/utils';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Calendar/Functional tests',
  parameters: {
    creevey: {
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    },
  },
} as Meta;

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

CalendarWithMinMaxDate.parameters = {
  creevey: {
    tests: {
      async 'DateSelect months'() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Calendar"]' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({ bridge: true })
          .click(
            this.browser.findElement({
              css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
      },
      async 'DateSelect years'() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Calendar"]' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({ bridge: true })
          .click(
            this.browser.findElement({
              css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect years');
      },
    },
  },
};

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

ScrollsCalendarOnDateChange.parameters = {
  creevey: {
    tests: {
      async 'initial date'() {
        await this.expect(await this.takeScreenshot()).to.matchImage('initial date');
      },
      async 'scrolls to new date on date change'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid="change-date-button"]' }))
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('scrolls to new date on date change');
      },
    },
  },
};
