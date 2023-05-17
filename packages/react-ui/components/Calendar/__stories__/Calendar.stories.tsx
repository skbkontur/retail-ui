import React from 'react';
import { action } from '@storybook/addon-actions';

import { LocaleContext } from '../../../lib/locale';
import { Calendar } from '../Calendar';
import { delay } from '../../../lib/utils';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { Story } from '../../../typings/stories';

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
    skip: {
      reason: "8px and 2022 themes don't affect appearance",
      in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark)\b)/,
    },
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
