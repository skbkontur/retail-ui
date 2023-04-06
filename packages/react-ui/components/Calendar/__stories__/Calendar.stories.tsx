import React from 'react';
import { action } from '@storybook/addon-actions';

import { LocaleContext } from '../../../lib/locale';
import { Calendar, CalendarProps } from '../Calendar';
import { delay } from '../../../lib/utils';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { InternalDate } from '../../../lib/date/InternalDate';
import { Story } from '../../../typings/stories';

export default { title: 'Calendar' };

export const Simple = () => <Calendar value={{ year: 2022, month: 5, date: 12 }} onValueChange={action('pick')} />;
Simple.storyName = 'simple';

export const CalendarWithBottomSeparator: Story = () => {
  return <Calendar value={{ year: 2022, month: 5, date: 12 }} hasBottomSeparator />;
};
CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';
CalendarWithBottomSeparator.parameters = {
  creevey: {
    skip: {
      reason: "8px theme doesn't affect the bottom separator",
      in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark|ie11|ie11Dark)\b)/,
    },
  },
};

export const CalendarWithMinMaxDate: Story = () => <CalendarWithMinMax />;
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

interface CalendarWithMinMaxState {
  min: string;
  max: string;
  value: CalendarProps['value'];
  order: InternalDateOrder;
  separator: InternalDateSeparator;
}
class CalendarWithMinMax extends React.Component<Partial<CalendarProps>, CalendarWithMinMaxState> {
  public state: CalendarWithMinMaxState = {
    min: '02.07.2017',
    max: '30.01.2020',
    value: { year: 2017, date: 2, month: 7 },
    order: InternalDateOrder.DMY,
    separator: InternalDateSeparator.Dot,
  };

  public render(): React.ReactNode {
    return (
      <Gapped vertical gap={10}>
        <label>
          Начало периода:{' '}
          <input
            type="text"
            value={this.state.min}
            placeholder="min"
            onChange={(e) => this.setState({ min: e.target.value })}
          />
        </label>
        <label>
          Окончание периода:{' '}
          <input
            type="text"
            value={this.state.max}
            placeholder="max"
            onChange={(e) => this.setState({ max: e.target.value })}
          />
        </label>
        <LocaleContext.Provider
          value={{
            locale: { DatePicker: { order: this.state.order, separator: this.state.separator } },
          }}
        >
          <Calendar
            value={this.state.value}
            minDate={new InternalDate({}).parseValue(this.state.min).getComponentsLikeNumber()}
            maxDate={new InternalDate({}).parseValue(this.state.max).getComponentsLikeNumber()}
            onValueChange={action('pick')}
          />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}
