import { action } from '@storybook/addon-actions';
import React, { useCallback, useState, useEffect } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';
import { Nullable } from '../../../typings/utility-types';
import { Meta, Story } from '../../../typings/stories';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import { Tooltip } from '../../Tooltip';
import { DatePicker } from '../DatePicker';
import { LocaleContext, LangCodes } from '../../../lib/locale';
import { delay, emptyHandler } from '../../../lib/utils';
import { SizeProp } from '../../../lib/types/props';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

interface DatePickerWithErrorProps {
  disabled?: boolean;
  size?: SizeProp;
}
interface DatePickerWithErrorState {
  tooltip: boolean;
  value: Nullable<string>;
  error?: boolean;
}
class DatePickerWithError extends React.Component<DatePickerWithErrorProps> {
  public state: DatePickerWithErrorState = {
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
        <Button onClick={() => this.setState({ value: null, error: undefined, tooltip: false })}>Clear</Button>
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

export default {
  title: 'DatePicker',
} as Meta;

export const WithMouseeventHandlers: Story = () => {
  const [date, setDate] = useState('02.07.2017');

  return (
    <div style={{ padding: '200px 150px 350px 0px' }}>
      <DatePicker
        width={200}
        value={date}
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onValueChange={setDate}
      />
    </div>
  );
};
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
        await delay(1000);
        await this.expect(await this.takeScreenshot()).to.matchImage('opened');
      },
      async 'DateSelect month'() {
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
              css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect month');
      },
      async 'DateSelect year'() {
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
              css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
            }),
          )
          .perform();
        await delay(1000);

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
          onValueChange={(date) => {
            setDate(date);
          }}
          useMobileNativeDatePicker
        />
      </Gapped>
    </div>
  );
};
WithMobileNativeDatePicker.storyName = 'with native datepickers on mobile devices';
WithMobileNativeDatePicker.parameters = { creevey: { skip: true } };

export const MobilePicker: Story = () => {
  const [date, setDate] = useState('02.07.2017');

  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create(theme, THEME_2022)}>
            <DatePicker enableTodayLink width="auto" value={date} onValueChange={setDate} />
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
MobilePicker.storyName = 'MobilePicker';
MobilePicker.parameters = {
  viewport: {
    defaultViewport: 'iphone',
  },
  creevey: {
    tests: {
      async 'MobilePicker on iphone opened'() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();
        await delay(1000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('MobilePicker on iphone opened');
      },
    },
  },
};

export const WithAutoFocus = () => (
  <DatePicker width={200} value="02.07.2017" onValueChange={action('change')} autoFocus />
);
WithAutoFocus.storyName = 'with autoFocus';
WithAutoFocus.parameters = { creevey: { skip: true } };

export const DatePickerWithErrorStory = () => <DatePickerWithError />;
DatePickerWithErrorStory.storyName = 'DatePickerWithError';
DatePickerWithErrorStory.parameters = { creevey: { skip: true } };

export const DatePickerDisabled = () => <DatePickerWithError disabled />;
DatePickerDisabled.storyName = 'DatePicker disabled';
DatePickerDisabled.parameters = { creevey: { skip: true } };

export const DifferentSizes = () => (
  <Gapped>
    <DatePicker value="20.20.2020" onValueChange={() => void 0} />
    <DatePicker value="20.20.2020" onValueChange={() => void 0} size="medium" />
    <DatePicker value="20.20.2020" onValueChange={() => void 0} size="large" />
  </Gapped>
);

interface DatePickerWithMinMaxState {
  value: Nullable<string>;
  minDate: string;
  maxDate: string;
  order: InternalDateOrder;
  separator: InternalDateSeparator;
}

