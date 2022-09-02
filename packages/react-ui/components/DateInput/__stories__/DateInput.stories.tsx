import React from 'react';
import { action } from '@storybook/addon-actions';

import { delay } from '../../../lib/utils';
import { Meta, Story } from '../../../typings/stories';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { Gapped } from '../../Gapped';
import { Select } from '../../Select';
import { DateInput, DateInputProps } from '../DateInput';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { defaultLangCode } from '../../../lib/locale/constants';

interface DateInputFormattingState {
  order: InternalDateOrder;
  separator: keyof typeof InternalDateSeparator;
  value: string;
}
class DateInputFormatting extends React.Component {
  public state: DateInputFormattingState = {
    order: InternalDateOrder.YMD,
    separator: 'Dot',
    value: '21.12.2012',
  };

  public handleChangeOrder = (order: any) => this.setState({ order });
  public handleChangeSeparator = (separator: any) => this.setState({ separator });
  public handleChangeValue = (value: any) => {
    action('change')(value);
    this.setState({ value });
  };

  public render() {
    return (
      <Gapped vertical gap={10}>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Порядок компонентов <code>InternalDateOrder</code>
          </span>
          <Select
            value={this.state.order}
            items={Object.keys(InternalDateOrder)}
            onValueChange={this.handleChangeOrder}
          />
        </div>
        <div>
          <span style={{ width: '300px', display: 'inline-block' }}>
            Разделитель <code>InternalDateSeparator</code>
          </span>
          <Select
            value={this.state.separator}
            items={Object.keys(InternalDateSeparator)}
            onValueChange={this.handleChangeSeparator}
          />
        </div>
        <LocaleContext.Provider
          value={{
            langCode: defaultLangCode,
            locale: {
              DatePicker: {
                separator: InternalDateSeparator[this.state.separator],
                order: this.state.order,
              },
            },
          }}
        >
          <DateInput onValueChange={this.handleChangeValue} value={this.state.value} />
          <br />
          <br />
        </LocaleContext.Provider>
      </Gapped>
    );
  }
}

class DateInputDifferentFormatting extends React.Component {
  public render() {
    const value = '21.12.2012';
    return (
      <table>
        <thead>
          <tr>
            <td> </td>
            <td>YMD</td>
            <td>MDY</td>
            <td>DMY</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dot</td>
            <td>
              <LocaleContext.Provider
                value={{
                  langCode: LangCodes.ru_RU,
                  locale: { DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  langCode: LangCodes.ru_RU,
                  locale: { DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dot, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
          <tr>
            <td>Dash</td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Dash, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
          <tr>
            <td>Slash</td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Slash, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
          <tr>
            <td>Space</td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.YMD } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.MDY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
            <td>
              <LocaleContext.Provider
                value={{
                  locale: { DatePicker: { separator: InternalDateSeparator.Space, order: InternalDateOrder.DMY } },
                }}
              >
                <DateInput value={value} />
              </LocaleContext.Provider>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

interface DateInputSimpleProps extends Partial<DateInputProps> {
  defaultValue?: string;
}
interface DateInputSimpleState {
  value: string;
}

class DateInputSimple extends React.Component<DateInputSimpleProps> {
  public state: DateInputSimpleState = {
    value: this.props.defaultValue || '',
  };

  public handleChange = (value: string) => {
    this.setState({ value });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  public render() {
    return <DateInput {...this.props} onValueChange={this.handleChange} value={this.state.value} />;
  }
}

class DateInputLastEvent extends React.Component {
  public state = {
    lastEvent: 'none',
  };

  public handleBlur = () => {
    this.setState({ lastEvent: 'blur' });
  };

  public handleChange = () => {
    this.setState({ lastEvent: 'change' });
  };

  public render() {
    return (
      <Gapped>
        <DateInputSimple onValueChange={this.handleChange} onBlur={this.handleBlur} defaultValue="21.12.2012" />
        <div>{this.state.lastEvent}</div>
      </Gapped>
    );
  }
}

export default { title: 'DateInput' } as Meta;

export const Simple: Story = () => <DateInputSimple defaultValue="01.02.2017" />;
Simple.storyName = 'simple';

Simple.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
      async focus() {
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.expect(await this.takeScreenshot()).to.matchImage('focus');
      },
    },
  },
};

export const WithAutoFocus: Story = () => <DateInput autoFocus />;
WithAutoFocus.storyName = 'with autoFocus';

export const Formatting = () => <DateInputFormatting />;
Formatting.storyName = 'formatting';
Formatting.parameters = { creevey: { skip: [true] } };

export const DifferentFormatting = () => <DateInputDifferentFormatting />;
DifferentFormatting.storyName = 'different formatting';

export const Disabled: Story = () => <DateInputSimple disabled defaultValue="01.02.2017" />;
Disabled.storyName = 'disabled';

Disabled.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
      async focus() {
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.expect(await this.takeScreenshot()).to.matchImage('focus');
      },
    },
  },
};

export const WithWidth: Story = () => <DateInputSimple width="50px" defaultValue="01.02.2017" />;
WithWidth.storyName = 'with width';

WithWidth.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage('idle');
      },
      async focus() {
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.expect(await this.takeScreenshot()).to.matchImage('focus');
      },
    },
  },
};

