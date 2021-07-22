import { action } from '@storybook/addon-actions';
import React from 'react';

import { Meta, Story } from '../../../typings/stories';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import { Tooltip } from '../../Tooltip';
import { DatePicker } from '../DatePicker';
import { LocaleContext, LangCodes } from '../../../lib/locale';
import { delay } from '../../../lib/utils';

class DatePickerWithError extends React.Component<any, any> {
  public state = {
    value: '15.08.2014',
    error: false,
    tooltip: false,
  };

  public render() {
    return (
      <Gapped>
        <Tooltip
          trigger={this.state.tooltip ? 'opened' : 'closed'}
          render={() => 'Такой даты не существует'}
          onCloseClick={this.removeTooltip}
        >
          <LocaleContext.Provider
            value={{
              locale: { DatePicker: { order: InternalDateOrder.MDY } },
            }}
          >
            <DatePicker
              {...this.props}
              disabled={this.props.disabled}
              size={this.props.size}
              error={this.state.error}
              value={this.state.value}
              minDate="15.08.2003"
              maxDate="21.10.2006"
              onValueChange={this.handleChange}
              onFocus={this.invalidate}
              onBlur={this.validate}
              enableTodayLink
            />
          </LocaleContext.Provider>
        </Tooltip>
        <Button onClick={() => this.setState({ value: null, error: null, tooltip: false })}>Clear</Button>
        <Button onClick={() => this.setState({ value: '99.99.9999' })}>Set &quot;99.99.9999&quot;</Button>
        <Button onClick={() => this.setState({ value: '99.hello' })}>Set &quot;99.hello&quot;</Button>
        <Button onClick={() => this.setState({ value: '10.3' })}>Set &quot;10.3&quot;</Button>
      </Gapped>
    );
  }

  private handleChange = (value: any) => {
    action('change')(value);
    this.setState({ value });
  };

  private invalidate = () => {
    this.setState({ error: false, tooltip: false });
  };

  private validate = () => {
    const currentValue = this.state.value;
    this.setState(() => {
      const error =
        !!currentValue && !DatePicker.validate(currentValue, { minDate: '08.15.2003', maxDate: '10.21.2006' });
      return {
        error,
        tooltip: error,
      };
    });
  };

  private removeTooltip = () => {
    this.setState({
      tooltip: false,
    });
  };
}

class DatePickerWithMinMax extends React.Component<any, any> {
  public state = {
    min: '02.07.2017',
    max: '30.01.2020',
    value: '02.07.2017',
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
            onChange={e => this.setState({ min: e.target.value })}
          />
        </label>
        <label>
          Окончание периода:{' '}
          <input
            type="text"
            value={this.state.max}
            placeholder="max"
            onChange={e => this.setState({ max: e.target.value })}
          />
        </label>
        <LocaleContext.Provider
          value={{
            locale: { DatePicker: { order: this.state.order, separator: this.state.separator } },
          }}
        >
          <DatePicker
            width={200}
            value={this.state.value}
            minDate={this.state.min}
            maxDate={this.state.max}
            onValueChange={action('change')}
            useMobileNativeDatePicker
          />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

export default {
  title: 'DatePicker',
} as Meta;

export const WithMouseeventHandlers: Story = () => (
  <div style={{ padding: '200px 150px 350px 0px' }}>
    <DatePicker
      width={200}
      value="02.07.2017"
      onMouseEnter={() => console.count('enter')}
      onMouseLeave={() => console.count('leave')}
      onValueChange={action('change')}
    />
  </div>
);
WithMouseeventHandlers.storyName = 'with mouseevent handlers';

WithMouseeventHandlers.parameters = {
  creevey: {
    tests: {
      async opened() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('opened');
      },
      async ['DateSelect month']() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({ bridge: true })
          .click(
            this.browser.findElement({
              css:
                '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect month');
      },
      async ['DateSelect year']() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({ bridge: true })
          .click(
            this.browser.findElement({
              css:
                '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect year');
      },
    },
  },
};

export const WithMobileNativeDatePicker = () => {
  const [date, setDate] = useState('02.07.2017');

  return (
    <div style={{ padding: '200px 150px 350px 0px' }}>
      <Gapped vertical>
        <span>With mobile native datepicker</span>
        <DatePicker
          width={200}
          value={date}
          onMouseEnter={() => console.count('enter')}
          onMouseLeave={() => console.count('leave')}
          onValueChange={date => {
            setDate(date);
          }}
          useMobileNativeDatePicker
        />
      </Gapped>
    </div>
  );
};
WithMobileNativeDatePicker.storyName = 'with native datepickers on mobile devices';
WithMobileNativeDatePicker.parameters = { creevey: { skip: [true] } };

export const WithAutoFocus = () => (
  <DatePicker width={200} value="02.07.2017" onValueChange={action('change')} autoFocus />
);
WithAutoFocus.storyName = 'with autoFocus';
WithAutoFocus.parameters = { creevey: { skip: [true] } };

export const DatePickerWithErrorStory = () => <DatePickerWithError />;
DatePickerWithErrorStory.storyName = 'DatePickerWithError';
DatePickerWithErrorStory.parameters = { creevey: { skip: [true] } };

export const DatePickerDisabled = () => <DatePickerWithError disabled />;
DatePickerDisabled.storyName = 'DatePicker disabled';
DatePickerDisabled.parameters = { creevey: { skip: [true] } };

export const DatePickerMedium = () => <DatePickerWithError size="medium" />;
DatePickerMedium.storyName = 'DatePicker medium';
DatePickerMedium.parameters = { creevey: { skip: [true] } };

export const DatePickerLarge = () => <DatePickerWithError size="large" />;
DatePickerLarge.storyName = 'DatePicker large';
DatePickerLarge.parameters = { creevey: { skip: [true] } };

export const DatePickerWithMinMaxDate: Story = () => (
  <div style={{ padding: '200px 150px 350px 0px' }}>
    <DatePickerWithMinMax />
  </div>
);
DatePickerWithMinMaxDate.storyName = 'DatePicker with min max date';

DatePickerWithMinMaxDate.parameters = {
  creevey: {
    tests: {
      async ['DateSelect months']() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({ bridge: true })
          .click(
            this.browser.findElement({
              css:
                '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
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
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await delay(1000);
        await this.browser
          .actions({ bridge: true })
          .click(
            this.browser.findElement({
              css:
                '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect years');
      },
    },
  },
};

export const DatePickerLocaleProvider = () => {
  return (
    <div style={{ paddingTop: 200 }}>
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <DatePicker
          value="02.07.2017"
          minDate="02.07.2017"
          maxDate="30.01.2020"
          onValueChange={action('change')}
          enableTodayLink={true}
        />
      </LocaleContext.Provider>
    </div>
  );
};
DatePickerLocaleProvider.storyName = 'DatePicker LocaleProvider';
DatePickerLocaleProvider.parameters = { creevey: { skip: [true] } };