class DatePickerWithMinMax extends React.Component {
  public state: DatePickerWithMinMaxState = {
    minDate: '02.07.2017',
    maxDate: '30.01.2020',
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
            value={this.state.minDate}
            placeholder="min"
            onChange={(e) => this.setState({ min: e.target.value })}
          />
        </label>
        <label>
          Окончание периода:{' '}
          <input
            type="text"
            value={this.state.maxDate}
            placeholder="max"
            onChange={(e) => this.setState({ max: e.target.value })}
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
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            onValueChange={action('change')}
            useMobileNativeDatePicker
          />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

export const DatePickerWithMinMaxDate: Story = () => (
  <div style={{ padding: '200px 150px 350px 0px' }}>
    <DatePickerWithMinMax />
  </div>
);
DatePickerWithMinMaxDate.storyName = 'DatePicker with min max date';

DatePickerWithMinMaxDate.parameters = {
  creevey: {
    skip: {
      flaky: {
        in: /^(?!\b(chrome|ie11)\b)/,
        tests: ['DateSelect months', 'DateSelect years'],
      },
    },
    tests: {
      async 'DateSelect months'() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .pause(1000)
          .perform();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(
            this.browser.findElement({
              css: '[data-tid="MonthView__month"]:first-child [data-tid="MonthView__headerMonth"] [data-tid="DateSelect__caption"]',
            }),
          )
          .pause(1000)
          .perform();

        await this.expect(await this.takeScreenshot()).to.matchImage('DateSelect months');
      },
      async 'DateSelect years'() {
        await delay(1000);
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .pause(1000)
          .perform();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(
            this.browser.findElement({
              css: '[data-comp-name~="MonthView"]:first-child [data-tid="MonthView__headerYear"] [data-tid="DateSelect__caption"]',
            }),
          )
          .pause(1000)
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
          enableTodayLink
        />
      </LocaleContext.Provider>
    </div>
  );
};
DatePickerLocaleProvider.storyName = 'DatePicker LocaleProvider';
DatePickerLocaleProvider.parameters = { creevey: { skip: true } };

export const DatePickerInRelativeBody: Story = () => {
  const [isRelative, toggleIsRelative] = useState(false);
  const relativeClassName = 'relative';

  const onClick = useCallback(() => {
    toggleIsRelative(!isRelative);
    document.querySelector('html')?.classList.toggle(relativeClassName);
  }, [isRelative]);
  const paddingTop = document.documentElement.clientHeight - 32 * 3;

  useEffect(() => {
    return () => {
      document.querySelector('html')?.classList.remove(relativeClassName);
    };
  }, [relativeClassName]);

  return (
    <>
      <Button onClick={onClick} data-tid="toggle-relative-position">
        {isRelative ? 'With' : 'Without'} relative position
      </Button>
      <div style={{ padding: `${paddingTop}px 150px 0` }}>
        <DatePicker value="02.07.2017" autoFocus onValueChange={emptyHandler} />
      </div>
    </>
  );
};
DatePickerInRelativeBody.storyName = 'DatePicker In Relative Body';
DatePickerInRelativeBody.parameters = {
  creevey: {
    tests: {
      async opened() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="toggle-relative-position"]' }))
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();

        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened');
      },
    },
  },
};

export const WithManualPosition: Story = () => {
  const [menuPos, setMenuPos] = useState<'top' | 'bottom'>('top');
  const [isRelative, toggleIsRelative] = useState(false);
  const relativeClassName = 'relative';

  const onClick = useCallback(() => {
    toggleIsRelative(!isRelative);
    document.querySelector('html')?.classList.toggle(relativeClassName);
  }, [isRelative]);

  useEffect(() => {
    return () => {
      document.querySelector('html')?.classList.remove(relativeClassName);
    };
  }, [relativeClassName]);

  return (
    <div style={{ marginTop: '350px', paddingBottom: '300px' }}>
      <DatePicker menuPos={menuPos} value="02.07.2017" onValueChange={emptyHandler} />
      <button data-tid="relative" onClick={onClick}>
        {isRelative ? 'With' : 'Without'} relative position
      </button>
      <button data-tid="pos" onClick={() => setMenuPos(menuPos === 'top' ? 'bottom' : 'top')}>
        change pos to {menuPos === 'top' ? 'bottom' : 'top'}
      </button>
    </div>
  );
};
WithManualPosition.storyName = 'with manual position';
WithManualPosition.parameters = {
  creevey: {
    skip: { 'no themes': { in: /^(?!\b(chrome|firefox)\b)/ } },
    tests: {
      async 'opened top without relative position'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();

        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened top without relative position');
      },
      async 'opened bottom without relative position'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();

        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom without relative position');
      },
      async 'opened top with relative position'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="relative"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();

        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened top with relative position');
      },
      async 'opened bottom with relative position'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-tid~="relative"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-comp-name~="DatePicker"]' }))
          .perform();

        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom');
      },
    },
  },
};
