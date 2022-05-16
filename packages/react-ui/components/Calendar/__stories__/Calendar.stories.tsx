import React from 'react';
import { action } from '@storybook/addon-actions';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { InternalDateTransformer } from '../../../lib/date/InternalDateTransformer';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Calendar } from '../Calendar';
import { delay } from '../../../lib/utils';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { InternalDate } from '../../../lib/date/InternalDate';
import { Story } from '../../../typings/stories';

export default { title: 'Calendar' };

export const Simple = () => (
  <Calendar value={{ year: 2022, month: 5, date: 12 }} onPick={action('pick')} enableTodayLink />
);
Simple.storyName = 'simple';

export const LocaleContextProvider = () => (
  <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
    <Calendar value={null} onPick={action('pick')} enableTodayLink />
  </LocaleContext.Provider>
);
LocaleContextProvider.storyName = 'LocaleContext.Provider';

export const CalendarWithHolidays = () => {
  const holidays: string[] = [];

  do {
    holidays.push(
      InternalDateTransformer.dateToInternalString({
        date: Math.round(31 * Math.random()),
        month: Math.round(12 * Math.random()),
        year: new Date().getFullYear(),
      }),
    );
  } while (holidays.length < 100);

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
            <Calendar
              value={null}
              onPick={action('pick')}
              isHoliday={(date) => {
                return date.isWeekend || holidays.includes(InternalDateTransformer.dateToInternalString(date));
              }}
            />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};
CalendarWithHolidays.storyName = 'Calendar with holidays';
CalendarWithHolidays.parameters = {
  creevey: { skip: true },
};

export const CalendarWithMinMaxDate: Story = () => <CalendarWithMinMax />;
CalendarWithMinMaxDate.storyName = 'Calendar with min max date';

CalendarWithMinMaxDate.parameters = {
  creevey: {
    tests: {
      async ['DateSelect months']() {
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
      async ['DateSelect years']() {
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

class CalendarWithMinMax extends React.Component<any, any> {
  public state = {
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
            onPick={action('pick')}
          />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}
