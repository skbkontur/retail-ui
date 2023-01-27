import { action } from '@storybook/addon-actions';
import React, { useCallback, useState, useEffect } from 'react';

import { Nullable } from '../../../typings/utility-types';
import { Meta, Story } from '../../../typings/stories';
import { InternalDateOrder } from '../../../lib/date/types';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';
import { Tooltip } from '../../Tooltip';
import { DatePicker, DatePickerProps } from '../DatePicker';
import { LocaleContext, LangCodes } from '../../../lib/locale';
import { delay, emptyHandler } from '../../../lib/utils';

interface DatePickerWithErrorProps {
  disabled?: boolean;
  size?: DatePickerProps['size'];
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

export const DifferentSizes = () => (
  <Gapped>
    <DatePicker value="20.20.2020" onValueChange={() => void 0} />
    <DatePicker value="20.20.2020" onValueChange={() => void 0} size="medium" />
    <DatePicker value="20.20.2020" onValueChange={() => void 0} size="large" />
  </Gapped>
);

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
DatePickerLocaleProvider.parameters = { creevey: { skip: [true] } };

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
      <Button onClick={onClick}>{isRelative ? 'With' : 'Without'} relative position</Button>
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
          .click(this.browser.findElement({ css: 'button' }))
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
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
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