export const BlurAlwaysAfterChange: Story = () => <DateInputLastEvent />;
BlurAlwaysAfterChange.storyName = 'blur always after change';

BlurAlwaysAfterChange.parameters = {
  creevey: {
    tests: {
      async 'value not changed'() {
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'body' }))
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('value not changed');
      },
      async 'value changed'() {
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys('12')
          .click(this.browser.findElement({ css: 'body' }))
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('value changed');
      },
      async 'value restored'() {
        await this.browser.executeScript(function () {
          // @ts-expect-error: `window` object doesn't expose types by default. See: https://github.com/microsoft/TypeScript/issues/19816.
          window.OldDate = window.Date;
          // @ts-expect-error: Read the comment above.
          window.Date = function () {
            // @ts-expect-error: Read the comment above.
            return new window.OldDate(2000, 0, 1);
          };
        });
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.DELETE)
          .click(this.browser.findElement({ css: 'body' }))
          .perform();
        await this.browser.executeScript(function () {
          // @ts-expect-error: `window` object doesn't expose types by default. See: https://github.com/microsoft/TypeScript/issues/19816.
          if (window.OldDate) {
            // @ts-expect-error: Read the comment above.
            window.Date = window.OldDate;
          }
        });
        await this.expect(await this.takeScreenshot()).to.matchImage('value restored');
      },
    },
  },
};

export const WithNoValue: Story = () => <DateInput />;
WithNoValue.parameters = {
  creevey: {
    tests: {
      async idle() {
        await this.expect(await this.takeScreenshot()).to.matchImage();
      },
      async focused() {
        await this.browser.executeScript(function () {
          const input = window.document.querySelector("[data-comp-name~='DateInput']");
          if (input instanceof HTMLElement) {
            input.focus();
          }
        });
        await this.expect(await this.takeScreenshot()).to.matchImage();
      },
    },
  },
};

export const WithError = () => (
  <Gapped vertical>
    <Gapped>
      <DateInput value="01.01.2020" error /> Error
    </Gapped>
    <Gapped>
      <DateInput value="01.01.2020" error disabled /> Error and Disabled
    </Gapped>
  </Gapped>
);

export const ShouldSetFocusOnPlaceholderClick: Story = () => {
  return <DateInput />;
};
ShouldSetFocusOnPlaceholderClick.storyName = 'should set focus on placeholder click';
ShouldSetFocusOnPlaceholderClick.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome\b)/ },
    tests: {
      async focused() {
        const DateInputPlaceholder = this.browser.findElement({ css: '[data-tid~="DateFragmentsView__placeholder"]' });

        await this.browser.actions({ bridge: true }).click(DateInputPlaceholder).perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage();
      },
    },
  },
};
