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
          data-tid="input_period_start"
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
          data-tid="input_period_end"
          onChange={(e) => setPeriodEndDate(e.target.value)}
        />
      </label>
      <LocaleContext.Provider
        value={{
          locale: { DatePicker: { order: InternalDateOrder.DMY, separator: InternalDateSeparator.Dot } },
        }}
      >
        <button data-tid="period_clearing" onClick={periodClearing}>
          Очистить период
        </button>
        <Calendar
          value={periodStartDate || periodEndDate}
          periodStartDate={periodStartDate}
          periodEndDate={periodEndDate}
          minDate={min}
          maxDate={max}
          onValueChange={onValueChange}
        />
      </LocaleContext.Provider>
    </Gapped>
  );
};
CalendarWithPeriod.storyName = 'Calendar with period';

CalendarWithPeriod.parameters = {
  creevey: {
    tests: {
      async 'Period selection'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid="period_clearing"]' }))
          .perform();
        await delay(1000);
        const day10 = this.browser.findElement({
          css: '[data-tid="DayCellView__root"]:nth-child(11) ',
        });
        const day15 = this.browser.findElement({
          css: '[data-tid="DayCellView__root"]:nth-child(16) ',
        });
        await this.browser.actions({ bridge: true }).click(day10).click(day15).perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
      },
      async 'Period change'() {
        const day10 = this.browser.findElement({
          css: '[data-tid="DayCellView__root"]:nth-child(6) ',
        });
        const day15 = this.browser.findElement({
          css: '[data-tid="DayCellView__root"]:nth-child(11) ',
        });
        await this.browser.actions({ bridge: true }).click(day10).click(day15).perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
      },
      async 'Checking blocked left days'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid="period_clearing"]' }))
          .perform();
        const day10 = this.browser.findElement({
          css: '[data-tid="DayCellView__root"]:nth-child(11) ',
        });

        await this.browser.actions({ bridge: true }).click(day10).perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
      },
      async 'Checking blocked right days'() {
        const inputPeriodStart = this.browser.findElement({
          css: '[data-tid="input_period_start"]',
        });
        await this.browser
          .actions({ bridge: true })
          .click(inputPeriodStart)
          .keyDown(this.keys.CONTROL)
          .sendKeys('a')
          .keyUp(this.keys.CONTROL)
          .sendKeys(this.keys.DELETE)
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
      },
    },
  },
};
